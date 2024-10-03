const express = require('express');
const db = require('../db');
const router = express.Router();
const checkBlacklist = require('../checkBlacklist')


router.get('/getSalonsparID', async (req, res) => {
  try {
    const {id} = req.query
    
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    console.log(formattedDate);

    const salon = await db('SalonCoiffure').select('*').where({idSalon: id});
    const photos = await db('PhotosSalon').select('picture').where({SalonId: id})
    const reviews = await db('Avis'). select('etoiles', 'commentaire').where({idSalonCoiffure: id})
    const horaire = await db('DisponibiliteSalon').select('Ouverture', 'Fermeture').where({idSalon: id, DateDispo: formattedDate})

    res.send({salon, photos, reviews, horaire});
  } catch (error) {
    console.error('[-] Erreur lors de la recuperation des donnees:', error);
    res.status(500).send('[-] Erreur interne');
  }
});

module.exports = router;