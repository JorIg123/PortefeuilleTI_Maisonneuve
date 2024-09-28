document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search)
  const idParam = urlParams.get('id')

  const liens = document.querySelectorAll('a')

  liens.forEach(lien => {
    const href = lien.getAttribute('href')
    lien.setAttribute('href', `${href}?id=${idParam}`)
  })
})

const tableauDeplacement = document.getElementById('TableReservation')

function ajouterLigne (id, idConducteur, destination, date, heure, place, cout, comptant, interact, precision) {
  const tbody = tableauDeplacement.querySelector('tbody')

  if (!tbody) {
    console.error('Le tbody n\'existe pas dans le tableauDeplacement.')
    return
  }

  const nouvelleLigne = tbody.insertRow()

  const idCell = nouvelleLigne.insertCell(0)
  idCell.textContent = id

  const idConducteurCell = nouvelleLigne.insertCell(1)
  idConducteurCell.textContent = idConducteur

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

  // Ajoutez le bouton Supprimer à chaque ligne
  const supprimerCell = nouvelleLigne.insertCell(10)
  const supprimerBtn = document.createElement('button')
  supprimerBtn.setAttribute('class', 'button is-danger')
  supprimerBtn.textContent = 'Supprimer'
  supprimerBtn.addEventListener('click', () => supprimerReservation(id))
  supprimerCell.appendChild(supprimerBtn)
}

async function supprimerReservation (id) {
  try {
    const response = await fetch(`/supprimerReservation/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      loadReservations() // Rechargez la liste après la suppression
    } else {
      console.error('Erreur lors de la suppression de l deplacement.')
    }
  } catch (error) {
    console.error(error)
  }
}

async function loadReservations () {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const idUser = urlParams.get('id')

    const url = `/mes-reservations?id=${idUser}`

    const response = await fetch(url)

    if (response.ok) {
      const rows = await response.json()
      console.log(rows)
      // Créez le tbody s'il n'existe pas
      let tbody = tableauDeplacement.querySelector('tbody')
      if (!tbody) {
        tbody = document.createElement('tbody')
        tableauDeplacement.appendChild(tbody)
      }

      // Effacez les lignes du tbody
      tbody.innerHTML = ''
      rows.reservations.rows.forEach(reservation => {
        ajouterLigne(reservation.idReservation, reservation.nomcomplet, reservation.destination, reservation.dateDeplacement, reservation.heure, reservation.nbrPlaceDisponible, reservation.cout, reservation.comptant, reservation.interact, reservation.precisionDeplacement)
      })
    } else {
      console.error('Erreur lors de la récupération des deplacements.')
    }
  } catch (error) {
    console.error(error)
  }
}

loadReservations()
