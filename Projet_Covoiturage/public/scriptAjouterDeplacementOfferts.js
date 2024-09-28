document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search)
  const idParam = urlParams.get('id')

  const liens = document.querySelectorAll('a')

  liens.forEach(lien => {
    const href = lien.getAttribute('href')
    lien.setAttribute('href', `${href}?id=${idParam}`)
  })
})

const dateInput = document.getElementById('DeplacementOffertDate')
const timeInput = document.getElementById('DeplacementOffertHeure')
const placesInput = document.getElementById('NombreDePlaces')
const coutInput = document.getElementById('Cout')
const comptantInput = document.getElementById('Comptant')
const interacrInput = document.getElementById('Interact')
const texteInput = document.getElementById('PrecisionDepOfferts')
const destinationSelect = document.getElementById('DestinationOffertPossible')

const erreurDate = document.getElementById('erreurDeplacementOffertDate')
const erreurTime = document.getElementById('erreurDeplacementOffertHeure')
const erreurComptant = document.getElementById('erreurDeplacementComptant')
const erreurInteract = document.getElementById('erreurDeplacementInteract')
const erreurCout = document.getElementById('erreurDeplacementOffertCout')
const erreurPlace = document.getElementById('erreurDeplacementOffertNombreDePlaces')

const ajouterBtn = document.getElementById('Ajouter')
const annulerBtn = document.getElementById('Annuler')
ajouterBtn.addEventListener('click', validerChamps)
annulerBtn.addEventListener('click', () => {
  dateInput.value = ''
  timeInput.value = ''
  texteInput.value = ''
  placesInput.value = ''
  coutInput.value = ''
  comptantInput.value = ''
  interacrInput.value = ''
  texteInput.value = ''
})

function validerChamps () {
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
  const dateDeplacement = dateInput.value.replace(/\//g, '-')
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
    const response = await fetch('/addDeplacementOffert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idUtilisateurConducteur, destination, dateDeplacement, heure, nbrPlaceDisponible, cout, comptant, interact, precisionDeplacement })
    })

    if (response.ok) {
      const data = await response.json()
      console.log('[+] Deplacement Offert avec succes', data)

      window.location.href = `/pagePrincipal?id=${idUtilisateurConducteur}`
    }
  } catch (error) {
    console.log(error)
  }
}
