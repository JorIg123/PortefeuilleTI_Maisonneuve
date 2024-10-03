const express = require('express');
const router = express.Router();
const db = require('../db');
const checkBlacklist = require('../checkBlacklist')

router.get('/DispoSalon', async (req,res) =>{
    try{
        const {idSalon} = req.query
        console.log('aaaaa', idSalon);
        const verifierSalon = await db.select().from('SalonCoiffure').where({idSalon})

        if(verifierSalon.length === 0){
            return res.status(400).json({ message: 'Le salon n existe pas' });
        }

        const resultats = await db('DisponibiliteSalon').select().where({idSalon})

        res.status(200).json({ resultats });
    } catch(error){
        console.error("Erreur", error);
        res.status(500).json({ error: 'Erreur lors de l consultation du dispoSalon' });
    }
})

module.exports = router