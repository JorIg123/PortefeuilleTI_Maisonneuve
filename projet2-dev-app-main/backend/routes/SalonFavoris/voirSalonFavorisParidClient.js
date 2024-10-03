const express = require('express');
const db = require('../db');
const router = express.Router();
const checkBlacklist = require('../checkBlacklist')


router.get('/voirsalonFavorisParidclient', async (req, res) => {
  try {
    const { idClient } = req.query;
    const listeSalonsFavoris = await db('SalonFavoris').select('SalonCoiffure.*').join('SalonCoiffure', 'SalonFavoris.idSalon', 'SalonCoiffure.idSalon').where({ idClient: idClient }); 
    res.send(listeSalonsFavoris);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de la base de données:', error);
    res.status(500).send('Erreur lors de la récupération des données de la base de données ');
  }
});

module.exports = router;