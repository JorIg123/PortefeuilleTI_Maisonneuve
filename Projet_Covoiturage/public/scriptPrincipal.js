document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search)
  const idParam = urlParams.get('id')

  const liens = document.querySelectorAll('a')

  liens.forEach(lien => {
    const href = lien.getAttribute('href')
    lien.setAttribute('href', `${href}?id=${idParam}`)
  })
})

const searchInput = document.getElementById('searchBar')
searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    loadDeplacements()
  }
})
const tableauDeplacement = document.getElementById('tableauDep')

function ajouterLigne (id, conducteur, destination, date, heure, place, cout, comptant, interact, precision) {
  const tbody = tableauDeplacement.querySelector('tbody')

  if (!tbody) {
    console.error('Le tbody n\'existe pas dans le tableauDeplacement.')
    return
  }

  const nouvelleLigne = tbody.insertRow()

  const idCell = nouvelleLigne.insertCell(0)
  idCell.textContent = id

  const conducteurCell = nouvelleLigne.insertCell(1)
  conducteurCell.textContent = conducteur

  const destinationCell = nouvelleLigne.insertCell(2)
  destinationCell.textContent = destination

  const dateCell = nouvelleLigne.insertCell(3)
  dateCell.textContent = date

  const heureCell = nouvelleLigne.insertCell(4)
  heureCell.textContent = heure

  const placeCell = nouvelleLigne.insertCell(5)
  placeCell.textContent = place

  const coutCell = nouvelleLigne.insertCell(6)
  coutCell.textContent = cout

  const comptantCell = nouvelleLigne.insertCell(7)
  comptantCell.textContent = comptant

  const interactCell = nouvelleLigne.insertCell(8)
  interactCell.textContent = interact

  const precisionCell = nouvelleLigne.insertCell(9)
  precisionCell.textContent = precision

  const reserverCell = nouvelleLigne.insertCell(10)
  const reserverBtn = document.createElement('button')
  reserverBtn.setAttribute('class', 'button is-warning')
  reserverBtn.textContent = 'Reserver'
  reserverBtn.addEventListener('click', () => reserverDeplacement(id))
  reserverCell.appendChild(reserverBtn)
}

async function reserverDeplacement (idDeplacement) {
  const urlParams = new URLSearchParams(window.location.search)
  const idUtilisateurPassager = urlParams.get('id')

  try {
    const response = await fetch('/reserver-deplacement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idUtilisateurPassager, idDeplacement })
    })

    if (response.ok) {
      const data = await response.json()
      loadDeplacements()
      console.log('[+] Deplacement Reservé avec succes', data)
    }
  } catch (error) {
    console.log(error)
  }
}

async function loadDeplacements () {
  try {
    const filtre = searchInput.value
    const mesdep = 'non'
    const url = `/deplacementsOfferts?filtre=${filtre}&mesdep=${mesdep}`

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
        ajouterLigne(deplacement.idDeplacement, deplacement.nomcomplet, deplacement.destination, deplacement.dateDeplacement, deplacement.heure, deplacement.nbrPlaceDisponible, deplacement.cout, deplacement.comptant, deplacement.interact, deplacement.precisionDeplacement)
      })
    } else {
      console.error('Erreur lors de la récupération des deplacements.')
    }
  } catch (error) {
    console.error(error)
  }
}

loadDeplacements()
