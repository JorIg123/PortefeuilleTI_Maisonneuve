const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); 
app.use(bodyParser.json())
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.delete('/deleteClient', checkBlacklist, async (req, res) => {
    try {
        const { Email } = req.body;
        
        // Vérifier si le client avec le UsernameClient fourni existe dans la base de données.
        const existingCoiffeur = await db('Client').where({ Email }).first();
        if (!existingCoiffeur) {
            return res.status(404).json({ error: "Le client n'existe pas" });
        }

        // Supprimer le client de la base de données
        await db('Client').where({ Email }).del();

        res.status(200).json({ message: 'Client supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du client' });
    }
});


module.exports = router