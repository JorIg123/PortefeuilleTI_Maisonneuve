import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Header, Form, Label, Button, } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

const AjouterService = () => {
  const [nom, setNomCoupe] = useState('');
  const [duree, setDuree] = useState('');
  const [prix, setPrix] = useState('');
  const [services, setServices] = useState([]);
  const [serviceEdit, setServiceEdit] = useState(null);

  const { salonID } = useParams();

  const Reset = () => {
    setNomCoupe('');
    setDuree('');
    setPrix('');
    setServiceEdit(null);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/voirServicesParidSalon', {
        params: {
            // id: props.match.params.id 
            idSalon: salonID
        }
        });
      setServices(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des services:', error);
    }
  }

  const FormulaireService = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/enregistrerService', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nom: nom,
        duree: duree,
        prix: prix,
        idSalon: salonID
      })
    })
      .then(response => {
        if (response.ok) {
          alert('Service ajouté avec succès!');
          console.log('[+] Service enregistré');
          window.location.reload();
        } else {
          alert('Erreur lors de l\'ajout du service');
          console.error('Error', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error', error);
      });
  }

  const handleDeleteService = (idService) => {
    axios.delete('http://localhost:3000/deleteService', {
      params:{
        idService
      }
    })
      .then(response => {
        if (response.status === 200) {
          alert('Service supprimé avec succès!');
          console.log('[+] Service supprimé');
          fetchServices();
        } else {
          console.error('Error', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error', error);
      });
  };

  const handleEditService = (id) => {
    const serviceToEdit = services.find(service => service.idService === id);
    setServiceEdit(serviceToEdit);
  };

  const handleSaveEditService = () => {
    axios.put('http://localhost:3000/modifierService', {
      idService: serviceEdit.idService,
      nom: serviceEdit.nom,
      duree: serviceEdit.duree,
      prix: serviceEdit.prix,
    })
      .then(response => {
        if (response.status === 200) {
          alert('Service modifié avec succès!');
          console.log('[+] Service modifié');
          window.location.reload()
        } else {
          console.error('Error', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error', error);
      });
  };

  return (
    <Container style={{ marginTop: '8em', marginBottom: '8em' }}>
      <Header as="h1" textAlign="center" style={{ fontSize: '5em', marginBottom:'0.5em', marginTop:'0.5em'}}>AJOUTER UN SERVICE</Header>
      <div className='card-container2'>
        <div className="card">
          <Form className="post-form" onSubmit={FormulaireService}>
            <div>
              <Label className="control has-icons-left">Nom :</Label>
              <input style={{marginBottom: '2em'}} type="text" placeholder="Nom" id="NomCoupe" value={nom} required onChange={(e) => setNomCoupe(e.target.value)} />
            </div>
            <div>
              <Label className="control has-icons-left"> Duree :</Label>
              <input style={{marginBottom: '2em'}} type='time' placeholder="Durée" id="duree" value={duree} required onChange={(e) => setDuree(e.target.value)} />
            </div>
            <div>
              <Label className="control has-icons-left has-icons-right"> Prix :</Label>
              <input style={{marginBottom: '2em'}} type='number' placeholder="Prix" id="EmailCoiffeur" value={prix} required onChange={(e) => setPrix(e.target.value)} />
            </div>
            <div className="btn-group">
              <Button type="submit" className="btn submit">Submit</Button>
              <Button type="reset" className="btn cancel" onClick={Reset}>Cancel</Button>
            </div>
          </Form>
        </div>
      </div>
      <h2>Liste des services :</h2>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Nom du service</th>
              <th>Durée</th>
              <th>Prix</th>
              <th></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.idService}>
                <td>
                  {serviceEdit && serviceEdit.idService === service.idService ? (
                    <input
                      type="text"
                      name="nom"
                      value={serviceEdit.nom}
                      onChange={(e) => setServiceEdit({ ...serviceEdit, nom: e.target.value })}
                    />
                  ) : (
                    service.nom
                  )}
                </td>
                <td>
                  {serviceEdit && serviceEdit.idService === service.idService ? (
                    <input
                      type="time"
                      name="duree"
                      value={serviceEdit.duree}
                      onChange={(e) => setServiceEdit({ ...serviceEdit, duree: e.target.value })}
                    />
                  ) : (
                    service.duree
                  )}
                </td>
                <td>
                  {serviceEdit && serviceEdit.idService === service.idService ? (
                    <input
                      type="number"
                      name="prix"
                      value={serviceEdit.prix}
                      onChange={(e) => setServiceEdit({ ...serviceEdit, prix: e.target.value })}
                    />
                  ) : (
                    service.prix
                  )}
                </td>
                <td><input type="radio" name="selectedService" value={service.id} /></td>

                <td>
                  {serviceEdit && serviceEdit.idService === service.idService ? (
                    <Button circular color='blue' onClick={handleSaveEditService}>Enregistrer</Button>
                  ) : (
                    <>
                      <Button circular color='red' onClick={() => handleDeleteService(service.idService)}>Supprimer</Button>
                      <Button circular color='orange' onClick={() => handleEditService(service.idService)}>Modifier</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default AjouterService;
