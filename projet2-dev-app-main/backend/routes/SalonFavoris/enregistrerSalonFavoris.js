const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); 
app.use(bodyParser.json())
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.post('/enregistrerSalonFavoris', async (req, res) => {
    try {
      const { idClient, idSalon } = req.body
        
      // insérer salon favoris dans la base de données
      await insertSalonFavoris(idClient, idSalon)
  
      res.status(201).json({ message: 'salon favoris ajouté avec succès' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Une erreur est survenue' })
    }
  })


async function insertSalonFavoris (idClient, idSalon) {
    try {
      await db('SalonFavoris').insert({ idClient, idSalon })
    } catch (error) {
      console.error('Erreur lors de l\'insertion du salon favoris dans la base de données', error)
      throw new Error({ message: 'Erreur lors de l\'insertion du salon favoris dans la base de données' })
    }
  }

module.exports = router