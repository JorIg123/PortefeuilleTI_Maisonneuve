const express = require('express');
const db = require('../db');
const router = express.Router();
const checkBlacklist = require('../checkBlacklist')

// Ruta que permite a los usuarios recuperar la lista de servicios registrados con sus detalles.
router.get('/voirServicesParidSalon', async (req, res) => {
  try {
    const { idSalon } = req.query; // Corregido para obtener idSalon de req.body
    const services = await db('Services').select('*').where({ idSalon: idSalon }); // Corregido para usar la condición adecuada
    res.send(services);
  } catch (error) {
    console.error('Error al recuperar los datos de la base de datos:', error);
    res.status(500).send('Error al recuperar los datos de la base de datos');
  }
});

module.exports = router;