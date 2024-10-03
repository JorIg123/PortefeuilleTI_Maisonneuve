const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const db = require('../db')
const checkBlacklist = require('../checkBlacklist')
const router = express.Router()

router.post('/logoutCoiffeur', checkBlacklist, async (req, res) => {
    try {
      const token = req.body.token
      await db('Blacklist').insert({ token })
      res.json({ message: 'Déconnexion réussie' })
    } catch (error) {
      console.error('Erreur lors de l\'insertion du token dans la base de données :', error)
      res.status(500).json({ error: 'Une erreur est survenue' })
    }
  })
  
  module.exports = router