const express = require('express');
const db = require('../db');
const router = express.Router();
const checkBlacklist = require('../checkBlacklist')


router.get('/getCoiffeurparID', async (req, res) => {
    try {
        const {id} = req.query
        
        const coiffeur = await db('Coiffeur').select('*').where({iDCoiffeur: id})

        res.send(coiffeur);

    } catch (error) {
        console.error('[-] Erreur lors de la recupération des données:', error);
        res.status(500).send('[-] Erreur interne');
    }
});

module.exports = router;