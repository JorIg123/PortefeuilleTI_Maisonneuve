const express = require('express');
const router = express.Router();
const db = require('../db');
const checkBlacklist = require('../checkBlacklist')

router.get('/RDVCoiffeurJournee', async (req,res) =>{
    try{
        const {idCoiffeur, dateRDV} = req.query

        const verifierCoiffeur = await db.select().from('Coiffeur').where({iDCoiffeur: idCoiffeur})

        if(verifierCoiffeur.length === 0){
            return res.status(400).json({ message: 'Le coiffeur n existe pas' });
        }

        const resultats = await db('RendezVous').select().where({idCoiffeur: idCoiffeur, dateRDV: dateRDV})

        const resultatsFinaux = [];
        for (const row of resultats) {
            const idService = row.idService;
        
            const dureeService = await db('Services')
                .select('duree')
                .where({ idService: idService });

            const resultatFinal = {
                ...row, 
                duree: dureeService[0].duree
            };
                
            resultatsFinaux.push(resultatFinal);
        }
        res.status(200).json({ resultatsFinaux });
    } catch(error){
        console.error("Erreur", error);
        res.status(500).json({ error: 'Erreur lors de l consultation du rdv' });
    }
})

module.exports = router