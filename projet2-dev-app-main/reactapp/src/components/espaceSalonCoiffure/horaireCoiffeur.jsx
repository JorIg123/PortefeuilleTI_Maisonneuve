import React, { useState, useEffect } from 'react';
import { Container, Grid, Header, Table,Form, Button, Message, Input, Label } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import '../espaceClient/Calendar.css'
import axios from 'axios';

const HorraireCoiffeur = () => {
  const [date, setDate] = useState(new Date());
  const [reservationsDate, setReservationsDate] = useState([]);
  const [reservationDetails, setReservationsDetails] = useState([]);
  const [editable, setEditable] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [heure, setHeure] = useState('')
  const [heure2, setHeure2] = useState('')
  const [heure3, setHeure3] = useState('')
  const [heure4, setHeure4] = useState('')

  const [editedReservations, setEditedReservations] = useState([]);

  const [debutShift, setDebutShift] = useState('');
  const [finShift, setFinShift] = useState('');
  const [debutPause, setDebutPause] = useState('');
  const [finPause, setfinPause] = useState('');

  const [coiffeurs, setCoiffeurs] = useState([]);
  const [selectedCoiffeur, setSelectedCoiffeur] = useState('');

  const [dateDispoS, setdateDispoS] = useState([]);
  const [selecteddateDispoS, setselecteddateDispoS] = useState('');

  const { salonID } = useParams();
  console.log(salonID);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/DispoCoiffeur', {
          params: {
            idCoiffeur: selectedCoiffeur
          }
        });
        if (response.data.resultats.length > 0) {
          const dates = response.data.resultats.map(rdv => rdv.DateDispo);
          setReservationsDate(dates);
          setReservationsDetails(response.data.resultats)
          console.log('DispoCoiffeur', reservationDetails);
        }
        console.log(response.data);
      } catch (error) {
        console.error('Error lors de l obtention des salons:', error);
      }
    };

    fetchReservations();
  }, [selectedCoiffeur]);

  const toggleEditMode = () => {
    setEditable(!editable);
    setSuccessMessage('')
  };

  const handleDateChange = newDate => {
    setDate(newDate);
  };
  
  const handleModifier = async (idDispoC, debutShift, finShift, PauseDebut, PauseFin) => {
    const debutShiftActuelle = heure.trim().length === 0 ? debutShift : heure
    const finShiftActuelle = heure2.trim().length === 0 ? finShift : heure2
    const pauseDebutActuelle = heure3.trim().length === 0 ? PauseDebut : heure3
    const pauseFinActuelle = heure4.trim().length === 0 ? PauseFin : heure4

      try {
        const response = await fetch('http://localhost:3000/ModifierDispoCoiffeur', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              // idDispoC, debutShift, finShift, PauseDebut, PauseFin
              idDispoC,
              debutShift:debutShiftActuelle,
              finShift: finShiftActuelle,
              PauseDebut: pauseDebutActuelle,
              PauseFin: pauseFinActuelle
            })
        });

        if (response.ok) {
            console.log('[+] RDV modifier avec succes');
            setSuccessMessage('Votre Rendez Vous a ete Modifier avec succes !!!');
            setTimeout(() => {
                setSuccessMessage('');
                setEditable(false);
            }, 800);
            window.location.reload()
        } else {
            console.error('Erreur dans la mise a jour du RDV');
        }
    } catch (error) {
        console.error('Error:', error);
    }
    };

  const handleAnnuler = async (idDispoS ) => {
      try {
          const url = `http://localhost:3000/DeleteDispoSalon`; 

              const response = await fetch(url, {
                  method: 'delete',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    idDispoS
                  })
              });
              if (response.ok) {
                  console.log('[+] RDV efface avec succes');
                  window.location.reload()
              } else {
                  console.error('Erreur lors de la supression des rdv', response);
              }
      } catch (error) {
          console.error('Error lors de la suppresion des rdv:', error);
      }
    };
  
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = formatDate(date);
      if (reservationsDate.includes(formattedDate)) {
        return <div style={{ backgroundColor: 'green', width: '100%', height: '100%' }}></div>;
      }
    }
    return null;
  };

  const formatDate = date => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleHeureChange = (index, value) => {
    const newEditedReservations = [...editedReservations];
    newEditedReservations[index] = { ...newEditedReservations[index],  heure: value === '' ? undefined : value };
    setEditedReservations(newEditedReservations);
    setHeure(value)
  };

  const handleHeure2Change = (index, value) => {
    const newEditedReservations = [...editedReservations];
    newEditedReservations[index] = { ...newEditedReservations[index],  heure2: value === '' ? undefined : value };
    setEditedReservations(newEditedReservations);
    setHeure2(value)
  };

  const handleHeure3Change = (index, value) => {
    const newEditedReservations = [...editedReservations];
    newEditedReservations[index] = { ...newEditedReservations[index],  heure3: value === '' ? undefined : value };
    setEditedReservations(newEditedReservations);
    setHeure3(value)
  };

  const handleHeure4Change = (index, value) => {
    const newEditedReservations = [...editedReservations];
    newEditedReservations[index] = { ...newEditedReservations[index],  heure4: value === '' ? undefined : value };
    setEditedReservations(newEditedReservations);
    setHeure4(value)
  };

  const filteredReservations = reservationDetails.filter(r => formatDate(date) === r.DateDispo);

  const ajouterDispo = () => {
    const data = {
      // idCoiffeur, idDispoS, debutShift, finShift, PauseDebut, PauseFin
      idCoiffeur : selectedCoiffeur,
      idDispoS: selecteddateDispoS,
      debutShift: debutShift,
      finShift: finShift,
      PauseDebut: debutPause,
      PauseFin: finShift
    };

    axios.post('http://localhost:3000/AjouterDispoCoiffeur', data)
      .then(response => {
        console.log('[+]', response.data);
        window.location.reload()
      })
      .catch(error => {
        console.error('Erreur', error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3000/voirCoiffeurParIDSalon', {
      params: {
        IDSalon: salonID
      }
    })
    .then(response => {
      setCoiffeurs(response.data);
      console.log('Coiffeur:', response.data);
    })
    .catch(error => {
      console.error('Error', error);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/DispoSalon', {
      params: {
        idSalon: salonID
      }
    })
    .then(response => {
      setdateDispoS(response.data.resultats);
      console.log('DispoSalon:', response.data);
    })
    .catch(error => {
      console.error('Error', error);
    });
  }, []);

  return (
    <Container textAlign="center" style={{ marginTop: '6em', marginBottom: '6em' }}>
      <Header as="h1" textAlign="center" style={{ fontSize: '8em' }}>Horaire Coiffeur</Header>
      <Grid columns={2}>
        <Grid.Column width={5} style={{ marginLeft : '8.5em' }}>
        <Form>
          <Form.Group widths="equal">
            <Form.Field style={{ maxWidth: '300px' }}>
              <label>Coiffeurs</label>
              <select required style={{ width: '12em', height: '2.82em'}} value={selectedCoiffeur} onChange={(e) => setSelectedCoiffeur(e.target.value)}>
              <option value="">Choisir un Coiffeur</option>
              {coiffeurs.map(coiffeur => (
                <option key={coiffeur.iDCoiffeur} value={coiffeur.iDCoiffeur}>{coiffeur.PrenomCoiffeur} {coiffeur.NomCoiffeur}</option>
              ))}
            </select>
            </Form.Field>
            <Form.Field style={{ maxWidth: '300px' }}>
              <label>Date</label>
              <select required style={{ width: '12em', height: '2.82em'}} value={selecteddateDispoS} onChange={(e) => setselecteddateDispoS(e.target.value)}>
              <option value="">Choisir une date</option>
              {dateDispoS.map(date => (
                <option key={date.idDispoS} value={date.idDispoS}>{date.DateDispo}</option>
              ))}
            </select>
            </Form.Field>
            <Form.Field>
              <label>Debut shift</label>
              <input required type="time" value={debutShift} onChange={(e) => setDebutShift(e.target.value)}/>
            </Form.Field>
            <Form.Field>
              <label>Fin shift</label>
              <input required type="time" value={finShift} onChange={(e) => setFinShift(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Debut pause</label>
              <input required type="time" value={debutPause} onChange={(e) => setDebutPause(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Fin pause</label>
              <input required type="time" value={finPause} onChange={(e) => setfinPause(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label style={{ visibility: 'hidden' }}>Hidden</label>
              <Button color='blue' circular size='tiny' onClick={ajouterDispo}>Ajouter Dispo</Button>
            </Form.Field>
          </Form.Group>
        </Form>
        </Grid.Column>
        <Grid.Row>
          <Grid.Column>
            <div className="calendar" style={{ display: 'inline-block' }}>
              <Calendar
                onChange={handleDateChange}
                value={date}
                className="react-calendar"
                tileContent={tileContent}
              />
            </div>
          </Grid.Column>
          <Grid.Column>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Horaire Pour la Journee</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              
              <Table.Body>
              {filteredReservations.map((reservation, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Form>
                      <Form.Field>
                        <Label>Debut Shift:</Label>
                        <Input fluid type='time' value={editedReservations[index]?.heure || reservation.debutShift} onChange={(e) => handleHeureChange(index, e.target.value)} disabled={!editable} />
                      </Form.Field>
                      <Form.Field>
                        <Label>Fin Shift:</Label>
                        <Input fluid type='time' value={editedReservations[index]?.heure2 || reservation.finShift} onChange={(e) => handleHeure2Change(index, e.target.value)} disabled={!editable} />
                      </Form.Field>
                      <Form.Field>
                        <Label>Debut pause:</Label>
                        <Input fluid type='time' value={editedReservations[index]?.heure3 || reservation.PauseDebut} onChange={(e) => handleHeure3Change(index, e.target.value)} disabled={!editable} />
                      </Form.Field>
                      <Form.Field>
                        <Label>Fin pause:</Label>
                        <Input fluid type='time' value={editedReservations[index]?.heure4 || reservation.PauseFin} onChange={(e) => handleHeure4Change(index, e.target.value)} disabled={!editable} />
                        </Form.Field>
                      <Button circular color='blue' onClick={editable ? ()=>{handleModifier(reservation.idDispoC, reservation.debutShift, reservation.finShift, reservation.PauseDebut, reservation.PauseFin)} : toggleEditMode} >
                        {editable ? 'Terminé' : 'Modifier'}
                      </Button>
                      <Button circular color='red' style={{marginLeft: '1em'}} onClick={()=>{handleAnnuler(reservation.idDispoC)}}> Annuler</Button>
                    </Form>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            </Table>
            {successMessage && <Message success>{successMessage}</Message>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default HorraireCoiffeur;
