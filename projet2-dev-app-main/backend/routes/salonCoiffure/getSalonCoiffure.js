const express = require('express');
const db = require('../db');
const router = express.Router();
const checkBlacklist = require('../checkBlacklist')


router.get('/getSalons', async (req, res) => {
  try {
    const salons = await db('SalonCoiffure').select('*');
    res.send(salons);
  } catch (error) {
    console.error('[-] Erreur lors de la recuperation des donnees:', error);
    res.status(500).send('[-] Erreur interne');
  }
});

module.exports = router;