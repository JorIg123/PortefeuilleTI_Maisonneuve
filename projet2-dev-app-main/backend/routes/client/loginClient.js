const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db'); // Importa el módulo de conexión a la base de datos
const secretKey = 'your-secret-key'
const router = express.Router()

router.post('/loginClient', async (req, res) => {
    try {
      const { Email, MotDePasse } = req.body
      console.log(Email,MotDePasse)///////////////////////////////////////////////////////////////
  
      // Récupérer l'utilisateur depuis la base de données
      const user = await getUserClientByUsername(Email)
      console.log(user)////////////////////////////////////////////////////////////////////////////////////
      if (!user) {
        
        return res.status(401).json({ message: 'L\'utilisateur n\'a pas été trouvé' })
      }

      // Vérifier le mot de passe
      if (!(await bcrypt.compare(MotDePasse, user.MotDePasse))) {
        console.log('MDP invalide');
        return res.status(401).json({ message: 'L\'utilisateur ou le mot de passe invalide(s)' })
      }
  
      // Générer un token JWT
      const expiresInSeconds = 12000
      const token = jwt.sign({ Email }, secretKey, { expiresIn: expiresInSeconds })
      // Obtenir la date actuelle
      const now = new Date()
      // Calculer la date d'expiration
      const expirationDate = new Date(now.getTime() + expiresInSeconds * 1000)
  
      // Formater la date y l'heure de expiration
      const expirationTime = expirationDate.toLocaleTimeString()
      const expirationDateTime = expirationDate.toLocaleDateString() + ' ' + expirationTime
      const userID = user.IDclient

      res.status(200).json({ message: 'Connexion réussie', userID , token, expiresIn: expiresInSeconds, expirationTime: expirationDateTime })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Une erreur est survenue' })
    }
})


async function getUserClientByUsername(Email) {
    try {
        const user = await db('Client').where({ Email }).first()
        return user
      } catch (error) {
        console.error(error)
        throw new Error({ message: 'Erreur lors de la récupération des données de la base de données' })
      }
}

module.exports = router;