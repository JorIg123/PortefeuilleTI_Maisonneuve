const express = require('express');
const router = express.Router();
const db = require('./routes/db');


router.delete('/deletePhotoSalonParID',  async (req,res) =>{
    try{
        const {id} = req.query

        const verifierDispoS = await db.select().from('PhotosSalon').where({ idPhoto: id})

        if(verifierDispoS.length === 0){
            return res.status(400).json({ message: 'Le dispoC n existe pas' });
        }

        await db('PhotosSalon').delete().where({idPhoto: id})

        res.status(200).json({ message: "Dispo effacee  avec succes" });
    } catch(error){
        console.error("Erreur", error);
        res.status(500).json({ error: 'Erreur lors de la supression de la dispo' });
    }
})

module.exports = router