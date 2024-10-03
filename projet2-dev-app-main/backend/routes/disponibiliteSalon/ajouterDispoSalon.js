const express = require('express');
const router = express.Router();
const db = require('../db');
const checkBlacklist = require('../checkBlacklist')

router.post('/AjouterDispoSalon' ,async (req,res) =>{
    try{
        const {idSalon, dateDispo, ouverture, fermeture} = req.body

        const verifierDispoS = await db.select().from('DisponibiliteSalon').where({dateDispo, idSalon})

        if(!verifierDispoS.length===0){
            return res.status(400).json({ message: 'La dispo existe deja' });
        }

        await db('DisponibiliteSalon').insert({idSalon, dateDispo, ouverture, fermeture})

        res.status(200).json({ message: "Dispo ajoutee avec succes" });
    } catch(error){
        console.error("Erreur", error);
        res.status(500).json({ error: 'Erreur lors de l ajout de la dispo' });
    }
})

module.exports = router