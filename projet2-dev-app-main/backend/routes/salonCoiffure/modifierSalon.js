const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); // Importa el módulo de conexión a la base de datos
app.use(bodyParser.json())
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.put('/modifierSalon', async (req, res) => {
    try {
        const { Email, nomSalon, telephoneSalon, adresse, bio} = req.body;
        
        // Vérifier si le UsernameCoiffeur fourni existe dans la base de données.
        const existingSalon = await db('SalonCoiffure').where({ Email }).first();
        if (!existingSalon) {
            return res.status(404).json({ error: "Le salon coiffure n'existe pas" });
        }

        // Modifier les données du(e la) coiffeur-euse
        await db('SalonCoiffure').where({ Email}).update({ nomSalon, telephoneSalon, adresse, bio });

        res.status(200).json({ message: ' Salon modifié avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la modification du Salon' });
    }
});

module.exports = router