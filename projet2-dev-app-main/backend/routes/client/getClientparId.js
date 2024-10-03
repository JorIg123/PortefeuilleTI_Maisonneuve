const express = require('express');
const db = require('../db');
const router = express.Router();
const checkBlacklist = require('../checkBlacklist')


router.get('/getClientparID', async (req, res) => {
  try {
    const {id} = req.query
    
    const client = await db('Client').select('*').where({IDclient: id})

    res.send(client);

  } catch (error) {
    console.error('[-] Erreur lors de la recuperation des donnees:', error);
    res.status(500).send('[-] Erreur interne');
  }
});

module.exports = router;