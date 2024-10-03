const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const db = require('./db')
const app = express()
const secretKey = 'your-secret-key'
app.use(bodyParser.json())

// Middleware pour vérifier l'authentification d'un utilizateur
async function checkBlacklist (req, res, next) {
  console.log(req.body.token)
  const token = req.body.token

  try {
    const isTokenBlacklisted = await db('Blacklist').where({ token }).first()

    if (isTokenBlacklisted) {
    // Si le token est dans la liste noire, répond avec une erreur
      return res.status(403).json({ message: 'Token est \'blacklisted\' dans la base de données, connectez-vous d\'abord' })
    }
    // Vérifier s'il y a un token summit dans le bode de la requête
    if (!token) {
      return res.status(401).json({ message: 'Non autorisé' })
    }
    // Vérifier si le token est valide
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token invalide' })
      }
      req.user = user
      next()
    })
  } catch (error) {
    console.error('Erreur lors de la vérification dans la table Blacklist de la base de donnees :', error)
    res.status(500).json({ error: 'Une erreur est survenue  lors de la vérification dans la base de dennées' })
  }
}

module.exports = checkBlacklist