// Retirer les erreurs de linting de eslint
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// Alejandro J.Oropesa Hernandez, Jorge Espinal, Chung Sing

// Creation des variables ayant une dependance
const sqlite3 = require('sqlite3')
// Ouverture de la base de donnee
const db = new sqlite3.Database('./covoiturage.sqlite3')

function obtenirIDUtilisateur () {
  const requete = 'select idUtilisateur from Utilisateurs'
  const prom1 = new Promise((resolve, reject) => {
    // Execution de la requete SQL
    db.get(requete, [], (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
  // Retourne le resultat de la Promise
  return Promise.all([prom1])
    .then(([row]) => {
      if (row) {
        console.log(row)
        return { row }
      } else {
        console.log('Erreur lors de la recuperation des id')
        return null
      }
    })
    // Retourne une erreur s'il y a une erreur
    .catch((error) => {
      console.error(error.message)
      throw error
    })
}

function obtenirUtilisateurParID (idUtilisateur) {
  const requete = 'select * from Utilisateurs where idUtilisateur = ?'
  // Creation d'un objet Promise pour permettre une action asynchrone ce qui permet de faire fonctionner le fichier dal.test.js
  const prom1 = new Promise((resolve, reject) => {
    // Execution de la requete SQL
    db.get(requete, [idUtilisateur], (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
  // Retourne le resultat de la Promise
  return Promise.all([prom1])
    .then(([row]) => {
      if (row) {
        console.log(row)
        return { row }
      } else {
        console.log(`Aucune Utilisateur avec l'id ${idUtilisateur}`)
        return null
      }
    })
  // Retourne une erreur s'il y a une erreur
    .catch((error) => {
      console.error(error.message)
      throw error
    })
}

// Fonction pour l'obtention d'un deplacement avec son id
function obtenirDemande (idDemande) {
  // Requete SQLite
  const requete = 'select * from DeplacementsDemandes where idDeplacementDemandes = ?'
  // Creation d'un objet Promise pour permettre une action asynchrone ce qui permet de faire fonctionner le fichier dal.test.js
  const prom1 = new Promise((resolve, reject) => {
    // Execution de la requete SQL
    db.get(requete, [idDemande], (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
  // Retourne le resultat de la Promise
  return Promise.all([prom1])
    .then(([row]) => {
      if (row) {
        console.log(row)
        return { row }
      } else {
        console.log(`Aucune Demande avec l'id ${idDemande}`)
        return null
      }
    })
    // Retourne une erreur s'il y a une erreur
    .catch((error) => {
      console.error(error.message)
      throw error
    })
}

function DemandesAvenirFiltre (filtre) {
  // Requete SQLite
  const dateActuelle = new Date().toISOString().split('T')[0]
  let requeteMod = 0
  let requete = 'select DeplacementsDemandes.* from DeplacementsDemandes WHERE dateDeplacementDemande > ?'
  if (filtre && filtre !== '') {
    requeteMod = 1
    requete += ' and (idDeplacementDemandes = ? OR destinationDemandee LIKE ? OR dateDeplacementDemande = ? OR heureDeplacementDemande = ? OR precisionDeplacementDemande = ?)'
  }
  // Creation d'un objet Promise pour permettre une action asynchrone ce qui permet de faire fonctionner le fichier dal.test.js
  const prom1 = new Promise((resolve, reject) => {
    // Execution de la requete SQL
    if (requeteMod === 1) {
      db.all(requete, [dateActuelle, filtre, `%${filtre}%`, filtre, filtre, filtre], (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    } else if (requeteMod === 0) {
      db.all(requete, [dateActuelle], (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    }
  })
  // Retourne le resultat de la Promise
  return Promise.all([prom1])
    .then(([rows]) => {
      if (rows) {
        console.log(rows)
        return { rows }
      } else {
        console.log('Aucune Demande Demande')
        return null
      }
    })
    // Retourne une erreur s'il y a une erreur
    .catch((error) => {
      console.error(error.message)
      throw error
    })
}

// Fonction pour l'obtention de toute la table DeplacementsDemandes
function DemandesAVenir () {
  // Requete SQLite
  const requete = 'select * from DeplacementsDemandes'
  // Variable de stockage des resultats de la requete SQL
  const demandes = []
  // Creation d'un objet Promise pour permettre une action asynchrone ce qui permet de faire fonctionner le fichier dal.test.js
  const prom1 = new Promise((resolve, reject) => {
    // Execution de la requete SQL qui retourne le resultat dans la variable demandes
    db.all(requete, [], (err, rows) => {
      if (err) {
        reject(err)
      }
      rows.forEach((row) => {
        demandes.push(row)
      })
      resolve(demandes)
    })
  })
  // Retourne le resultat de la Promise
  return Promise.all([prom1])
    .then(([demandes]) => {
      if (demandes) {
        console.log(demandes)
        return { demandes }
      } else {
        console.log('[-] Erreur lors de la recuperation des demandes a venir')
        return null
      }
    })
    // Retourne une erreur s'il y a une erreur
    .catch((error) => {
      console.error(error.message)
      throw error
    })
}

// Fonction pour l'obtention d'un utilisateur ainsi que toutes les demandes de deplacements faites
function obtenirUtilisateurEtDemandes (idUtilisateur) {
  // Variable de stockage des resultats de la requete SQL
  const demandes = []
  // Requetes SQLite
  const requete1 = 'select * from Utilisateurs where idUtilisateur = ?'
  const requete2 = 'select DeplacementsDemandes * from Utilisateurs right join DeplacementsDemandes on Utilisateurs.idUtilisateur =  DeplacementsDemandes.idDemandeur where idUtilisateur = ?'
  // Creation d'un objet Promise pour permettre une action asynchrone ce qui permet de faire fonctionner le fichier dal.test.js
  const prom1 = new Promise((resolve, reject) => {
    // Execution de la requete SQL qui retourne le resultat dans la variable demandes
    db.all(requete2, [idUtilisateur], (err, rows) => {
      if (err) {
        reject(err)
      }
      rows.forEach((row) => {
        demandes.push(row)
      })
      resolve(demandes)
    })
  })
  // Creation d'un objet Promise pour permettre une action asynchrone ce qui permet de faire fonctionner le fichier dal.test.js
  const prom2 = new Promise((resolve, reject) => {
    // Execution de la requete SQL
    db.get(requete1, [idUtilisateur], (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
  // Retourne le resultat de la Promise
  return Promise.all([prom1, prom2])
    .then(([demandes, row]) => {
      if (row) {
        console.log(row, '\ndemandes: ', demandes)
        return { row, demandes }
      } else {
        console.log(`Aucun utilisateur avec l'id ${idUtilisateur}`)
        return null
      }
    })
    // Retourne une erreur s'il y a une erreur
    .catch((error) => {
      console.error(error.message)
      throw error
    })
}

// Fonction pour ajouter un utilisateur
function ajouterUtilisateur (User) {
  return new Promise((resolve, reject) => {
    // Requete SQLite
    const requete = 'insert into Utilisateurs(prenom, nom, adresse, adresseCourriel, numeroTelephone, motDePasse) values (?, ?, ?, ?, ?, ?)'
    // Execution de la requete SQL
    db.run(requete, [User.prenom, User.nom, User.adresse, User.adresseCourriel, User.numeroTelephone, User.motDePasse], function (err) {
      if (err) {
        return console.log(err.message)
      }
      console.log(`[+] Utilisateur ajoute correctement, id: ${this.lastID}\n`)
      resolve({ id: this.lastID })
    })
  })
}

// Fonction pour ajouter un deplacement demande
function ajouterDeplacementsDemandes (DeplacementDemande) {
  // Requete SQLite
  const requete = 'insert into DeplacementsDemandes(idDemandeur, destinationDemandee, dateDeplacementDemande, heureDeplacementDemande, precisionDeplacementDemande) values (?, ?, ?, ?, ?)'
  // Execution de la requete SQL
  db.run(requete, [DeplacementDemande.idDemandeur, DeplacementDemande.destinationDemandee, DeplacementDemande.dateDeplacementDemande, DeplacementDemande.heureDeplacementDemande, DeplacementDemande.precisionDeplacementDemande], function (err) {
    if (err) {
      return console.log(err.message)
    }
    console.log(`[+] Deplacement demande ajoute correctement, id: ${this.lastID}\n`)
  })
}

// Fonction pour ajouter un nouveau deplacement offert
function ajouterDeplacementsOfferts (DeplacementOffert) {
  // Requete SQLite
  const requete = 'insert into DeplacementsOfferts(idUtilisateurConducteur, destination, dateDeplacement, heure, nbrPlaceDisponible, cout, comptant, interact, precisionDeplacement) values (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  // Execution de la requete SQL
  db.run(requete, [DeplacementOffert.idUtilisateurConducteur, DeplacementOffert.destination, DeplacementOffert.dateDeplacement, DeplacementOffert.heure, DeplacementOffert.nbrPlaceDisponible, DeplacementOffert.cout, DeplacementOffert.comptant, DeplacementOffert.interact, DeplacementOffert.precisionDeplacement], function (err) {
    if (err) {
      return console.log(err.message)
    }
    console.log(`[+] Deplacement offert ajoute correctement, id: ${this.lastID}\n`)
  })
}

// Fonction pour ajouter une nouvelle reservation
function ajouterReservations (Reservation) {
  // Requete SQLite
  const requete = 'insert into Reservations(idUtilisateurPassager, idDeplacement) values (?, ?)'
  // Execution de la requete SQL
  db.run(requete, [Reservation.idUtilisateurPassager, Reservation.idDeplacement], function (err) {
    if (err) {
      return console.log(err.message)
    }
    console.log(`[+] Reservation ajoute correctement, id: ${this.lastID}\n`)
  })
}

// Fonction pour modifier une donnee dans la table Utilisateurs
function modifierUtilisateur (UseriD, champAModifie, new_data) {
  // Creation de la variable de requete
  let requete = ''
  // Creation de la variable de verification de champ, si le champ existe bien ou est bien ecrit
  let verif = false
  // Formatage de l'input de l'utilisateur, retirer les espaces et mettre les characteres en minuscule pour pouvoir choisir correctement le champ a modifier
  champAModifie = (champAModifie.toLowerCase()).replace(/\s/g, '')
  // Selection du champ a modifier
  if (champAModifie === 'prenom') {
    requete = 'update Utilisateurs set prenom = ? where idUtilisateur = ?'
    verif = true
  } else if (champAModifie === 'nom') {
    requete = 'update Utilisateurs set nom = ? where idUtilisateur = ?'
    verif = true
  } else if (champAModifie === 'adresse') {
    requete = 'update Utilisateurs set adresse = ? where idUtilisateur = ?'
    verif = true
  } else if (champAModifie === 'adressecourriel') {
    requete = 'update Utilisateurs set adresseCourriel = ? where idUtilisateur = ?'
    verif = true
  } else if (champAModifie === 'numerotelephone') {
    requete = 'update Utilisateurs set numeroTelephone = ? where idUtilisateur = ?'
    verif = true
  } else if (champAModifie === 'motdepasse') {
    requete = 'update Utilisateurs set motDePasse = ? where idUtilisateur = ?'
    verif = true
  } else { // Dans le cas d'un champs mal ecrit ou inexistant, retourne un message d'erreur
    console.log("Erreur, ce champs n'existe pas")
  }
  // Si la variable verif est vrai, alors il execute la requete
  if (verif) {
    // Requete SQLite
    const requete2 = 'select * from Utilisateurs where idUtilisateur = ?'
    // Variable de stockage des resultats de la requete SQL
    let ligneModifie = {}
    // Execution d'une requete SQL qui retourne une variable contenant la ligne modifie
    db.get(requete2, [UseriD], (err, row) => {
      if (err) {
        return console.log(err.message)
      }
      ligneModifie = row
    })
    // Execution d'une requete SQL qui affiche la ligne modifie
    db.run(requete, [new_data, UseriD], function (err) {
      if (err) {
        return console.log(err.message, '\n[-] Erreur lors de la modification')
      }
      console.log(`[+] Utilisateur modifié correctement, ligne modifiee: \n\n${JSON.stringify(ligneModifie)}\n`) // Formatage de la variable pour ne pas avoir [object Object] lors de l'affichage du resultat de la requete
    })
  }
}

// Fonction pour modifier un deplacement demande
function modifierDeplacementDemande (DeplacementDemandeiD, idDemandeur, champAModifie, new_data) {
  // Creation de la variable de requete
  let requete = ''
  // Creation de la variable de verification de champ, si le champ existe bien ou est bien ecrit
  let verif = false
  // Formatage de l'input de l'utilisateur, retirer les espaces et mettre les characteres en minuscule pour pouvoir choisir correctement le champ a modifier
  champAModifie = (champAModifie.toLowerCase()).replace(/\s/g, '')
  // Selection du champ a modifier
  if (champAModifie === 'destinationdemandee') {
    requete = 'update DeplacementsDemandes set destinationDemandee = ? where idDeplacementDemandes = ? and idDemandeur = ?'
    verif = true
  } else if (champAModifie === 'datedeplacementdemande') {
    requete = 'update DeplacementsDemandes set datedeplacementdemande = ? where idDeplacementDemandes = ? and idDemandeur = ?'
    verif = true
  } else if (champAModifie === 'heuredeplacementdemande') {
    requete = 'update DeplacementsDemandes set heuredeplacementdemande = ? where idDeplacementDemandes = ? and idDemandeur = ?'
    verif = true
  } else if (champAModifie === 'precisiondeplacementdemande') {
    requete = 'update DeplacementsDemandes set precisiondeplacementdemande = ? where idDeplacementDemandes = ? and idDemandeur = ?'
    verif = true
  } else { // Dans le cas d'un champs mal ecrit ou inexistant, retourne un message d'erreur
    console.log("Erreur, ce champs n'existe pas")
  }
  // Si la variable verif est vrai, alors il execute la requete
  if (verif) {
    // Requete SQLite
    const requete2 = 'select * from DeplacementsDemandes where idDeplacementDemandes = ?'
    // Variable de stockage des resultats de la requete SQL
    let ligneModifie = {}
    // Execution d'une requete SQL qui retourne une variable contenant la ligne modifie
    db.get(requete2, [DeplacementDemandeiD], (err, row) => {
      if (err) {
        return console.log(err.message)
      }
      ligneModifie = row
    })
    // Execution d'une requete SQL qui affiche la ligne modifie
    db.run(requete, [new_data, DeplacementDemandeiD, idDemandeur], function (err) {
      if (err) {
        return console.log(err.message, '\n[-] Erreur lors de la modification')
      }
      console.log(`[+] Deplacement demande modifié correctement, ligne modifiee: \n\n${JSON.stringify(ligneModifie)}\n`) // Formatage de la variable pour ne pas avoir [object Object] lors de l'affichage du resultat de la requete
    })
  }
}

// Fonction pour modifier un deplacement offert
function modifierDeplacementOffert (DeplacementOffertiD, idConducteur, champAModifie, new_data) {
  return new Promise((resolve, reject) => {
    // Creation de la variable de requete
    let requete = ''
    // Creation de la variable de verification de champ, si le champ existe bien ou est bien ecrit
    let verif = false
    // Formatage de l'input de l'utilisateur, retirer les espaces et mettre les characteres en minuscule pour pouvoir choisir correctement le champ a modifier
    champAModifie = (champAModifie.toLowerCase()).replace(/\s/g, '')
    // Variable pour obtenir la date actuelle
    const DateActuelle = new Date()
    // Execution d'une requete SQL qui affiche la date de deplacement et l'heure selon l'identifiant d'un deplacement
    db.get('SELECT dateDeplacement, heure FROM DeplacementsOfferts WHERE idDeplacement = ?', [DeplacementOffertiD], (err, row) => {
      // Retourne un message d'erreur s'il y a une erreur
      if (err) {
        console.error(err.message)
        return
      }
      // Variable de verification des restrictions sur le temps
      const reservationDatetime = new Date(row.dateDeplacement + ' ' + row.heure)
      const timeDiff = (reservationDatetime - DateActuelle) / (1000 * 60 * 60)
      // Verification des restrictions sur le temps, aucun deplacement ne peut etre modifier 1 heure avant le temps de depart
      if (DateActuelle < reservationDatetime || timeDiff > 1) {
        // Selection du champ a modifier
        if (champAModifie === 'destination') {
          requete = 'update DeplacementsOfferts set destination = ? where idDeplacement = ? and idUtilisateurConducteur = ?'
          verif = true
        } else if (champAModifie === 'datedeplacement') {
          requete = 'update DeplacementsOfferts set dateDeplacement = ? where idDeplacement = ? and idUtilisateurConducteur = ?'
          verif = true
        } else if (champAModifie === 'heure') {
          requete = 'update DeplacementsOfferts set heure = ? where idDeplacement = ? and idUtilisateurConducteur = ?'
          verif = true
        } else if (champAModifie === 'nombreplacedisponible') {
          requete = 'update DeplacementsOfferts set nbrPlaceDisponible = ? where idDeplacement = ? and idUtilisateurConducteur = ?'
          verif = true
        } else if (champAModifie === 'cout') {
          requete = 'update DeplacementsOfferts set cout = ? where idDeplacement = ? and idUtilisateurConducteur = ?'
          verif = true
        } else if (champAModifie === 'comptant') {
          requete = 'update DeplacementsOfferts set comptant = ? where idDeplacement = ? and idUtilisateurConducteur = ?'
          verif = true
        } else if (champAModifie === 'interact') {
          requete = 'update DeplacementsOfferts set interact = ? where idDeplacement = ? and idUtilisateurConducteur = ?'
          verif = true
        } else if (champAModifie === 'precisiondeplacement') {
          requete = 'update DeplacementsOfferts set precisiondeplacement = ? where idDeplacement = ? and idUtilisateurConducteur = ?'
          verif = true
        } else { // Dans le cas d'un champs mal ecrit ou inexistant, retourne un message d'erreur
          console.log("Erreur, ce champs n'existe pas")
        }
      } else { console.log('[-] Impossible de modifier 1h avant le deplacement') } // Retourne une erreur si la restriction sur le temps n'est pas respecte

      // Si la variable verif est vrai, alors il execute la requete
      if (verif) {
        // Requete SQLite
        // const requete2 = 'select * from DeplacementsOfferts where idDeplacement = ?'
        // Variable de stockage des resultats de la requete SQL
        // let ligneModifie = {}
        // Execution d'une requete SQL qui retourne une variable contenant la ligne modifie
        // db.get(requete2, [DeplacementOffertiD], (err, row) => {
        //   if (err) {
        //     return console.log(err.message)
        //   }
        //   ligneModifie = row
        // })
        // Execution d'une requete SQL qui affiche la ligne modifie
        db.run(requete, [new_data, DeplacementOffertiD, idConducteur], function (err) {
          if (err) {
            return console.log(err.message, '\n[-] Erreur lors de la modification')
          }
          // console.log(`[+] Deplacement offert modifié correctement, ligne modifiee: \n\n${JSON.stringify(ligneModifie)}\n`)
          resolve({ message: '[+] Deplacement offert modifié correctement' })
        })
      }
    })
  })
}

// Fonction pour modifier une reservation
function modifierReservation (ReservationiD, champAModifie, new_data) {
  // Creation de la variable de requete
  let requete = ''
  // Creation de la variable de verification de champ, si le champ existe bien ou est bien ecrit
  let verif = false
  // Formatage de l'input de l'utilisateur, retirer les espaces et mettre les characteres en minuscule pour pouvoir choisir correctement le champ a modifier
  champAModifie = (champAModifie.toLowerCase()).replace(/\s/g, '')
  // Selection du champ a modifier
  if (champAModifie === 'iddeplacement') {
    requete = 'update Reservations set prenom = ? where idReservation = ?'
    verif = true
  } else { // Dans le cas d'un champs mal ecrit ou inexistant, retourne un message d'erreur
    console.log("Erreur, ce champs n'existe pas")
  }
  // Si la variable verif est vrai, alors il execute la requete
  if (verif) {
    // Requete SQLite
    const requete2 = 'select * from Reservations where idReservation = ?'
    // Variable de stockage des resultats de la requete SQL
    let ligneModifie = {}
    // Execution d'une requete SQL qui retourne une variable contenant la ligne modifie
    db.get(requete2, [ReservationiD], (err, row) => {
      if (err) {
        return console.log(err.message)
      }
      ligneModifie = row
    })
    // Execution d'une requete SQL qui affiche la ligne modifie
    db.run(requete, [new_data, ReservationiD], function (err) {
      if (err) {
        return console.log(err.message, '\n[-] Erreur lors de la modification')
      }
      console.log(`[+] Reservation modifié correctement, ligne modifiee: \n\n${JSON.stringify(ligneModifie)}\n`)
    })
  }
}

// Fonction pour supprimer un utilisateur
function supprimerUtilisateur (keyForDelete, dataForDelete) {
  // Creation des variables de requete
  let requete = ''
  let requete2 = ''
  let requete3 = ''
  let requete4 = ''
  // Variable qui compte le nombre de ligne
  let compteurDeLignes = ''
  // Creation de la variable de verification de champ, si le champ existe bien ou est bien ecrit
  let verif = false
  // Formatage de l'input de l'utilisateur, retirer les espaces et mettre les characteres en minuscule pour pouvoir choisir correctement le champ a modifier
  keyForDelete = (keyForDelete.toLowerCase()).replace(/\s/g, '')
  // Selection du champ par lequel supprimer
  if (keyForDelete === 'idutilisateur') {
    // Requetes pour retirer dans toutes les tables si l'utilisateur a des instances dans la base de donnee
    requete = 'delete from Utilisateurs where idUtilisateur = ?'
    requete2 = 'delete from DeplacementsDemandes where idDemandeur = ?'
    requete3 = 'delete from DeplacementsOfferts where idUtilisateurConducteur = ?'
    requete4 = 'delete from Reservations where idUtilisateurPassager = ?'
    compteurDeLignes = 'select count(*) as \'NombreDeLigneSupprimer\' from Utilisateurs where idUtilisateur = ?'
    verif = true
  } else if (keyForDelete === 'adressecourriel') {
    // Requetes pour retirer dans toutes les tables si l'utilisateur a des instances dans la base de donnee
    requete = 'delete from Utilisateurs where adresseCourriel = ?'
    requete2 = 'delete from DeplacementsDemandes where idDemandeur in (select idUtilisateur from Utilisateurs where adresseCourriel = ?)'
    requete3 = 'delete from DeplacementsOfferts where idUtilisateurConducteur in (select idUtilisateur from Utilisateurs where adresseCourriel = ?)'
    requete4 = 'delete from Reservations where idUtilisateurPassager in (select idUtilisateur from Utilisateurs where adresseCourriel = ?)'
    compteurDeLignes = 'select count(*) as \'NombreDeLigneSupprimer\' from Utilisateurs where idUtilisateur in (select idUtilisateur from Utilisateurs where adresseCourriel = ?)'
    verif = true
  } else { // Dans le cas d'un champs mal ecrit, non supporter pour la suppression ou inexistant, retourne un message d'erreur
    console.log("Erreur, ce champs n'existe pas ou la suppression par ce champs n'est pas supporte")
  }
  // Si la variable verif est vrai, alors il execute les requetes
  if (verif) {
    // Variable qui garde le nombre de ligne
    let nbrLigneSupprimer = ''
    // Execution d'une requete SQL qui retourne une variable contenant le nombre de ligne
    db.get(compteurDeLignes, [dataForDelete], (err, row) => {
      if (err) {
        return console.log(err.message)
      }
      nbrLigneSupprimer = row
      // Execution d'une requete SQL qui affiche le nombre de ligne supprime
      db.run(requete2, [dataForDelete], function (err) {
        if (err) {
          return console.log(err.message, '\n[-] Erreur lors de la suppression')
        }
        console.log(`[+] Utilisateur supprime correctement, nombre de ligne supprime: \n\n${JSON.stringify(nbrLigneSupprimer)}\n`) // Formatage de la variable pour ne pas avoir [object Object] lors de l'affichage du resultat de la requete
      })
      // Execution d'une requete SQL qui affiche le nombre de ligne supprime
      db.run(requete3, [dataForDelete], function (err) {
        if (err) {
          return console.log(err.message, '\n[-] Erreur lors de la suppression')
        }
        console.log(`[+] Utilisateur supprime correctement, nombre de ligne supprime: \n\n${JSON.stringify(nbrLigneSupprimer)}\n`) // Formatage de la variable pour ne pas avoir [object Object] lors de l'affichage du resultat de la requete
      })
      // Execution d'une requete SQL qui affiche le nombre de ligne supprime
      db.run(requete4, [dataForDelete], function (err) {
        if (err) {
          return console.log(err.message, '\n[-] Erreur lors de la suppression')
        }
        console.log(`[+] Utilisateur supprime correctement, nombre de ligne supprime: \n\n${JSON.stringify(nbrLigneSupprimer)}\n`) // Formatage de la variable pour ne pas avoir [object Object] lors de l'affichage du resultat de la requete
      })
      // Execution d'une requete SQL qui affiche le nombre de ligne supprime
      db.run(requete, [dataForDelete], function (err) {
        if (err) {
          return console.log(err.message, '\n[-] Erreur lors de la suppression')
        }
        console.log(`[+] Utilisateur supprime correctement, nombre de ligne supprime: \n\n${JSON.stringify(nbrLigneSupprimer)}\n`) // Formatage de la variable pour ne pas avoir [object Object] lors de l'affichage du resultat de la requete
      })
    })
  }
}

// Fonction pour supprimer des deplacements offerts
function supprimerDeplacementOfferts (keyForDelete, dataForDelete, DeplacementsOffertsiDs) {
  // Creation des variables de requete
  let requete = ''
  let requete2 = ''
  // Variable qui compte le nombre de ligne
  let compteurDeLignes = ''
  // Creation de la variable de verification de champ, si le champ existe bien ou est bien ecrit
  let verif = false
  // Formatage de l'input de l'utilisateur, retirer les espaces et mettre les characteres en minuscule pour pouvoir choisir correctement le champ a modifier
  keyForDelete = (keyForDelete.toLowerCase()).replace(/\s/g, '')
  // Variable pour obtenir la date actuelle
  const DateActuelle = new Date()
  // Variable qui contient une liste des identifiants des deplacements offerts
  const placeholders = DeplacementsOffertsiDs.map(() => '?').join(', ')
  // Requete des deplacements a supprimer
  const query = `SELECT idDeplacement, dateDeplacement, heure FROM DeplacementsOfferts WHERE idDeplacement IN (${placeholders})`
  // Execution d'une requete SQL
  db.all(query, DeplacementsOffertsiDs, (err, rows) => {
    if (err) {
      console.error(err.message)
      return
    }

    rows.forEach(row => {
      // Auto Incrementation de la variable compteurDeLignes
      compteurDeLignes += 1
      // Variable de verification des restrictions sur le temps
      const reservationDatetime = new Date(row.dateDeplacement + ' ' + row.heure)
      const timeDiff = (reservationDatetime - DateActuelle) / (1000 * 60 * 60)
      // Verification des restrictions sur le temps, aucun deplacement ne peut etre modifier 1 heure avant le temps de depart
      if (DateActuelle < reservationDatetime || timeDiff > 1) {
        // Selection du champ par lequel supprimer
        if (keyForDelete === 'iddeplacement') {
          requete = 'delete from DeplacementsOfferts where idDeplacement = ?'
          requete2 = 'delete from Reservations where idDeplacement = ?'
          verif = true
        } else if (keyForDelete === 'idutilisateurconducteur') {
          requete = 'delete from DeplacementsOfferts where idUtilisateurConducteur = ?'
          requete2 = 'delete from Reservations where idDeplacement in (select idDeplacement from DeplacementsOfferts where idUtilisateurConducteur = ?)'
          verif = true
        } else if (keyForDelete === 'destination') {
          requete = 'delete from DeplacementsOfferts where destination = ?'
          requete2 = 'delete from Reservations where idDeplacement in (select idDeplacement from DeplacementsOfferts where destination = ?)'
          verif = true
        } else if (keyForDelete === 'datedeplacement') {
          requete = 'delete from DeplacementsOfferts where dateDeplacement = ?'
          requete2 = 'delete from Reservations where idDeplacement in (select idDeplacement from DeplacementsOfferts where dateDeplacement = ?)'
          verif = true
        } else if (keyForDelete === 'heure') {
          requete = 'delete from DeplacementsOfferts where heure = ?'
          requete2 = 'delete from Reservations where idDeplacement in (select idDeplacement from DeplacementsOfferts where heure = ?)'
          verif = true
        } else if (keyForDelete === 'cout') {
          requete = 'delete from DeplacementsOfferts where cout = ?'
          requete2 = 'delete from Reservations where idDeplacement in (select idDeplacement from DeplacementsOfferts where cout = ?)'
          verif = true
        } else if (keyForDelete === 'comptant') {
          requete = 'delete from DeplacementsOfferts where comptant = ?'
          requete2 = 'delete from Reservations where idDeplacement in (select idDeplacement from DeplacementsOfferts where comptant = ?)'
          verif = true
        } else if (keyForDelete === 'interact') {
          requete = 'delete from DeplacementsOfferts where interact = ?'
          requete2 = 'delete from Reservations where idDeplacement in (select idDeplacement from DeplacementsOfferts where interact = ?)'
          verif = true
        } else { // Dans le cas d'un champs mal ecrit, non supporter pour la suppression ou inexistant, retourne un message d'erreur
          console.log("Erreur, ce champs n'existe pas ou la suppression par ce champs n'est pas supporte")
        }
      }
    })
    // Si la variable verif est vrai, alors il execute les requetes
    if (verif) {
      // Execution d'une requete SQL qui retourne un message de confirmation lors de la suppression
      db.run(requete2, [dataForDelete], function (err) {
        if (err) {
          return console.log(err.message, '\n[-] Erreur lors de la suppression')
        }
        console.log('[+] DeplacementsOffert supprime correctement\n')
      })
      // Execution d'une requete SQL qui retourne un message de confirmation lors de la suppression
      db.run(requete, [dataForDelete], function (err) {
        if (err) {
          return console.log(err.message, '\n[-]Erreur lors de la suppression')
        }
        console.log(`[+] DeplacementOffert supprime correctement , nombre de ligne supprime: \n\n${compteurDeLignes}\n`)
      })
    } else { console.log('[-] Impossible de modifier le deplacements s il reste moins d 1h') } // Retourne une erreur si la restriction sur le temps n'est pas respecte
  })
}

// Fonction pour supprimer un deplacement demande
function supprimerDeplacementDemande (keyForDelete, dataForDelete) {
  // Creation de la variable de requete
  let requete = ''
  // Variable qui compte le nombre de ligne
  let compteurDeLignes = ''
  // Creation de la variable de verification de champ, si le champ existe bien ou est bien ecrit
  let verif = false
  // Formatage de l'input de l'utilisateur, retirer les espaces et mettre les characteres en minuscule pour pouvoir choisir correctement le champ a modifier
  keyForDelete = (keyForDelete.toLowerCase()).replace(/\s/g, '')
  // Selection du champ par lequel supprimer
  if (keyForDelete === 'iddeplacementdemandes') {
    requete = 'delete from DeplacementsDemandes where idDeplacementDemandes = ?'
    compteurDeLignes = "select count(*) as 'NombreDeLigneSupprimer' from DeplacementsDemandes where idDeplacementDemandes = ?"
    verif = true
  } else if (keyForDelete === 'iddemandeur') {
    requete = 'delete from DeplacementsDemandes where idDemandeur = ?'
    compteurDeLignes = "select count(*) as 'NombreDeLigneSupprimer' from DeplacementsDemandes where idDemandeur = ?"
    verif = true
  } else if (keyForDelete === 'destinationdemandee') {
    requete = 'delete from DeplacementsDemandes where destinationDemandee = ?'
    compteurDeLignes = 'select count(*) as \'NombreDeLigneSupprimer\' from DeplacementsDemandes where destinationDemandee = ?'
    verif = true
  } else if (keyForDelete === 'datedeplacementdemande') {
    requete = 'delete from DeplacementsDemandes where dateDeplacementDemande = ?'
    compteurDeLignes = 'select count(*) as \'NombreDeLigneSupprimer\' from DeplacementsDemandes where dateDeplacementDemande = ?'
    verif = true
  } else if (keyForDelete === 'heuredeplacementdemande') {
    requete = 'delete from DeplacementsDemandes where heureDeplacementDemande = ?'
    compteurDeLignes = 'select count(*) as \'NombreDeLigneSupprimer\' from DeplacementsDemandes where where heureDeplacementDemande = ?'
    verif = true
  } else { // Dans le cas d'un champs mal ecrit, non supporter pour la suppression ou inexistant, retourne un message d'erreur
    console.log("Erreur, ce champs n'existe pas ou la suppression par ce champs n'est pas supporte")
  }
  // Si la variable verif est vrai, alors il execute les requetes
  if (verif) {
    // Variable qui garde le nombre de ligne
    let nbrLigneSupprimer = ''
    // Execution d'une requete SQL qui retourne une variable contenant le nombre de ligne
    db.all(compteurDeLignes, [dataForDelete], (err, rows) => {
      if (err) {
        return console.log(err.message)
      }
      nbrLigneSupprimer = rows
    })
    // Execution d'une requete SQL qui affiche le nombre de ligne supprime
    db.run(requete, [dataForDelete], function (err) {
      if (err) {
        return console.log(err.message, '\n[-] Erreur lors de la suppression')
      }
      console.log(`[+] DeplacementDemande supprime correctement, nombre de ligne supprime: \n\n${JSON.stringify(nbrLigneSupprimer)}\n`) // Formatage de la variable pour ne pas avoir [object Object] lors de l'affichage du resultat de la requete
    })
  }
}

// Fonction qui supprime une reservation
function supprimerReservation (keyForDelete, dataForDelete) {
  // Creation de la variable de requete
  let requete = ''
  // Variable qui compte le nombre de ligne
  let compteurDeLignes = ''
  // Creation de la variable de verification de champ, si le champ existe bien ou est bien ecrit
  let verif = false
  // Formatage de l'input de l'utilisateur, retirer les espaces et mettre les characteres en minuscule pour pouvoir choisir correctement le champ a modifier
  keyForDelete = (keyForDelete.toLowerCase()).replace(/\s/g, '')

  // Selection du champ par lequel supprimer
  if (keyForDelete === 'idreservation') {
    requete = 'delete from Reservations where idReservation = ?'
    compteurDeLignes = 'select count(*) as \'NombreDeLigneSupprimer\' from Reservations where idReservation = ?'
    verif = true
  } else if (keyForDelete === 'idutilisateurpassager') {
    requete = 'delete from Reservations where idUtilisateurPassager = ?'
    compteurDeLignes = 'select count(*) as \'NombreDeLigneSupprimer\' from Reservations where idUtilisateurPassager = ?'
    verif = true
  } else if (keyForDelete === 'idDeplacement') {
    requete = 'delete from Reservations where idDeplacement = ?'
    compteurDeLignes = 'select count(*) as \'NombreDeLigneSupprimer\' from Reservations where idDeplacement = ?'
    verif = true
  } else { // Dans le cas d'un champs mal ecrit, non supporter pour la suppression ou inexistant, retourne un message d'erreur
    console.log("Erreur, ce champs n'existe pas ou la suppression par ce champs n'est pas supporte")
  }
  // Si la variable verif est vrai, alors il execute les requetes
  if (verif) {
    // Variable qui garde le nombre de ligne
    let nbrLigneSupprimer = ''
    // Execution d'une requete SQL qui retourne une variable contenant le nombre de ligne
    db.all(compteurDeLignes, [dataForDelete], (err, rows) => {
      if (err) {
        return console.log(err.message)
      }
      nbrLigneSupprimer = rows
    })
    // Execution d'une requete SQL qui affiche le nombre de ligne supprime
    db.run(requete, [dataForDelete], function (err) {
      if (err) {
        return console.log(err.message, '\n[-] Erreur lors de la suppression')
      }
      console.log(`[+] Reservation supprimee correctement, nombre de ligne supprime: \n\n${JSON.stringify(nbrLigneSupprimer)}\n`) // Formatage de la variable pour ne pas avoir [object Object] lors de l'affichage du resultat de la requete
    })
  }
}

function VerifierUtilisateur (email, password) {
  // Requetes SQLite
  const requete1 = 'select * from Utilisateurs where adresseCourriel = ? and motDePasse = ?'
  // Creation d'un objet Promise pour permettre une action asynchrone ce qui permet de faire fonctionner le fichier dal.test.js
  const prom1 = new Promise((resolve, reject) => {
    // Execution de la requete SQL
    db.get(requete1, [email, password], (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
  // Retourne le resultat de la Promise
  return Promise.all([prom1])
    .then((row) => {
      if (row) {
        console.log(row)
        return { row }
      } else {
        console.log('Aucun utilisateur')
        return null
      }
    })
    // Retourne une erreur s'il y a une erreur
    .catch((error) => {
      console.error(error.message)
      throw error
    })
}

function obtenirDeplacementsDemandes (id) {
  // Requete SQLite
  const requete = 'select * from DeplacementsDemandes where idDemandeur = ?'
  // Creation d'un objet Promise pour permettre une action asynchrone ce qui permet de faire fonctionner le fichier dal.test.js
  const prom1 = new Promise((resolve, reject) => {
    // Execution de la requete SQL
    db.all(requete, [id], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
  // Retourne le resultat de la Promise
  return Promise.all([prom1])
    .then(([rows]) => {
      if (rows) {
        console.log(rows)
        return { rows }
      } else {
        console.log('Aucune Demande Demande')
        return null
      }
    })
    // Retourne une erreur s'il y a une erreur
    .catch((error) => {
      console.error(error.message)
      throw error
    })
}

function obtenirDeplacementOffertUtilisateur (id) {
  // Requete SQLite
  const dateActuelle = new Date().toISOString().split('T')[0]
  const requete = 'select * from DeplacementsOfferts where idUtilisateurConducteur = ? AND dateDeplacement > ?'
  // Creation d'un objet Promise pour permettre une action asynchrone ce qui permet de faire fonctionner le fichier dal.test.js
  const prom1 = new Promise((resolve, reject) => {
    // Execution de la requete SQL
    db.all(requete, [id, dateActuelle], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
  // Retourne le resultat de la Promise
  return Promise.all([prom1])
    .then(([rows]) => {
      if (rows) {
        console.log(rows)
        return { rows }
      } else {
        console.log('Aucune utilisateur')
        return null
      }
    })
    // Retourne une erreur s'il y a une erreur
    .catch((error) => {
      console.error(error.message)
      throw error
    })
}

function obtenirDeplacementsOfferts (filtre, MesDeplacements) {
  // Requete SQLite
  const dateActuelle = new Date().toLocaleDateString(['sv-SE'])

  let requeteMod = 0
  let requete = "select DeplacementsOfferts.*, Utilisateurs.prenom || ' ' || Utilisateurs.nom AS nomcomplet from DeplacementsOfferts join Utilisateurs on DeplacementsOfferts.idUtilisateurConducteur = Utilisateurs.idUtilisateur WHERE dateDeplacement >= ?"

  if (filtre && filtre !== '' && (MesDeplacements === 'non' || !MesDeplacements)) {
    requeteMod = 1
    requete += ' and (idDeplacement = ? OR idUtilisateurConducteur = ? OR destination LIKE ? OR dateDeplacement LIKE ? OR heure = ? OR nbrPlaceDisponible = ? OR cout = ? OR comptant = ? OR interact = ? OR precisionDeplacement LIKE ?)'
  } else if (filtre && filtre !== '' && (MesDeplacements === 'oui' || MesDeplacements)) {
    requeteMod = 2
    requete += ' and (idUtilisateurConducteur = ?)'
  }
  console.log(MesDeplacements)
  // Creation d'un objet Promise pour permettre une action asynchrone ce qui permet de faire fonctionner le fichier dal.test.js
  const prom1 = new Promise((resolve, reject) => {
    // Execution de la requete SQL
    if (requeteMod === 1) {
      db.all(requete, [dateActuelle, filtre, filtre, `%${filtre}%`, `%${filtre}%`, filtre, filtre, filtre, filtre, filtre, `%${filtre}%`], (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    } else if (requeteMod === 0) {
      db.all(requete, [dateActuelle], (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    } else if (requeteMod === 2) {
      db.all(requete, [dateActuelle, filtre], (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    }
  })
  // Retourne le resultat de la Promise
  return Promise.all([prom1])
    .then(([rows]) => {
      if (rows) {
        console.log(rows)
        return { rows }
      } else {
        console.log('Aucune Demande Offerte')
        return null
      }
    })
    // Retourne une erreur s'il y a une erreur
    .catch((error) => {
      console.error(error.message)
      throw error
    })
}

function obtenirReservations (id) {
  // Requete SQLite
  const dateActuelle = new Date().toISOString().split('T')[0]
  const requete = "select idReservation, Utilisateurs.prenom || ' ' || Utilisateurs.nom AS nomcomplet, destination, dateDeplacement, heure, nbrPlaceDisponible, cout, comptant, interact, precisionDeplacement from Reservations join DeplacementsOfferts on Reservations.idDeplacement = DeplacementsOfferts.idDeplacement join Utilisateurs on Utilisateurs.idUtilisateur = DeplacementsOfferts.idUtilisateurConducteur  where dateDeplacement > ? and idUtilisateurPassager = ?"
  // Creation d'un objet Promise pour permettre une action asynchrone ce qui permet de faire fonctionner le fichier dal.test.js
  const prom1 = new Promise((resolve, reject) => {
    // Execution de la requete SQL
    db.all(requete, [dateActuelle, id], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
  // Retourne le resultat de la Promise
  return Promise.all([prom1])
    .then(([rows]) => {
      if (rows) {
        console.log(rows)
        return { rows }
      } else {
        console.log('Aucune Reservation')
        return null
      }
    })
    // Retourne une erreur s'il y a une erreur
    .catch((error) => {
      console.error(error.message)
      throw error
    })
}

function obtenirDeplacementDemandeUtilisateur (idUtilisateur, idDeplacement) {
  const requete = 'select * from DeplacementsDemandes where idDemandeur = ? and idDeplacementDemandes = ?'
  // Creation d'un objet Promise pour permettre une action asynchrone ce qui permet de faire fonctionner le fichier dal.test.js
  const prom1 = new Promise((resolve, reject) => {
    // Execution de la requete SQL
    db.get(requete, [idUtilisateur, idDeplacement], (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
  // Retourne le resultat de la Promise
  return Promise.all([prom1])
    .then(([row]) => {
      if (row) {
        console.log(row)
        return { row }
      } else {
        console.log(`Aucune Utilisateur avec l'id ${idUtilisateur}`)
        return null
      }
    })
  // Retourne une erreur s'il y a une erreur
    .catch((error) => {
      console.error(error.message)
      throw error
    })
}

function obtenirDeplacementOffertsUtilisateur (idUtilisateur, idDeplacement) {
  const requete = 'select * from DeplacementsOfferts where idUtilisateurConducteur = ? and idDeplacement = ?'
  // Creation d'un objet Promise pour permettre une action asynchrone ce qui permet de faire fonctionner le fichier dal.test.js
  const prom1 = new Promise((resolve, reject) => {
    // Execution de la requete SQL
    console.log(idUtilisateur, idDeplacement)
    db.get(requete, [idUtilisateur, idDeplacement], (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
  // Retourne le resultat de la Promise
  return Promise.all([prom1])
    .then(([row]) => {
      if (row) {
        console.log(row)
        return { row }
      } else {
        console.log(`Aucune Utilisateur avec l'id ${idUtilisateur}`)
        return null
      }
    })
  // Retourne une erreur s'il y a une erreur
    .catch((error) => {
      console.error(error.message)
      throw error
    })
}

// Variable contenant les informations utiliser lors des tests
const Demandeid = 3
const utilisateurid = 1
const infoUtilisateur = '{"prenom": "Pierre", "nom": "Pelado", "adresse": "123", "adresseCourriel": "test@gmail.com", "numeroTelephone": "1234567890", "motDePasse": "12345"}'
const Utilisateur = JSON.parse(infoUtilisateur)
// Parti de test
// Test manuel pour tester les fonctions avant d'avoir cree le fichier dal.test.js

// obtenirDemande(Demandeid)

// DemandesAVenir()

// obtenirUtilisateurEtDemandes(utilisateurid)

// ajouterUtilisateur(Utilisateur)

// modifierUtilisateur(utilisateurid, 'numero telephone', '2345678901')

// modifierDeplacementOffert(28, 22, 'destination', 'Saint-Donat')

// supprimerUtilisateur('id u t i l i s a t e ur', 10)

// supprimerDeplacementOfferts('id utilisateur conducteur', 5, [5, 15])

// supprimerDeplacementDemande('destination demandee', 'Saint-Donat')

// supprimerReservation('id reservation', 3)

// db.close()

// Besoin d'exporter les modules pour faire fonctionner le test
module.exports = {
  VerifierUtilisateur, // fonction qui verifie l'email et le mot de passe de l'utilisateur pour la page login.html || login.html
  obtenirDemande, // Retourne une demande specifique  || pagePrincipale
  DemandesAVenir, // Toutes les demandes a venir de n'importe qui || pagePrincipale
  obtenirUtilisateurEtDemandes, // Retourne les demandes d'un utilisateur specifique || pagePrincipal
  ajouterUtilisateur, // Register
  ajouterDeplacementsDemandes, // nouvelle page || pageAjouterDeplacementDemandes
  ajouterDeplacementsOfferts, // nouvelle page || pageAjouterDeplacementOfferts
  ajouterReservations, // Bouton dans tableau pour reserver + confirmation || pagePrincipal
  modifierUtilisateur, // Dans profil || pageProfil
  modifierDeplacementDemande, // nouvelle page propre a l'utilisateurs qui demande || pageModifierDeplacementDemande
  modifierDeplacementOffert, // nouvelle page propre a l'utilisateurs qui offre || pageModifierDeplacementOffert
  modifierReservation, // Rien a modifier /inutile? || NULL
  supprimerUtilisateur, // Dans profil || pageProfil
  supprimerDeplacementOfferts, // bouton dans la page que deplacement offerts || pageModifierdeplacementOffert
  supprimerDeplacementDemande, // bouton dans la page que deplacement demande || pageModifierdeplacementDemande
  supprimerReservation, // bouton dans une page qui montre les reservations de l'utilisateur || pageSupprimerReservation
  obtenirDeplacementsOfferts,
  obtenirDeplacementsDemandes,
  obtenirReservations,
  obtenirUtilisateurParID,
  DemandesAvenirFiltre,
  obtenirDeplacementDemandeUtilisateur,
  obtenirDeplacementOffertsUtilisateur,
  obtenirDeplacementOffertUtilisateur
}
