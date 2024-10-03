const express = require('express');
const router = express.Router();
const db = require('../db');
const checkBlacklist = require('../checkBlacklist')

router.get('/RDVclient',  async (req,res) =>{
    try{
        const {iDClient} = req.query
        console.log(iDClient);

        const verifierClient = await db.select().from('Client').where({IDclient: iDClient})

        if(verifierClient.length === 0){
            return res.status(400).json({ message: 'Le client n existe pas' });
        }

        const resultats = await db('RendezVous')
            .select('RendezVous.idRDV', 'SalonCoiffure.nomSalon', 'Coiffeur.PrenomCoiffeur', 'Coiffeur.NomCoiffeur', 'Services.nom', 'Services.prix', 'Services.duree', 'RendezVous.dateRDV', 'RendezVous.heure')
            .where({ idClient: iDClient })
            .join('SalonCoiffure', 'RendezVous.idSalonCoiffure', '=', 'SalonCoiffure.idSalon')
            .join('Services', 'RendezVous.idService', '=', 'Services.idService')
            .join('Coiffeur', 'RendezVous.idCoiffeur', '=', 'Coiffeur.iDCoiffeur');

        res.status(200).json({ resultats });
    } catch(error){
        console.error("Erreur", error);
        res.status(500).json({ error: 'Erreur lors de l consultation du rdv' });
    }
})

module.exports = router