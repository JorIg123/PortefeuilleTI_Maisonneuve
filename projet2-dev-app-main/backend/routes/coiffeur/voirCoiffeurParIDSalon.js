const express = require('express');
const db = require('../db');
const router = express.Router();
const checkBlacklist = require('../checkBlacklist')

// Ruta que permite a los usuarios recuperar la lista de servicios registrados con sus detalles.
router.get('/voirCoiffeurParIDSalon', async (req, res) => {
  try {
    const { IDSalon } = req.query; // Corregido para obtener idSalon de req.body
    const listecoiffeurs = await db('Coiffeur').select('*').where({ IDSalon: IDSalon }); // Corregido para usar la condición adecuada
    res.send(listecoiffeurs);
  } catch (error) {
    console.error('Erreur lors de la recuperations des donnees:', error);
    res.status(500).send('Erreur lors de la recuperations des donnees:');
  }
});

module.exports = router;