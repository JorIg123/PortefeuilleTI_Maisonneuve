const express = require('express');
const router = express.Router();
const db = require('../db');
const moment = require('moment');
const checkBlacklist = require('../checkBlacklist')

router.get('/obtenirHoraire', async (req,res) =>{
    try{
      const {debutshift, finshift, pausedebut, PauseFin, rdvDuCoiffeur, duree} = req.query
      const heuresDisponibles = Logique(debutshift, finshift, pausedebut, PauseFin, rdvDuCoiffeur, duree)

      console.log(heuresDisponibles);
      res.status(200).json({ heuresDisponibles });
    } catch(error){
        console.error("Erreur", error);
        res.status(500).json({ error: 'Erreur lors de l obtention de l horaire' });
    }
})

const sommeMin = (heure, minutes) => {
    console.log('Heure: ', heure, 'Minutes: ', minutes);
    if(!heure.includes(":")){
        heure = heure + ":00"
    }
    const [hh, mm] = heure.split(':').map(Number);
    const totalMinutes = hh * 60 + mm + parseInt(minutes.split(':')[1]) + (parseInt(minutes.split(':')[0])*60);
    const newHeure = Math.floor(totalMinutes / 60).toString()
    const newMinute = (totalMinutes % 60).toString().padStart(2, '0');
    console.log('NH: ', newHeure, 'NM: ', newMinute);
    return `${newHeure}:${newMinute}`;
  };

const isHeurePrise = (heureRDV, rendezVous, duree) => {
    const dateBase = moment('2024-01-01');
    console.log('Testt1:', rendezVous);
    if(rendezVous.length > 0){
      for (const rdv of rendezVous) {
        const debutRdv = rdv.heure;
        const finRdv = sommeMin(debutRdv, rdv.duree);
        const finRdv2 = sommeMin(heureRDV, duree);
        console.log("Numero1:", debutRdv);
        console.log("NUmero2: ", heureRDV);
        console.log("NUmero3: ", finRdv);
        console.log("NUmero4: ", finRdv2);
        const hhRDV = moment(`${dateBase.format('YYYY-MM-DD')} ${heureRDV}`, 'YYYY-MM-DD HH:mm:ss');
        const dbRDV = moment(`${dateBase.format('YYYY-MM-DD')} ${debutRdv}`, 'YYYY-MM-DD HH:mm:ss');
        const fRDV = moment(`${dateBase.format('YYYY-MM-DD')} ${finRdv}`, 'YYYY-MM-DD HH:mm:ss');
        const fRDV2 = moment(`${dateBase.format('YYYY-MM-DD')} ${finRdv2}`, 'YYYY-MM-DD HH:mm:ss');
        if ((hhRDV < fRDV && fRDV2 > dbRDV) || (hhRDV >= dbRDV && hhRDV < fRDV)) {
            console.log('siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
          return true; 
        }
      }
    } else {return false;}
  };

const Logique = (debutshift, finshift, pausedebut, PauseFin, rdvDuCoiffeur, duree) => {
  let heure = debutshift
  const dateBase = moment('2024-01-01');
  let heureHeure = moment(`${dateBase.format('YYYY-MM-DD')} ${heure}`, 'YYYY-MM-DD HH:mm:ss');
  const heurePauseDebut = moment(`${dateBase.format('YYYY-MM-DD')} ${pausedebut}`, 'YYYY-MM-DD HH:mm:ss');
  const heurePauseFin = moment(`${dateBase.format('YYYY-MM-DD')} ${PauseFin}`, 'YYYY-MM-DD HH:mm:ss');
  const heureFinShift = moment(`${dateBase.format('YYYY-MM-DD')} ${finshift}`, 'YYYY-MM-DD HH:mm:ss');

  const parsedRdvDuCoiffeur = JSON.parse(rdvDuCoiffeur);
  const heuresDisponibles = []
  console.log(dateBase);
  console.log(parsedRdvDuCoiffeur);

  while (heureHeure < heurePauseDebut) {
    const heureFinService1 = sommeMin(heure, duree);
    const hf1 = moment(`${dateBase.format('YYYY-MM-DD')} ${heureFinService1}`, 'YYYY-MM-DD HH:mm:ss');
    console.log(heure);
    if ( !isHeurePrise(heure, parsedRdvDuCoiffeur, duree) && hf1 <= heurePauseDebut) {
        console.log('[+]');
        heuresDisponibles.push(heure);
    }
    heure = sommeMin(heure, duree).toString(); 
    heureHeure = moment(`${dateBase.format('YYYY-MM-DD')} ${heure}`, 'YYYY-MM-DD HH:mm:ss');
  }
  
  heureHeure = heurePauseFin;
  heure = PauseFin 
  console.log(heure);
  while (heureHeure < heureFinShift) {
    const heureFinService2 = sommeMin(heure, duree);
    const hf2 = moment(`${dateBase.format('YYYY-MM-DD')} ${heureFinService2}`, 'YYYY-MM-DD HH:mm:ss');
    if (!isHeurePrise(heure, parsedRdvDuCoiffeur, duree) && hf2 <= heureFinShift) {
      heuresDisponibles.push(heure);
    }
    heure = sommeMin(heure, duree).toString()
    console.log("Heure2", heure);
    heureHeure = moment(`${dateBase.format('YYYY-MM-DD')} ${heure}`, 'YYYY-MM-DD HH:mm:ss');
  }

  return heuresDisponibles
}

module.exports = router