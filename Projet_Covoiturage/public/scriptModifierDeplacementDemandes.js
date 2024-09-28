document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search)
  const idParam = urlParams.get('id')

  const liens = document.querySelectorAll('a')

  liens.forEach(lien => {
    const href = lien.getAttribute('href')
    lien.setAttribute('href', `${href}?id=${idParam}`)
  })
})

const idInput = document.getElementById('IDDemande')
idInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault()
  }
})
idInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    cellFill()
  }
})
const dateInput = document.getElementById('DeplacementDemandeDate')
dateInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault()
  }
})
const timeInput = document.getElementById('DeplacementDemandeHeure')
timeInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault()
  }
})
const destinationSelect = document.getElementById('DestinationDemandePossible')
const texteInput = document.getElementById('Precision')

const erreurDate = document.getElementById('erreurDeplacementDemandeDate')
const erreurTime = document.getElementById('erreurDeplacementDemandeHeure')
const erreurID = document.getElementById('erreurDeplacementDemandeID')

const modifierBtn = document.getElementById('Modifier')
modifierBtn.addEventListener('click', validerChamps)

function validerChamps () {
  erreurDate.style.visibility = 'hidden'
  erreurTime.style.visibility = 'hidden'
  erreurID.style.visibility = 'hidden'
  const dateActuelle = new Date()

  if ((dateInput.value === '' || timeInput.value === '' || idInput.value === '')) {
    if ((dateInput.value === '' || dateInput.value < dateActuelle.toLocaleDateString(['sv-SE']))) {
      erreurDate.style.visibility = 'visible'
    }
    if (timeInput.value === '' || idInput.value === '') {
      erreurTime.style.visibility = 'visible'
    }
    if (idInput.value === '') {
      erreurID.style.visibility = 'visible'
    }
  } else {
    sendToServer()
  }
}

async function sendToServer () {
  const idDeplacementDemandes = idInput.value
  const dateTime = new Date(dateInput.value.replace(/\//g, '-'))
  const dateDeplacementDemande = dateTime.toISOString().split('T')[0]
  const heureDeplacementDemande = timeInput.value
  const destinationDemandee = destinationSelect.value
  const precisionDeplacementDemande = texteInput.value
  const urlParams = new URLSearchParams(window.location.search)
  const idDemandeur = urlParams.get('id')

  try {
    const response = await fetch(`/updateDeplacementDemande/${idDemandeur}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idDeplacementDemandes, dateDeplacementDemande, heureDeplacementDemande, destinationDemandee, precisionDeplacementDemande })
    })

    if (response.ok) {
      const data = await response.json()
      console.log('[+] Deplacement update avec succes', data)

      window.location.reload()
    }
  } catch (error) {
    console.log(error)
  }
}

const tableauDeplacement = document.getElementById('tableMod')

function ajouterLigne (id, destination, date, heure, precision) {
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

  const precisionCell = nouvelleLigne.insertCell(4)
  precisionCell.textContent = precision

  // Ajoutez le bouton Supprimer à chaque ligne
  const supprimerCell = nouvelleLigne.insertCell(5)
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
  } else {
    try {
      const response = await fetch(`/deplacementDemandesFill/?id=${userId}&idDeplacement=${idDeplacement}`)
      if (response.ok) {
        const responseData = await response.text()
        try {
          const deplacementData = JSON.parse(responseData)
          idInput.value = deplacementData.row.idDeplacementDemandes
          dateInput.value = deplacementData.row.dateDeplacementDemande
          timeInput.value = deplacementData.row.heureDeplacementDemande
          destinationSelect.value = deplacementData.row.destinationDemandee
          texteInput.value = deplacementData.row.precisionDeplacementDemande
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
    const response = await fetch(`/supprimerDeplacementDemande/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      loadDeplacementsDemandes() // Rechargez la liste après la suppression
    } else {
      console.error('Erreur lors de la suppression de l deplacement.')
    }
  } catch (error) {
    console.error(error)
  }
}

async function loadDeplacementsDemandes () {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const idUser = urlParams.get('id')

    const url = `/deplacementsDemandes?id=${idUser}`

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
        ajouterLigne(deplacement.idDeplacementDemandes, deplacement.destinationDemandee, deplacement.dateDeplacementDemande, deplacement.heureDeplacementDemande, deplacement.precisionDeplacementDemande)
      })
    } else {
      console.error('Erreur lors de la récupération des deplacements.')
    }
  } catch (error) {
    console.error(error)
  }
}

loadDeplacementsDemandes()
