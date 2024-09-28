const express = require('express')
const app = express()
const path = require('path')
const {
  VerifierUtilisateur,
  ajouterUtilisateur,
  obtenirDeplacementsOfferts,
  supprimerDeplacementOfferts,
  ajouterReservations,
  ajouterDeplacementsDemandes,
  ajouterDeplacementsOfferts,
  modifierDeplacementDemande,
  obtenirDeplacementsDemandes,
  supprimerDeplacementDemande,
  modifierDeplacementOffert,
  supprimerReservation,
  obtenirReservations,
  obtenirUtilisateurParID,
  modifierUtilisateur,
  DemandesAvenirFiltre,
  obtenirDeplacementDemandeUtilisateur,
  obtenirDeplacementOffertsUtilisateur,
  obtenirDeplacementOffertUtilisateur,
  supprimerUtilisateur
} = require('./dal')

// const { log } = require('console')

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
  res.redirect('/login')
})

// Ajout de cette route pour un savoir sur qu'elle page on est juste en regardant l'URL
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'))
})

app.get('/pageAjouterDeplacementDemandes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pageAjouterDeplacementDemandes.html'))
})

app.get('/pageAjouterDeplacementOfferts', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pageAjouterDeplacementOfferts.html'))
})

app.get('/pageModifierDeplacementDemandes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pageModifierDeplacementDemandes.html'))
})

app.get('/pageModifierDeplacementOfferts', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pageModifierDeplacementOfferts.html'))
})

app.get('/pageReservation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pageReservation.html'))
})

app.get('/pageProfil', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pageProfil.html'))
})

app.get('/pageVoirDeplacementDemandes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pageVoirDeplacementDemandes.html'))
})

app.get('/utilisateurProfil/:id', async (req, res) => {
  const userId = req.params.id

  try {
    const user = await obtenirUtilisateurParID(userId)

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' })
  }
})

app.get('/pagePrincipal', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pagePrincipal.html'))
})

app.post('/login-validation', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ erreur: 'Erreur les champs sont vides' })
  }
  try {
    const user = await VerifierUtilisateur(email, password)

    if (user !== null) {
      res.status(200).json({ user })
    } else {
      res.status(401).json({ erreur: 'Identifiants invalides' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erreur lors de la recuperation de l utilisateur' })
  }
})

app.post('/register-user', async (req, res) => {
  const { prenom, nom, adresse, adresseCourriel, numeroTelephone, motDePasse } = req.body

  if (!prenom || !nom || !adresse || !adresseCourriel || !numeroTelephone || !motDePasse) {
    return res.status(400).json({ erreur: 'Erreur les champs sont vides' })
  }
  try {
    const infoUser = {
      prenom,
      nom,
      adresse,
      adresseCourriel,
      numeroTelephone,
      motDePasse
    }

    const idUtilisateur = await ajouterUtilisateur(infoUser)

    res.status(200).json({ idUtilisateur })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erreur lors de l insertion de l utilisateur' })
  }
})

app.get('/deplacementsOfferts', async (req, res) => {
  const { filtre } = req.query

  try {
    const deplacements = await obtenirDeplacementsOfferts(filtre, false)
    res.json({ deplacements })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' })
  }
})

app.delete('/supprimerDeplacement/:id', (req, res) => {
  const Id = req.params.id

  try {
    supprimerDeplacementOfferts('iddeplacement', Id, [1, Id])

    res.status(200).json({ success: 'Utilisateur supprimé avec succès.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la suppression de l utilisateur.' })
  }
})

app.delete('/desinscrireUtilisateur/:id', (req, res) => {
  const Id = req.params.id

  try {
    supprimerUtilisateur('idutilisateur', Id)

    res.status(200).json({ success: 'Utilisateur supprimé avec succès.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la suppression de l utilisateur.' })
  }
})

app.post('/reserver-deplacement', (req, res) => {
  const { idUtilisateurPassager, idDeplacement } = req.body

  try {
    const infoReservation = {
      idUtilisateurPassager,
      idDeplacement
    }

    ajouterReservations(infoReservation)
    res.status(200).json({ success: 'Reservation cree avec succès.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la suppression de l utilisateur.' })
  }
})

app.post('/addDeplacementDemande', (req, res) => {
  const { idDemandeur, dateDeplacementDemande, heureDeplacementDemande, destinationDemandee, precisionDeplacementDemande } = req.body

  try {
    const infoDeplacementDemande = {
      idDemandeur,
      dateDeplacementDemande,
      heureDeplacementDemande,
      destinationDemandee,
      precisionDeplacementDemande
    }

    ajouterDeplacementsDemandes(infoDeplacementDemande)

    res.status(200).json({ success: 'Deplacement Demande cree avec succès.' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erreur lors de l insertion du deplacement' })
  }
})

app.post('/addDeplacementOffert', (req, res) => {
  const { idUtilisateurConducteur, destination, dateDeplacement, heure, nbrPlaceDisponible, cout, comptant, interact, precisionDeplacement } = req.body

  try {
    const infoDeplacementOffert = {
      idUtilisateurConducteur,
      destination,
      dateDeplacement,
      heure,
      nbrPlaceDisponible,
      cout,
      comptant,
      interact,
      precisionDeplacement
    }

    ajouterDeplacementsOfferts(infoDeplacementOffert)

    res.status(200).json({ success: 'Deplacement Offert cree avec succès.' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erreur lors de l insertion du deplacement' })
  }
})

app.put('/updateDeplacementDemande/:id', (req, res) => {
  const { id } = req.params
  const { idDeplacementDemandes, dateDeplacementDemande, heureDeplacementDemande, destinationDemandee, precisionDeplacementDemande } = req.body

  try {
    modifierDeplacementDemande(idDeplacementDemandes, id, 'datedeplacementdemande', dateDeplacementDemande)
    modifierDeplacementDemande(idDeplacementDemandes, id, 'heuredeplacementdemande', heureDeplacementDemande)
    modifierDeplacementDemande(idDeplacementDemandes, id, 'destinationdemandee', destinationDemandee)
    modifierDeplacementDemande(idDeplacementDemandes, id, 'precisiondeplacementdemande', precisionDeplacementDemande)

    res.status(200).json({ success: 'Deplacement modifié avec succès.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la modification de l utilisateur.' })
  }
})

app.put('/updateDeplacementOfferts/:id', (req, res) => {
  const { id } = req.params
  const { idDeplacement, dateDeplacement, heure, destination, precisionDeplacement, nbrPlaceDisponible, cout, comptant, interact } = req.body

  try {
    modifierDeplacementOffert(idDeplacement, id, 'datedeplacement', dateDeplacement)
    modifierDeplacementOffert(idDeplacement, id, 'heure', heure)
    modifierDeplacementOffert(idDeplacement, id, 'destination', destination)
    modifierDeplacementOffert(idDeplacement, id, 'precisiondeplacement', precisionDeplacement)
    modifierDeplacementOffert(idDeplacement, id, 'nombreplacedisponible', nbrPlaceDisponible)
    modifierDeplacementOffert(idDeplacement, id, 'cout', cout)
    modifierDeplacementOffert(idDeplacement, id, 'comptant', comptant)
    modifierDeplacementOffert(idDeplacement, id, 'interact', interact)

    res.status(200).json({ success: 'Deplacement modifié avec succès.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la modification de l utilisateur.' })
  }
})

app.put('/updateProfil/:id', (req, res) => {
  const { id } = req.params
  const { nom, prenom, adresse, numeroTelephone, adresseCourriel, motDePasse } = req.body

  try {
    modifierUtilisateur(id, 'nom', nom)
    modifierUtilisateur(id, 'prenom', prenom)
    modifierUtilisateur(id, 'adresse', adresse)
    modifierUtilisateur(id, 'numerotelephone', numeroTelephone)
    modifierUtilisateur(id, 'adressecourriel', adresseCourriel)
    modifierUtilisateur(id, 'motdepasse', motDePasse)

    res.status(200).json({ success: 'Profil modifié avec succès.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la modification de l utilisateur.' })
  }
})

app.get('/deplacementsDemandes', async (req, res) => {
  const { id } = req.query

  try {
    const deplacements = await obtenirDeplacementsDemandes(id)

    res.json({ deplacements })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' })
  }
})

app.get('/modifierDeplacementsOfferts', async (req, res) => {
  const { id } = req.query

  try {
    const deplacements = await obtenirDeplacementOffertUtilisateur(id)
    res.json({ deplacements })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' })
  }
})

app.get('/toutDeplacementsDemandes', async (req, res) => {
  const { filtre } = req.query

  try {
    const deplacements = await DemandesAvenirFiltre(filtre)

    res.json({ deplacements })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' })
  }
})

app.delete('/supprimerDeplacementDemande/:id', (req, res) => {
  const Id = req.params.id

  try {
    supprimerDeplacementDemande('iddeplacementdemandes', Id)

    res.status(200).json({ success: 'Deplacement supprimé avec succès.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la suppression du deplacement.' })
  }
})

app.delete('/supprimerReservation/:id', (req, res) => {
  const Id = req.params.id

  try {
    supprimerReservation('idreservation', Id)

    res.status(200).json({ success: 'Reservation supprimé avec succès.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la suppression de la reservation.' })
  }
})

app.get('/mes-reservations', async (req, res) => {
  const { id } = req.query

  try {
    const reservations = await obtenirReservations(id)

    res.json({ reservations })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' })
  }
})

app.get('/deplacementDemandesFill', async (req, res) => {
  const userId = req.query.id
  const deplacementId = req.query.idDeplacement

  try {
    const user = await obtenirDeplacementDemandeUtilisateur(userId, deplacementId)

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' })
  }
})

app.get('/deplacementOffertsFill', async (req, res) => {
  const userId = req.query.id
  const deplacementId = req.query.idDeplacement

  try {
    const user = await obtenirDeplacementOffertsUtilisateur(userId, deplacementId)

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' })
  }
})

app.listen(3000, () => {
  console.log('SERVEUR EN COURS D\'EXECUTION SUR LE PORT 3000')
})
