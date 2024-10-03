const express = require('express');
const router = express.Router();
const db = require('../db');
const checkBlacklist = require('../checkBlacklist')

router.put('/modiferRDV', async (req,res) =>{
    try{
        const {idRDV, dateRDV, heure} = req.body

        const verifierRDV = await db.select().from('RendezVous').where({idRDV})

        if(verifierRDV.length === 0){
            return res.status(400).json({ message: 'Le rdv n existe pas' });
        }

        await db('RendezVous').where({ idRDV}).update({ dateRDV, heure });

        res.status(200).json({ message: ' rdv modifié avec succès' });
    } catch(error){
        console.error("Erreur", error);
        res.status(500).json({ error: 'Erreur lors de la modification du rdv' });
    }
})

module.exports = router;