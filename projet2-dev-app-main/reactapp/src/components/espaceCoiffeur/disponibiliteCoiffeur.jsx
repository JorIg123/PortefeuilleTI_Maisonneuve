import React, { useState, useEffect } from 'react';
import { Container, Grid, Header, Table,Form, Input, Label } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import './Calendar.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DisponibiliteCoiffeur = () => {
  const [date, setDate] = useState(new Date());
  const [disponibiliteDetails, setDisponibiliteDetails] = useState([]);
  const [disponibilieDate, setDisponibilieDate] = useState([]);

  const { coiffeur_id } = useParams();
  console.log(coiffeur_id);

  useEffect(() => {
    const fetchDisponibilite = async () => {
      try {
        const response = await axios.get('http://localhost:3000/DispoCoiffeur', {
          params: {
            idCoiffeur: coiffeur_id
          }
        });
        console.log(response.data);
        const datesDispo = response.data.resultats.map(res => res.DateDispo);
        setDisponibilieDate(datesDispo)
        setDisponibiliteDetails(response.data.resultats);
      } catch (error) {
        console.error('Erreur lors de l\'obtention des disponibilités:', error);
      }
    };

    fetchDisponibilite();
  }, []);

  const handleDateChange = newDate => {
    setDate(newDate);
  };
  
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = formatDate(date);
      if (disponibilieDate.includes(formattedDate)) {
        // Si la date est parmi les dates de disponibilité, affichez un indicateur visuel dans le calendrier
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

  const filteredDispo = disponibiliteDetails.filter(r => formatDate(date) === r.DateDispo);
  console.log('aaaaaaaaa', filteredDispo);
  return (
    <Container textAlign="center" style={{ marginTop: '6em', marginBottom: '6em' }}>
      <Header as="h1" textAlign="center" style={{ fontSize: '8em' }}>Disponibilité</Header>
      <Grid columns={2} style={{ marginTop: '2em' }}>
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
                  <Table.HeaderCell>Details Dispo</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              
              <Table.Body>
              {filteredDispo.map((disponibilite, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Form>

                      <Form.Field>
                        <Label>Début du Shift:</Label>
                        <Input value={disponibilite.debutShift}  />
                      </Form.Field>
                      <Form.Field>
                        <Label>Fin du Shift:</Label>
                        <Input value={disponibilite.finShift}  />
                      </Form.Field>
                      <Form.Field>
                        <Label>Début de la Pause:</Label>
                        <Input value={disponibilite.PauseDebut}  />
                      </Form.Field>
                      <Form.Field>
                        <Label>Fin de la Pause:</Label>
                        <Input value={disponibilite.PauseFin}  />
                      </Form.Field>
                    </Form>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};


export default DisponibiliteCoiffeur;
