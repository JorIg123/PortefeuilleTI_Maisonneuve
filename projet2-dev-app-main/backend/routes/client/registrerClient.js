const express = require('express');
const router = express.Router();
const db = require('../db'); 
const bcrypt = require('bcryptjs')

router.post('/registerClient',  async (req, res) => {
  try {
    const { Email, PrenomClient, NomClient, MotDePasse, photoProfil } = req.body;

    console.log(photoProfil);

    const user = await getUserClientByUsername(Email);

    if (user) {
      return res.status(400).json({ message: 'Username existe deja' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(MotDePasse, 10)

    await insertUserClient(PrenomClient, NomClient, Email, hashedPassword, photoProfil);
    
    res.status(200).json({ message: 'Client register avec succes'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error' });
  }
});

async function getUserClientByUsername(Email) {
  try {
      const user = await db('Client').where({ Email }).first()
      return user
    } catch (error) {
      console.error(error)
      throw new Error({ message: 'Erreur lors de la récupération des données de la base de données' })
    }
}
async function insertUserClient(PrenomClient, NomClient, Email, MotDePasse, photoProfilBlob) {
  try {

    await db('Client').insert({
      PrenomClient: PrenomClient,
      NomClient: NomClient,
      Email: Email,
      MotDePasse: MotDePasse,
      photoProfil: photoProfilBlob,
    });

    console.log('[+] Client ajoute avec succes');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


module.exports = router;