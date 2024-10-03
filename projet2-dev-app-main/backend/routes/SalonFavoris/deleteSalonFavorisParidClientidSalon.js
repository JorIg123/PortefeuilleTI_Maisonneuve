const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); 
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.delete('/deleteSalonFavorisParidClientidSalon', async (req, res) => {
    try {
        const { idClient, idSalon } = req.body;
        console.log(idClient, idSalon);
        const existingSalonFavoris = await db('SalonFavoris').where({ idClient, idSalon }).first();
        if (!existingSalonFavoris) {
            return res.status(404).json({ error: "Le salon favoris n'existe pas" });
        }

        await db('SalonFavoris').where({ idClient: idClient, idSalon: idSalon }).del();

        res.status(200).json({ message: 'Salon favoris supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du salon favoris' });
    }
});


module.exports = router