const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); // Importa el módulo de conexión a la base de datos
app.use(bodyParser.json())
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.post('/enregistrerService', async (req, res) => {
    try {
      const { idSalon, nom, duree, prix } = req.body
        
      // insérer  Services dans la base de données
      await insertService(idSalon, nom, duree, prix)
  
      res.status(201).json({ message: 'Service ajoutée avec succès' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Une erreur est survenue' })
    }
  })

  async function insertService (idSalon, nom, duree, prix) {
    try {
      await db('Services').insert({ idSalon, nom, duree, prix })
    } catch (error) {
      console.error('Erreur lors de l\'insertion du service dans la base de données', error)
      throw new Error({ message: 'Erreur lors de l\'insertion du service dans la base de données' })
    }
  }
    
  module.exports = router