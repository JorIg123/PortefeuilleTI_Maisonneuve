const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('../db'); // Importa el módulo de conexión a la base de datos
app.use(bodyParser.json())
const router = express.Router()
app.use(bodyParser.json())
const checkBlacklist = require('../checkBlacklist')

router.delete('/deleteCoiffeur', async (req, res) => {
    try {
        const { Email } = req.body;
        
        // Verificar si el servicio con el ID proporcionado existe en la base de datos
        const existingCoiffeur = await db('Coiffeur').where({ Email }).first();
        if (!existingCoiffeur) {
            return res.status(404).json({ error: "Le coiffeur n'existe pas" });
        }

        // Eliminar el servicio de la base de datos
        await db('Coiffeur').where({ Email }).del();

        res.status(200).json({ message: 'Coiffeur supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du coiffeur' });
    }
});


module.exports = router
