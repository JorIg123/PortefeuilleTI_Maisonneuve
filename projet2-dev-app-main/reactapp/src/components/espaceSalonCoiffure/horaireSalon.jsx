import React, { useState, useEffect } from 'react';
import { Container, Grid, Header, Table,Form, Button, Message, Input, Label } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import '../espaceClient/Calendar.css'
import axios from 'axios';

const HorraireSalon = () => {
  const [date, setDate] = useState(new Date());
  const [reservationsDate, setReservationsDate] = useState([]);
  const [reservationDetails, setReservationsDetails] = useState([]);
  const [editable, setEditable] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [heure, setHeure] = useState('')
  const [heure2, setHeure2] = useState('')
  const [editedReservations, setEditedReservations] = useState([]);

  const [dateValue, setDateValue] = useState('');
  const [ouvertureValue, setOuvertureValue] = useState('');
  const [fermetureValue, setFermetureValue] = useState('');

  const { salonID } = useParams();
  console.log(salonID);
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/DispoSalon', {
          params: {
            idSalon: salonID
          }
        });
        if (response.data.resultats.length > 0) {
          const dates = response.data.resultats.map(rdv => rdv.DateDispo);
          setReservationsDate(dates);
          setReservationsDetails(response.data.resultats)
          console.log('aaa', reservationDetails);
        }
        console.log(response.data);
      } catch (error) {
        console.error('Error lors de l obtention des salons:', error);
      }
    };

    fetchReservations();
  }, []);

  const toggleEditMode = () => {
    setEditable(!editable);
    setSuccessMessage('')
  };

  const handleDateChange = newDate => {
    setDate(newDate);
  };
  
  const handleModifier = async (idDispoS, ouverture, fermeture, dateDispo) => {
    const ouvertureActuelle = heure.trim().length === 0 ? ouverture : heure
    const fermetureActuelle = heure2.trim().length === 0 ? fermeture : heure2

      try {
        const response = await fetch('http://localhost:3000/ModifierDispoSalon', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              // idDispoS, dateDispo, ouverture, fermeture
              idDispoS,
              ouverture:ouvertureActuelle,
              fermeture: fermetureActuelle,
              dateDispo
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

  const handleHeureOuvertureChange = (index, value) => {
    const newEditedReservations = [...editedReservations];
    newEditedReservations[index] = { ...newEditedReservations[index],  heure: value === '' ? undefined : value };
    setEditedReservations(newEditedReservations);
    setHeure(value)
  };

  const handleHeureFermetureChange = (index, value) => {
    const newEditedReservations = [...editedReservations];
    newEditedReservations[index] = { ...newEditedReservations[index],  heure2: value === '' ? undefined : value };
    setEditedReservations(newEditedReservations);
    setHeure2(value)
  };

  const filteredReservations = reservationDetails.filter(r => formatDate(date) === r.DateDispo);

  const ajouterDispo = () => {
    const data = {
      idSalon: salonID,
      dateDispo: dateValue,
      ouverture: ouvertureValue,
      fermeture: fermetureValue
    };

    axios.post('http://localhost:3000/AjouterDispoSalon', data)
      .then(response => {
        console.log('[+]', response.data);
        window.location.reload()
      })
      .catch(error => {
        console.error('Erreur', error);
      });
  };
  return (
    <Container textAlign="center" style={{ marginTop: '6em', marginBottom: '6em' }}>
      <Header as="h1" textAlign="center" style={{ fontSize: '8em' }}>Horaire</Header>
      <Grid columns={2}>
        <Grid.Column width={5} style={{ marginLeft : '23.5em' }}>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Date</label>
              <input required type="date" value={dateValue} onChange={(e) => setDateValue(e.target.value)}/>
            </Form.Field>
            <Form.Field>
              <label>Ouverture</label>
              <input required type="time" value={ouvertureValue} onChange={(e) => setOuvertureValue(e.target.value)}/>
            </Form.Field>
            <Form.Field>
              <label>Fermeture</label>
              <input required type="time" value={fermetureValue} onChange={(e) => setFermetureValue(e.target.value)} />
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
                        <Label>Ouverture:</Label>
                        <Input fluid type='time' value={editedReservations[index]?.heure || reservation.Ouverture} onChange={(e) => handleHeureOuvertureChange(index, e.target.value)} disabled={!editable} />
                      </Form.Field>
                      <Form.Field>
                        <Label>Fermeture:</Label>
                        <Input fluid type='time' value={editedReservations[index]?.heure2 || reservation.Fermeture} onChange={(e) => handleHeureFermetureChange(index, e.target.value)} disabled={!editable} />
                      </Form.Field>
                      <Button circular color='blue' onClick={editable ? ()=>{handleModifier(reservation.idDispoS, reservation.Ouverture, reservation.Fermeture, reservation.DateDispo)} : toggleEditMode} >
                        {editable ? 'Terminé' : 'Modifier'}
                      </Button>
                      <Button circular color='red' style={{marginLeft: '1em'}} onClick={()=>{handleAnnuler(reservation.idDispoS)}}> Annuler</Button>
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
};

export default HorraireSalon;
