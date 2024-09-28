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

const tableauDeplacement = document.getElementById('tableauDeplacementDemandes')

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
}

async function loadDeplacements () {
  try {
    const filtre = searchInput.value
    const url = `/toutDeplacementsDemandes?filtre=${filtre}`
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

loadDeplacements()
