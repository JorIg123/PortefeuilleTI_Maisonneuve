const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); 
app.use(bodyParser.json())
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.put('/modifierClient', async (req, res) => {
    try {
        const { PrenomClient, NomClient, Email} = req.body;
        
        // Vérifier si le UsernameClinet fourni existe dans la base de données.
        const existingClient = await db('Client').where({ Email }).first();
        if (!existingClient) {
            return res.status(404).json({ error: "Le client n'existe pas" });
        }

        // Modifier les données du client
        await db('Client').where({ Email}).update({ PrenomClient, NomClient, Email });

        res.status(200).json({ message: ' Client modifié avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la modification du client' });
    }
});

module.exports = router