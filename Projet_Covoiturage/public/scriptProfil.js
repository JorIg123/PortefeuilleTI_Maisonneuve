document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search)
  const idParam = urlParams.get('id')

  const liens = document.querySelectorAll('a')

  liens.forEach(lien => {
    const href = lien.getAttribute('href')
    lien.setAttribute('href', `${href}?id=${idParam}`)
  })
})

const nomInput = document.getElementById('nomModifier')
const prenomInput = document.getElementById('prenomModifier')
const adresseInput = document.getElementById('adresseModifier')
const numeroInput = document.getElementById('numeroTelephoneModifier')
const emailInput = document.getElementById('emailModifier')
const oldPasswordInput = document.getElementById('oldPasswordModifier')
const newPasswordInput = document.getElementById('newPasswordModifier')
const confirmInput = document.getElementById('confirmPasswordModifier')

const nomError = document.getElementById('erreurNomModifier')
const prenomError = document.getElementById('erreurPrenomModifier')
const adresseError = document.getElementById('erreurAdresseModifier')
const telephoneError = document.getElementById('erreurTelephoneModifier')
const emailError = document.getElementById('erreurEmailModifier')
const oldPasswordError = document.getElementById('erreurOldPasswordModifier')
const newPasswordError = document.getElementById('erreurNewPasswordModifier')
const confirmError = document.getElementById('erreurConfirmPasswordModifier')

const modifierBtn = document.getElementById('modifier')
modifierBtn.addEventListener('click', validerChamps)
const supprimerBtn = document.getElementById('supprimer')
supprimerBtn.addEventListener('click', seDesinscrire)

function validerChamps () {
  nomError.style.visibility = 'hidden'
  prenomError.style.visibility = 'hidden'
  adresseError.style.visibility = 'hidden'
  telephoneError.style.visibility = 'hidden'
  emailError.style.visibility = 'hidden'
  oldPasswordError.style.visibility = 'hidden'
  newPasswordError.style.visibility = 'hidden'
  confirmError.style.visibility = 'hidden'

  if ((nomInput.value === '' || prenomInput.value === '' || adresseInput.value === '' || numeroInput.value === '' || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value))) && (oldPasswordInput.value === '' && newPasswordInput.value === '' && confirmInput.value === '')) {
    if (nomInput.value === '') {
      nomError.style.visibility = 'visible'
    }
    if (prenomInput.value === '') {
      prenomError.style.visibility = 'visible'
    }
    if (adresseInput.value === '') {
      adresseError.style.visibility = 'visible'
    }
    if (numeroInput.value === '') {
      telephoneError.style.visibility = 'visible'
    }
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value))) {
      emailError.style.visibility = 'visible'
    }
  } else if ((nomInput.value !== '' && prenomInput.value !== '' && adresseInput.value !== '' && numeroInput.value !== '' && (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value))) && (oldPasswordInput.value === '' && newPasswordInput.value === '' && confirmInput.value === '')) {
    saveWithoutPassword()
  } else if (((oldPasswordInput.value !== '' || newPasswordInput.value !== '' || confirmInput.value !== '') && (newPasswordInput.value !== confirmInput.value)) || (oldPasswordInput.value !== '' && (newPasswordInput.value === '' || confirmInput.value === '')) || (oldPasswordInput.value === '' && (newPasswordInput.value !== '' || confirmInput.value !== ''))) {
    if (oldPasswordInput.value === '' && (newPasswordInput.value !== '' || confirmInput.value !== '')) {
      oldPasswordError.style.visibility = 'visible'
    }
    if ((oldPasswordInput.value !== '' && newPasswordInput.value === '') || (confirmInput.value !== '' && newPasswordInput.value === '')) {
      newPasswordError.style.visibility = 'visible'
    }
    if ((oldPasswordInput.value !== '' && confirmInput.value === '') || newPasswordInput.value !== confirmInput.value) {
      confirmError.style.visibility = 'visible'
    }
    if (nomInput.value === '') {
      nomError.style.visibility = 'visible'
    }
    if (prenomInput.value === '') {
      prenomError.style.visibility = 'visible'
    }
    if (adresseInput.value === '') {
      adresseError.style.visibility = 'visible'
    }
    if (numeroInput.value === '') {
      telephoneError.style.visibility = 'visible'
    }
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value))) {
      emailError.style.visibility = 'visible'
    }
  } else {
    saveWithPassword()
  }
}

async function saveWithoutPassword () {
  const nom = nomInput.value
  const prenom = prenomInput.value
  const adresse = adresseInput.value
  const numeroTelephone = numeroInput.value
  const adresseCourriel = emailInput.value
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get('id')
  console.log(nom, prenom, adresse, numeroTelephone, adresseCourriel)
  console.log('Datos #1 de la respuesta :', userId) //  À effacer. Just pour control

  try {
    const response = await fetch(`/utilisateurProfil/${userId}`)

    if (response.ok) {
      const responseData = await response.text()
      console.log('Datos #2 de la respuesta:', responseData)

      // Intenta analizar la respuesta como JSON
      try {
        const userData = JSON.parse(responseData)
        console.log('Datos del usuario:', userData.row.nom) //  À effacer. Just pour control

        const motDePasse = userData.row.motDePasse
        // Llenar el formulario con los datos del usuario
        try {
          const response = await fetch(`/updateProfil/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom, prenom, adresse, numeroTelephone, adresseCourriel, motDePasse })
          })

          if (response.ok) {
            const data = await response.json()
            console.log('[+] Profil update avec succes', data)

            window.location.reload()
          }
        } catch (error) {
          console.log(error)
        }
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

async function saveWithPassword () {
  oldPasswordError.style.visibility = 'hidden'
  const nom = nomInput.value
  const prenom = prenomInput.value
  const adresse = adresseInput.value
  const numeroTelephone = numeroInput.value
  const adresseCourriel = emailInput.value
  const oldMotDePasse = oldPasswordInput.value
  const motDePasse = newPasswordInput.value
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get('id')
  console.log(nom, prenom, adresse, numeroTelephone, adresseCourriel)
  console.log('Datos #1 de la respuesta :', userId) //  À effacer. Just pour control

  try {
    const response = await fetch(`/utilisateurProfil/${userId}`)

    if (response.ok) {
      const responseData = await response.text()
      console.log('Datos #2 de la respuesta:', responseData)

      // Intenta analizar la respuesta como JSON
      try {
        const userData = JSON.parse(responseData)
        console.log('Datos del usuario:', userData.row.nom) //  À effacer. Just pour control

        const motDePasseVerif = userData.row.motDePasse
        // Llenar el formulario con los datos del usuario
        if (oldMotDePasse === motDePasseVerif) {
          try {
            const response = await fetch(`/updateProfil/${userId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ nom, prenom, adresse, numeroTelephone, adresseCourriel, motDePasse })
            })

            if (response.ok) {
              const data = await response.json()
              console.log('[+] Profil update avec succes', data)

              window.location.reload()
            }
          } catch (error) {
            console.log(error)
          }
        } else {
          console.error('Le mot de passe est mauvais')
          oldPasswordError.style.visibility = 'visible'
        }
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

async function seDesinscrire () {
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get('id')

  console.log('Datos #1 de la respuesta :', userId) //  À effacer. Just pour control

  try {
    const response = await fetch(`/desinscrireUtilisateur/${userId}`, {
      method: 'DELETE'
    })

    if (response.ok) { window.location.href = '/login' } else {
      console.error('Erreur lors de la suppression de l\'utilisateur.')
    }
  } catch (error) {
    console.error('Error en la solicitud fetch:', error)
  }
}

function autoFill () {
  document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('id')

    console.log('Datos #1 de la respuesta :', userId) //  À effacer. Just pour control

    try {
      const response = await fetch(`/utilisateurProfil/${userId}`)

      if (response.ok) {
        const responseData = await response.text()
        console.log('Datos #2 de la respuesta:', responseData)

        // Intenta analizar la respuesta como JSON
        try {
          const userData = JSON.parse(responseData)
          console.log('Datos del usuario:', userData.row.nom) //  À effacer. Just pour control

          // Llenar el formulario con los datos del usuario

          nomInput.value = userData.row.nom
          prenomInput.value = userData.row.prenom
          adresseInput.value = userData.row.adresse
          emailInput.value = userData.row.adresseCourriel
          numeroInput.value = userData.row.numeroTelephone
        } catch (parseError) {
          console.error('Error al analizar la respuesta como JSON:', parseError)
        }
      } else {
        console.error('Error en la respuesta del servidor:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error en la solicitud fetch:', error)
    }
  })
}

autoFill()
