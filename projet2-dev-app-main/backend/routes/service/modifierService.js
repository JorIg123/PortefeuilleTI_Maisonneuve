const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); // Importa el módulo de conexión a la base de datos
app.use(bodyParser.json())
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.put('/modifierService', async (req, res) => {
    try {
        const { idService, idSalon, nom, duree, prix } = req.body;
        
        // Verificar si el servicio con el ID proporcionado existe en la base de datos
        const existingService = await db('Services').where({ idService }).first();
        if (!existingService) {
            return res.status(404).json({ error: "Le service n'existe pas" });
        }

        // Modificar los datos del servicio
        await db('Services').where({ idService }).update({ idSalon, nom, duree, prix });

        res.status(200).json({ message: 'Service modifié avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la modification du service' });
    }
});

module.exports = router