const express = require('express');
const router = express.Router();
const db = require('../db');
const checkBlacklist = require('../checkBlacklist')

router.post('/AjouterDispoCoiffeur' ,async (req,res) =>{
    try{
        const {idCoiffeur, idDispoS, debutShift, finShift, PauseDebut, PauseFin} = req.body

        const verifierDispoC = await db.select().from('DisponibiliteCoiffeur').where({idDispoS: idDispoS, idCoiffeur: idCoiffeur})

        if(! (verifierDispoC.length === 0)){
            return res.status(400).json({ message: 'La dispo existe deja' });
        }

        await db('DisponibiliteCoiffeur').insert({idCoiffeur, idDispoS, debutShift, finShift, PauseDebut, PauseFin})

        res.status(200).json({ message: "Dispo ajoutee avec succes" });
    } catch(error){
        console.error("Erreur", error);
        res.status(500).json({ error: 'Erreur lors de l ajout de la dispo' });
    }
})

module.exports = router