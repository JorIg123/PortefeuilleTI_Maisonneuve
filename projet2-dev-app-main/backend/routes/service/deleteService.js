const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); // Importa el módulo de conexión a la base de datos
app.use(bodyParser.json())
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.delete('/deleteService', async (req, res) => {
    try {
        const { idService } = req.query;
        
        // Verificar si el servicio con el ID proporcionado existe en la base de datos
        const existingService = await db('Services').where({ idService }).first();
        if (!existingService) {
            return res.status(404).json({ error: "Le service n'existe pas" });
        }

        // Eliminar el servicio de la base de datos
        await db('Services').where({ idService }).del();

        res.status(200).json({ message: 'Service supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du service' });
    }
});


module.exports = router