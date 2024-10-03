const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); 
app.use(bodyParser.json())
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.post('/enregistrerCoiffeurFavoris', checkBlacklist, async (req, res) => {
    try {
      const { idClient, idCoiffeur } = req.body
        
      // insérer coiffeur favoris dans la base de données
      await insertCoiffeurFavoris(idClient, idCoiffeur)
  
      res.status(201).json({ message: 'coiffeur favoris ajouté avec succès' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Une erreur est survenue' })
    }
  })


async function insertCoiffeurFavoris (idClient, idCoiffeur) {
    try {
      await db('CoiffeurFavoris').insert({ idClient, idCoiffeur })
    } catch (error) {
      console.error('Erreur lors de l\'insertion du coiffeur favoris dans la base de données', error)
      throw new Error({ message: 'Erreur lors de l\'insertion du coiffeur favoris dans la base de données' })
    }
  }

module.exports = router