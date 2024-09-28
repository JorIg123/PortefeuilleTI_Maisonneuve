document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search)
  const idParam = urlParams.get('id')

  const liens = document.querySelectorAll('a')

  liens.forEach(lien => {
    const href = lien.getAttribute('href')
    lien.setAttribute('href', `${href}?id=${idParam}`)
  })
})

const dateInput = document.getElementById('DeplacementDemandeDate')
const timeInput = document.getElementById('DeplacementDemandeHeure')
const destinationSelect = document.getElementById('DestinationDemandePossible')
const texteInput = document.getElementById('Precision')

const erreurDate = document.getElementById('erreurDeplacementDemandeDate')
const erreurTime = document.getElementById('erreurDeplacementDemandeHeure')

const annulerBtn = document.getElementById('Annuler')
annulerBtn.addEventListener('click', () => {
  dateInput.value = ''
  timeInput.value = ''
  texteInput.value = ''
})

const ajouterBtn = document.getElementById('Confirmer')
ajouterBtn.addEventListener('click', validerChamps)

function validerChamps () {
  erreurDate.style.visibility = 'hidden'
  erreurTime.style.visibility = 'hidden'

  const dateActuelle = new Date()
  if ((dateInput.value === '') || timeInput.value === '') {
    if ((dateInput.value === '' || dateInput.value < dateActuelle.toISOString().split('T')[0])) {
      erreurDate.style.visibility = 'visible'
    }
    if (timeInput.value === '') {
      erreurTime.style.visibility = 'visible'
    }
  } else {
    sendToServer()
  }
}

async function sendToServer () {
  const dateDeplacementDemande = dateInput.value.replace(/\//g, '-')
  const heureDeplacementDemande = timeInput.value
  const destinationDemandee = destinationSelect.value
  const precisionDeplacementDemande = texteInput.value

  const urlParams = new URLSearchParams(window.location.search)
  const idDemandeur = urlParams.get('id')

  try {
    const response = await fetch('/addDeplacementDemande', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idDemandeur, dateDeplacementDemande, heureDeplacementDemande, destinationDemandee, precisionDeplacementDemande })
    })

    if (response.ok) {
      const data = await response.json()
      console.log('[+] Deplacement Demande avec succes', data)
    }
  } catch (error) {
    console.log(error)
  }
}
