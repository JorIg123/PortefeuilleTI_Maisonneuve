const express = require('express');
const router = express.Router();
const db = require('../db'); 
const bcrypt = require('bcryptjs')

router.post('/registerSalon', async (req, res) => {
    try {
        const { Email, nomSalon, telephoneSalon, adresse, bio, MotDePasse, photoProfil } = req.body;
        const user = await getUserSalonByUsername(Email);
        
        if (user) {
            return res.status(400).json({ message: 'El username ya existe' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(MotDePasse, 10)

        await insertUserSalon(Email, nomSalon, telephoneSalon, adresse, bio, hashedPassword, photoProfil);
        res.status(200).json({ message: 'Salon register avec succes' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error' });
    }
});

async function getUserSalonByUsername(Email) {
    try {
        const user = await db('SalonCoiffure').where({ Email }).first()
        return user
      } catch (error) {
        console.error(error)
        throw new Error({ message: 'Erreur lors de la récupération des données de la base de données' })
      }
}

async function insertUserSalon(Email, nomSalon, telephoneSalon, adresse, bio, MotDePasse, photoProfil) {
    try {
        await db('SalonCoiffure').insert({ Email: Email, nomSalon: nomSalon, telephoneSalon: telephoneSalon, adresse: adresse, bio:bio, MotDePasse: MotDePasse, PhotoSalon: photoProfil })
      } catch (error) {
        console.error('Erreur lors de l\'insertion du salon dans la base de données:', error)
        throw new Error({ message: 'Erreur lors de l\'insertion de l\'utilisateur dans la base de données' })
      }

}

module.exports = router;