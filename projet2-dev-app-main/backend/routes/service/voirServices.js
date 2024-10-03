const express = require('express');
const db = require('../db');
const router = express.Router();
const checkBlacklist = require('../checkBlacklist')


router.get('/voirServices', async (req, res) => {
  try {
    const listeservices = await db('Services').select('*')
    res.send(listeservices);
  } catch (error) {
    console.error('Error al recuperar los datos de la base de datos:', error);
    res.status(500).send('Error al recuperar los datos de la base de datos');
  }
});

module.exports = router;