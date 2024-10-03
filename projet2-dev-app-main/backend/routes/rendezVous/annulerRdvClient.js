const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); 
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.delete('/deleteRdvClient', async (req, res) => {
    try {
        const { idRDV} = req.body;
        
        const existingRendezVous = await db('RendezVous').where({ idRDV }).first();
        if (!existingRendezVous) {
            return res.status(404).json({ error: "Le rdv n'existe pas" });
        }

        await db('RendezVous').where({ idRDV }).del();

        res.status(200).json({ message: 'Rdv supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du rdv' });
    }
});


module.exports = router