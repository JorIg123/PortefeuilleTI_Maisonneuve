const express = require('express');
const router = express.Router();
const db = require('./routes/db');

router.post('/ajouterPhotoSalon' ,async (req,res) =>{
    try{
        const {SalonId, picture} = req.body

        const verifierDispoS = await db.select().from('PhotosSalon').where({SalonId, picture})

        if(!verifierDispoS.length===0){
            return res.status(400).json({ message: 'La dispo existe deja' });
        }

        await db('PhotosSalon').insert({SalonId, picture})

        res.status(200).json({ message: "[+] Dispo ajoutee avec succes" });
    } catch(error){
        console.error("Erreur", error);
        res.status(500).json({ error: 'Erreur lors de l ajout de la dispo' });
    }
})

module.exports = router