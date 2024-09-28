const emailLoginInput = document.getElementById('emailLogin')
const passwordLoginInput = document.getElementById('passwordLogin')

const erreurEmailLogin = document.getElementById('erreurEmailLogin')
const erreurPasswordLogin = document.getElementById('erreurPasswordLogin')

const buttonLogin = document.getElementById('Login')

buttonLogin.addEventListener('click', validerChampsLogin)

function validerChampsLogin () {
  erreurEmailLogin.style.visibility = 'hidden'
  erreurPasswordLogin.style.visibility = 'hidden'
  // Modification apporte pour montrer les messages d'erreurs individuellement sans qu'ils dependent des autres champs
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLoginInput.value)) || passwordLoginInput.value === '') {
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLoginInput.value))) {
      erreurEmailLogin.style.visibility = 'visible'
    }
    if (passwordLoginInput.value === '') {
      erreurPasswordLogin.style.visibility = 'visible'
    }
  } else {
    compareToServer()
  }
}

async function compareToServer () {
  const email = emailLoginInput.value
  const password = passwordLoginInput.value

  try {
    const response = await fetch('/login-validation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (response.ok) {
      const data = await response.json()
      const idU = data.user.row[0].idUtilisateur
      console.log(idU)
      console.log('[+] Utilisateur validé')

      window.location.href = `/pagePrincipal?id=${idU}`
    }
  } catch (error) {
    console.log(error)
  }
}
