const express = require('express');
const router = express.Router();
const db = require('../db');
const checkBlacklist = require('../checkBlacklist')

router.get('/RDVCoiffeur', async (req,res) =>{
    try{
        const {idCoiffeur} = req.query
        console.log(idCoiffeur)

        const verifierCoiffeur = await db.select().from('Coiffeur').where({iDCoiffeur: idCoiffeur})

        if(verifierCoiffeur.length === 0){
            return res.status(400).json({ message: 'Le coiffeur n\'existe pas' });
        }
        const resultats = await db('RendezVous')
            .select('RendezVous.idRDV', 'SalonCoiffure.nomSalon', 'Coiffeur.PrenomCoiffeur', 'Coiffeur.NomCoiffeur', 'Services.nom', 'Services.prix', 'Services.duree', 'RendezVous.dateRDV', 'RendezVous.heure')
            .where({ 'RendezVous.idCoiffeur': idCoiffeur })
            .join('SalonCoiffure', 'RendezVous.idSalonCoiffure', '=', 'SalonCoiffure.idSalon')
            .join('Services', 'RendezVous.idService', '=', 'Services.idService')
            .join('Coiffeur', 'RendezVous.idCoiffeur', '=', 'Coiffeur.iDCoiffeur');

        res.status(200).json({ resultats });
    } catch(error){
        console.error("Erreur", error);
        res.status(500).json({ error: 'Erreur lors de la consultation du rdv' });
    }
})

module.exports = router