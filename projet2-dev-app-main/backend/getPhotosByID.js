const express = require('express');
const router = express.Router();
const db = require('./routes/db');

router.get('/getPhotosSalon' ,async (req,res) =>{
    try{
        const {SalonId} = req.query

        const listePhotos = await db('PhotosSalon').select('*').where({ SalonId: SalonId }); 
        res.send(listePhotos);
    } catch(error){
        console.error("Erreur", error);
        res.status(500).json({ error: 'Erreur lors de l ajout de la dispo' });
    }
})

module.exports = router