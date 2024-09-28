/* eslint-disable no-undef */
// Creation des variables pour faire marcher le fichier test
const { obtenirDemande, DemandesAVenir, obtenirUtilisateurEtDemandes } = require('./dal')

// Test pour obtenir tous les deplacements demandes
test('Obtenir tous les deplacements a venir)', async () => {
  // Variable qui contient le resultat attendu
  const expectedResult = {
    demandes: [{
      idDeplacementDemandes: 3,
      idDemandeur: 9,
      destinationDemandee: 'Sainte-Agathe',
      dateDeplacementDemande: '2023-10-09',
      heureDeplacementDemande: '12:30:00',
      precisionDeplacementDemande: 'Départ à 12h30'
    },
    {
      idDeplacementDemandes: 4,
      idDemandeur: 9,
      destinationDemandee: 'Sainte-Agathe',
      dateDeplacementDemande: '2023-10-11',
      heureDeplacementDemande: '08:15:00',
      precisionDeplacementDemande: 'Départ à 8h15/, pas d_arrêt'
    },
    {
      idDeplacementDemandes: 6,
      idDemandeur: 7,
      destinationDemandee: 'Sainte-Agathe',
      dateDeplacementDemande: '2023-10-11',
      heureDeplacementDemande: '12:30:00',
      precisionDeplacementDemande: 'Départ à 12h30'
    }]
  }
  try { // Essaye la fonction DemandesAVenir du fichier dal.js
    const resultat = await DemandesAVenir()
    // La fonction .toEqual compare variable
    expect(resultat).toEqual(expectedResult)

    console.log('[+] Reussi')
  } catch (error) { // Affiche une erreur si une erreur est survenue
    console.error(error)
    throw error
  }
})

// Test pour obtenir un deplacement demande specifique
test('Obtenir l info d une demande par son ID)', async () => {
  // Variable qui contient le resultat attendu
  const expectedResult = {
    row: {
      idDeplacementDemandes: 3,
      idDemandeur: 9,
      destinationDemandee: 'Sainte-Agathe',
      dateDeplacementDemande: '2023-10-09',
      heureDeplacementDemande: '12:30:00',
      precisionDeplacementDemande: 'Départ à 12h30'
    }
  }
  try { // Essaye la fonction obtenirDemande du fichier dal.js
    const resultat = await obtenirDemande(3)
    // La fonction .toEqual compare variable
    expect(resultat).toEqual(expectedResult)

    console.log('[+] Reussi')
  } catch (error) { // Affiche une erreur si une erreur est survenue
    console.error(error)
    throw error
  }
})

// Test pour obtenir l'information sur un utilisateur ainsi que ces demandes, dans ce cas si, il n'y en a pas
test('Obtenir l info de l utilisateur et les demandes (Quand les demandes sont vides)', async () => {
  // Variable qui contient le resultat attendu
  const expectedResult = {
    row: {
      idUtilisateur: 1,
      prenom: 'Jean',
      nom: 'Dupont',
      adresse: '123 Rue Principale',
      adresseCourriel: 'jean.dupont@example.com',
      numeroTelephone: '2345678901',
      motDePasse: 'mdp1'
    },
    demandes: []
  }
  try { // Essaye la fonction obtenirUilitateurEtDemandes du fichier dal.js
    const resultat = await obtenirUtilisateurEtDemandes(1)
    // La fonction .toEqual compare variable
    expect(resultat).toEqual(expectedResult)

    console.log('[+] Reussi')
  } catch (error) { // Affiche une erreur si une erreur est survenue
    console.error(error)
    throw error
  }
})

// Test pour obtenir l'information sur un utilisateur ainsi que ces demandes, dans ce cas si, il y en a
test('Obtenir l info de l utilisateur et les demandes (Quand les demandes ne sont pas vides)', async () => {
  // Variable qui contient le resultat attendu
  const expectedResult = {
    row: {
      idUtilisateur: 9,
      prenom: 'François',
      nom: 'Gauthier',
      adresse: '666 Rue Neuvième',
      adresseCourriel: 'francois.gauthier@example.com',
      numeroTelephone: '5145557890',
      motDePasse: 'mdp9'
    },
    demandes: [
      {
        idDeplacementDemandes: 3,
        idDemandeur: 9,
        destinationDemandee: 'Sainte-Agathe',
        dateDeplacementDemande: '2023-10-09',
        heureDeplacementDemande: '12:30:00',
        precisionDeplacementDemande: 'Départ à 12h30'
      },
      {
        idDeplacementDemandes: 4,
        idDemandeur: 9,
        destinationDemandee: 'Sainte-Agathe',
        dateDeplacementDemande: '2023-10-11',
        heureDeplacementDemande: '08:15:00',
        precisionDeplacementDemande: 'Départ à 8h15/, pas d_arrêt'
      }]
  }
  try { // Essaye la fonction obtenirUilitateurEtDemandes du fichier dal.js
    const resultat = await obtenirUtilisateurEtDemandes(9)
    // La fonction .toEqual compare variable
    expect(resultat).toEqual(expectedResult)

    console.log('[+] Reussi')
  } catch (error) { // Affiche une erreur si une erreur est survenue
    console.error(error)
    throw error
  }
})
