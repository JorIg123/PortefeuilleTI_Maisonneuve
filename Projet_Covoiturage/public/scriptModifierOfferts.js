document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search)
  const idParam = urlParams.get('id')

  const liens = document.querySelectorAll('a')

  liens.forEach(lien => {
    const href = lien.getAttribute('href')
    lien.setAttribute('href', `${href}?id=${idParam}`)
  })
})

const tableauDeplacement = document.getElementById('tableauDep')

const idInput = document.getElementById('IDDemande')
idInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    cellFill()
  }
})
const dateInput = document.getElementById('DeplacementOffertDate')
const timeInput = document.getElementById('DeplacementOffertHeure')
const placesInput = document.getElementById('nbrPlace')
const coutInput = document.getElementById('cout')
const comptantInput = document.getElementById('Comptant')
const interacrInput = document.getElementById('Interact')
const texteInput = document.getElementById('Precision')
const destinationSelect = document.getElementById('DestinationDemandePossible')

const erreurID = document.getElementById('erreurDeplacementOffertID')
const erreurDate = document.getElementById('erreurDeplacementOffertDate')
const erreurTime = document.getElementById('erreurDeplacementOffertHeure')
const erreurComptant = document.getElementById('erreurDeplacementComptant')
const erreurInteract = document.getElementById('erreurDeplacementInteract')
const erreurCout = document.getElementById('erreurDeplacementOffertCout')
const erreurPlace = document.getElementById('erreurDeplacementOffertNombreDePlaces')

const modifierBtn = document.getElementById('Modifier')
modifierBtn.addEventListener('click', validerChamps)

function validerChamps () {
  erreurID.style.visibility = 'hidden'
  erreurDate.style.visibility = 'hidden'
  erreurTime.style.visibility = 'hidden'
  erreurComptant.style.visibility = 'hidden'
  erreurInteract.style.visibility = 'hidden'
  erreurCout.style.visibility = 'hidden'
  erreurPlace.style.visibility = 'hidden'

  const dateActuelle = new Date()
  const tempsActuelle = dateActuelle.toLocaleTimeString(['it-IT'], { hour: '2-digit', minute: '2-digit' })
  const temps1 = tempsActuelle.split(':')
  const temps2 = timeInput.value.split(':')
  const totalSeconds1 = parseInt(temps1[0] * 3600 + temps1[1] * 60)
  const totalSeconds2 = parseInt(temps2[0] * 3600 + temps2[1] * 60)

  if ((dateInput.value === '' || dateInput.value < dateActuelle.toLocaleDateString(['sv-SE'])) || timeInput.value === '' || (dateInput.value === dateActuelle.toLocaleDateString(['sv-SE']) && totalSeconds1 >= totalSeconds2) || comptantInput.value === '' || interacrInput.value === '' || coutInput.value === '' || (isNaN(coutInput.value)) || (isNaN(placesInput.value) || placesInput.value > 10 || placesInput.value === '')) {
    if ((dateInput.value === '' || dateInput.value < dateActuelle.toLocaleDateString(['sv-SE']))) {
      erreurDate.style.visibility = 'visible'
    }
    if (timeInput.value === '' || (dateInput.value === dateActuelle.toLocaleDateString(['sv-SE']) && totalSeconds1 >= totalSeconds2)) {
      erreurTime.style.visibility = 'visible'
    }
    if (comptantInput.value !== 'NON' && comptantInput.value !== 'OUI') {
      erreurComptant.style.visibility = 'visible'
    }
    if (interacrInput.value !== 'NON' && interacrInput.value !== 'OUI') {
      erreurInteract.style.visibility = 'visible'
    }
    if (isNaN(coutInput.value) || coutInput.value === '') {
      erreurCout.style.visibility = 'visible'
    }
    if (isNaN(placesInput.value) || placesInput.value > 10 || placesInput.value === '') {
      erreurPlace.style.visibility = 'visible'
    }
  } else {
    sendToServer()
  }
}

async function sendToServer () {
  const idDeplacement = idInput.value
  const dateTime = new Date(dateInput.value.replace(/\//g, '-'))
  const dateDeplacement = dateTime.toISOString().split('T')[0]
  const heure = timeInput.value
  const destination = destinationSelect.value
  const precisionDeplacement = texteInput.value
  const nbrPlaceDisponible = placesInput.value
  const cout = coutInput.value
  const comptant = comptantInput.value
  const interact = interacrInput.value

  const urlParams = new URLSearchParams(window.location.search)
  const idUtilisateurConducteur = urlParams.get('id')

  try {
    const response = await fetch(`/updateDeplacementOfferts/${idUtilisateurConducteur}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idDeplacement, dateDeplacement, heure, destination, precisionDeplacement, nbrPlaceDisponible, cout, comptant, interact })
    })

    if (response.ok) {
      const data = await response.json()
      console.log('[+] Deplacement Offert avec succes', data)

      window.location.reload()
    }
  } catch (error) {
    console.log(error)
  }
}

function ajouterLigne (id, destination, date, heure, place, cout, comptant, interact, precision) {
  const tbody = tableauDeplacement.querySelector('tbody')

  if (!tbody) {
    console.error('Le tbody n\'existe pas dans le tableauDeplacement.')
    return
  }

  const nouvelleLigne = tbody.insertRow()

  const idCell = nouvelleLigne.insertCell(0)
  idCell.textContent = id

  const destinationCell = nouvelleLigne.insertCell(1)
  destinationCell.textContent = destination

  const dateCell = nouvelleLigne.insertCell(2)
  dateCell.textContent = date

  const heureCell = nouvelleLigne.insertCell(3)
  heureCell.textContent = heure

  const placeCell = nouvelleLigne.insertCell(4)
  placeCell.textContent = place

  const coutCell = nouvelleLigne.insertCell(5)
  coutCell.textContent = cout

  const comptantCell = nouvelleLigne.insertCell(6)
  comptantCell.textContent = comptant

  const interactCell = nouvelleLigne.insertCell(7)
  interactCell.textContent = interact

  const precisionCell = nouvelleLigne.insertCell(8)
  precisionCell.textContent = precision

  // Ajoutez le bouton Supprimer à chaque ligne
  const supprimerCell = nouvelleLigne.insertCell(9)
  const supprimerBtn = document.createElement('button')
  supprimerBtn.setAttribute('class', 'button is-danger')
  supprimerBtn.textContent = 'Supprimer'
  supprimerBtn.addEventListener('click', () => supprimerDeplacement(id))
  supprimerCell.appendChild(supprimerBtn)
}

async function cellFill () {
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get('id')
  const idDeplacement = idInput.value
  if (idInput.value === '') {
    idInput.value = ''
    dateInput.value = ''
    timeInput.value = ''
    destinationSelect.value = 'Saint-Agathe'
    texteInput.value = ''
    placesInput.value = ''
    coutInput.value = ''
    comptantInput.value = ''
    interacrInput.value = ''
  } else {
    try {
      const response = await fetch(`/deplacementOffertsFill/?id=${userId}&idDeplacement=${idDeplacement}`)
      if (response.ok) {
        const responseData = await response.text()
        try {
          const deplacementData = JSON.parse(responseData)
          idInput.value = deplacementData.row.idDeplacement
          dateInput.value = deplacementData.row.dateDeplacement
          timeInput.value = deplacementData.row.heure
          destinationSelect.value = deplacementData.row.destination
          texteInput.value = deplacementData.row.precisionDeplacement
          placesInput.value = deplacementData.row.nbrPlaceDisponible
          coutInput.value = deplacementData.row.cout
          comptantInput.value = deplacementData.row.comptant
          interacrInput.value = deplacementData.row.interact
        } catch (parseError) {
          console.error('Error al analizar la respuesta como JSON:', parseError)
        }
      } else {
        console.error('Error en la respuesta del servidor:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error en la solicitud fetch:', error)
    }
  }
}

async function supprimerDeplacement (id) {
  try {
    const response = await fetch(`/supprimerDeplacement/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      loadDeplacements() // Rechargez la liste après la suppression
    } else {
      console.error('Erreur lors de la suppression du deplacement.')
    }
  } catch (error) {
    console.error(error)
  }
}

async function loadDeplacements () {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const idUser = urlParams.get('id')

    const url = `/modifierDeplacementsOfferts?id=${idUser}`

    const response = await fetch(url)

    if (response.ok) {
      const rows = await response.json()

      // Créez le tbody s'il n'existe pas
      let tbody = tableauDeplacement.querySelector('tbody')
      if (!tbody) {
        tbody = document.createElement('tbody')
        tableauDeplacement.appendChild(tbody)
      }

      // Effacez les lignes du tbody
      tbody.innerHTML = ''
      rows.deplacements.rows.forEach(deplacement => {
        ajouterLigne(deplacement.idDeplacement, deplacement.destination, deplacement.dateDeplacement, deplacement.heure, deplacement.nbrPlaceDisponible, deplacement.cout, deplacement.comptant, deplacement.interact, deplacement.precisionDeplacement)
      })
    } else {
      console.error('Erreur lors de la récupération des deplacements.')
    }
  } catch (error) {
    console.error(error)
  }
}

loadDeplacements()
