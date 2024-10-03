const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); 
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.delete('/deleteCoiffeurFavorisParidClientidCoiffeur', checkBlacklist, async (req, res) => {
    try {
        const { idClient, idCoiffeur } = req.body;
        
        const existingCoiffeurFavoris = await db('CoiffeurFavoris').where({ idClient, idCoiffeur }).first();
        if (!existingCoiffeurFavoris) {
            return res.status(404).json({ error: "Le coiffeur favoris n'existe pas" });
        }

        await db('CoiffeurFavoris').where({ idClient: idClient, idCoiffeur: idCoiffeur }).del();

        res.status(200).json({ message: 'Coiffeur favoris supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du coiffeur favoris' });
    }
});


module.exports = router