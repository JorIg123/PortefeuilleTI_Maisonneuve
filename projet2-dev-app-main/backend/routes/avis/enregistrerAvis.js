const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); 
app.use(bodyParser.json())
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.post('/enregistrerAvis', async (req, res) => {
    try {
      const { idClient, idSalonCoiffure, etoiles, commentaire } = req.body
      
      console.log(idClient, idSalonCoiffure, etoiles, commentaire);
      // insérer Avis dans la base de données
      await insertAvis(idClient, idSalonCoiffure, etoiles, commentaire)
  
      res.status(201).json({ message: 'Avis ajouté avec succès' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Une erreur est survenue' })
    }
  })


async function insertAvis (idClient, idSalonCoiffure, etoiles, commentaire) {
    try {
      await db('Avis').insert({ idClient, idSalonCoiffure, etoiles, commentaire })
    } catch (error) {
      console.error('Erreur lors de l\'insertion de \'avis dans la base de données', error)
      throw new Error({ message: 'Erreur lors de l\'insertion de \'avis dans la base de données' })
    }
  }

module.exports = router