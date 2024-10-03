const express = require('express');
const router = express.Router();
const db = require('../db');
const checkBlacklist = require('../checkBlacklist')

router.delete('/DeleteDispoSalon',  async (req,res) =>{
    try{
        const {idDispoS} = req.body

        const verifierDispoS = await db.select().from('DisponibiliteSalon').where({ idDispoS})

        if(verifierDispoS.length === 0){
            return res.status(400).json({ message: 'Le dispoC n existe pas' });
        }

        await db('DisponibiliteSalon').delete().where({idDispoS})

        res.status(200).json({ message: "Dispo effacee  avec succes" });
    } catch(error){
        console.error("Erreur", error);
        res.status(500).json({ error: 'Erreur lors de la supression de la dispo' });
    }
})

module.exports = router