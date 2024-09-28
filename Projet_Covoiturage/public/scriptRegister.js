const nomInput = document.getElementById('nomRegister')
const prenomInput = document.getElementById('prenomRegister')
const adresseInput = document.getElementById('adresseRegister')
const numeroInput = document.getElementById('numeroTelephoneRegister')
const emailInput = document.getElementById('emailRegister')
const passwordInput = document.getElementById('passwordRegister')
const confirmInput = document.getElementById('confirmPasswordRegister')

const nomError = document.getElementById('erreurNomRegister')
const prenomError = document.getElementById('erreurPrenomRegister')
const adresseError = document.getElementById('erreurAdresseRegister')
const telephoneError = document.getElementById('erreurTelephoneRegister')
const emailError = document.getElementById('erreurEmailRegister')
const passwordError = document.getElementById('erreurPasswordRegister')
const confirmError = document.getElementById('erreurConfirmPasswordRegister')

const buttonRegister = document.getElementById('Register')
buttonRegister.addEventListener('click', validerChampsRegister)

function validerChampsRegister () {
  nomError.style.visibility = 'hidden'
  prenomError.style.visibility = 'hidden'
  adresseError.style.visibility = 'hidden'
  telephoneError.style.visibility = 'hidden'
  emailError.style.visibility = 'hidden'
  passwordError.style.visibility = 'hidden'
  confirmError.style.visibility = 'hidden'

  // Modification apporte pour montrer les messages d'erreurs individuellement sans qu'ils dependent des autres champs
  if (nomInput.value === '' || prenomInput.value === '' || adresseInput.value === '' || numeroInput.value === '' || emailInput.value === '' || passwordInput.value === '' || confirmInput.value === '') {
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
    if (passwordInput.value === '') {
      passwordError.style.visibility = 'visible'
    }
    if (confirmInput.value !== passwordInput.value || confirmInput.value === '') {
      confirmError.style.visibility = 'visible'
    }
  } else {
    sendToServer()
  }
}

async function sendToServer () {
  const nom = nomInput.value
  const prenom = prenomInput.value
  const adresse = adresseInput.value
  const numeroTelephone = numeroInput.value
  const adresseCourriel = emailInput.value
  const motDePasse = passwordInput.value

  try {
    const response = await fetch('/register-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prenom, nom, adresse, adresseCourriel, numeroTelephone, motDePasse })
    })

    if (response.ok) {
      const data = await response.json()
      const id = data.idUtilisateur.id
      console.log('[+] Utilisateur enregistre avec succes')

      window.location.href = `/pagePrincipal?id=${id}`
    }
  } catch (error) {
    console.log(error)
  }
}
