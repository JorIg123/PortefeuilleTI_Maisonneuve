const express = require('express');
const router = express.Router();
const db = require('../db');
const  moment = require('moment');
const checkBlacklist = require('../checkBlacklist')

router.get('/DispoCoiffeur' ,async (req,res) =>{
    try{
        const {idCoiffeur} = req.query

        const verifierCoiffeur = await db.select().from('Coiffeur').where({iDCoiffeur: idCoiffeur})

        if(verifierCoiffeur.length === 0){
            return res.status(400).json({ message: 'Le coiffeur n\'existe pas' });
        }

        const resultats = await db('DisponibiliteCoiffeur')
            .select('DisponibiliteCoiffeur.idDispoC', 'DisponibiliteSalon.DateDispo', 'DisponibiliteCoiffeur.debutShift', 'DisponibiliteCoiffeur.finShift', 'DisponibiliteCoiffeur.PauseDebut', 'DisponibiliteCoiffeur.PauseFin')
            .where({'DisponibiliteCoiffeur.idCoiffeur': idCoiffeur})
            .join('DisponibiliteSalon', 'DisponibiliteCoiffeur.idDispoS', '=', 'DisponibiliteSalon.idDispoS')

        res.status(200).json({ resultats });
    } catch(error){
        console.error("Erreur", error);
        res.status(500).json({ error: 'Erreur lors de la consultation du DisponibiliteCoiffeur' });
    }

})

module.exports = router