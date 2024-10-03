const express = require('express');
const db = require('../db');
const router = express.Router();
const checkBlacklist = require('../checkBlacklist');


router.get('/voirAvisParidCoiffeur', async (req, res) => {
  try {
    const { idCoiffeur } = req.query;
    const listeAvis = await db('Avis')
      .select('Avis.commentaire', 'Avis.etoiles', 'Avis.idClient', 'Client.NomClient', 'Client.PrenomClient', 'SalonCoiffure.nomSalon')
      .join('Client', 'Avis.idClient', 'Client.IDclient')
      .join('Coiffeur', 'Avis.idSalonCoiffure', 'Coiffeur.IDSalon')
      .join('SalonCoiffure', 'Avis.idSalonCoiffure', 'SalonCoiffure.idSalon' )
      .where('Coiffeur.iDCoiffeur', idCoiffeur);
    res.send(listeAvis);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de la base de données :', error);
    res.status(500).send('Erreur lors de la récupération des données de la base de données');
  }
});


module.exports = router;