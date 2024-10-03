const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); // Importa el módulo de conexión a la base de datos
app.use(bodyParser.json())
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.put('/modifierCoiffeur', async (req, res) => {
    try {
        const { Email, IDSalon, PrenomCoiffeur, NomCoiffeur, PhotoCoiffeur} = req.body;
        
        // Vérifier si le Email fourni existe dans la base de données.
        const existingCoiffeur = await db('Coiffeur').where({ Email }).first();
        if (!existingCoiffeur) {
            return res.status(404).json({ error: "Le(a) Coiffeur(euse) n'existe pas" });
        }

        // Modifier les données du(e la) coiffeur-euse
        await db('Coiffeur').where({ Email}).update({ IDSalon, PrenomCoiffeur, NomCoiffeur, PhotoCoiffeur });

        res.status(200).json({ message: 'Coiffeur(euse) modifié(e) avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la modification du(e la) coiffeur-euse' });
    }
});

module.exports = router