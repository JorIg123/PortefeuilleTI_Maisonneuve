import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Segment, Grid, Image, Icon, Label, Button, Input, Message } from 'semantic-ui-react';
import axios from 'axios';


const ProfilClient = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('')
    const [successMessage, setSuccessMessage] = useState('');

    const { user_id } = useParams();

    useEffect(() => {
        const fetchclientDetails = async () => {
          try {
            const response = await axios.get('http://localhost:3000/getClientparID', {
              params: {
                id: user_id
              }
            });
            setPrenom(response.data[0].PrenomClient)
            setNom(response.data[0].NomClient)
            setEmail(response.data[0].Email)
            const nom = response.data[0].photoProfil
            console.log(nom);

            const responseImage = await fetch(`http://localhost:3000/file/${nom}`);
            const arrayBuffer = await responseImage.arrayBuffer();
            const blob = new Blob([arrayBuffer]);
            const url = URL.createObjectURL(blob);
            setPhoto(url)
        
            // window.open(url);
          } catch (error) {
            console.error('Erreur lors de l obtention de l info du Salon', error);
          }
        };
    
        fetchclientDetails();
      }, []); 

      const toggleEditMode = () => {
        setEditMode(!editMode);
        setSuccessMessage('')
      };

      const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/modifierClient', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    PrenomClient: prenom,
                    NomClient : nom,
                    Email: email
                })
            });

            if (response.ok) {
                console.log('[+] Client modifier avec succes');
                setSuccessMessage('Votre Profil a ete Modifier avec succes !!!');
                setTimeout(() => {
                    setSuccessMessage('');
                    setEditMode(false);
                }, 800);
            } else {
                console.error('Erreur dans la mise a jour du Client');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <Container style={{ marginTop: '9em', marginBottom: '8em' }}>
        
            <Segment style={{ borderRadius: '50px', boxShadow: '0 4px 8px rgba(0, 0, 0, 1)'}}>
                <Grid>
                <Grid.Column width={16}>
                    <Header as="h1" textAlign="center" style={{ fontSize: '5em', marginBottom:'0.5em', marginTop:'0.5em'}}>Mon Profil</Header>
                </Grid.Column>
                
                <Grid.Column width={5}>
                    <Image style={{height:'280px' , borderRadius: '50px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'}} src={photo} alt='phot Profil'/>
                </Grid.Column>

                <Grid.Column width={10} textAlign='left'>
                    <Label style={{ marginBottom: '1em' }}>
                    <Icon name='user'/> Prénom:
                    </Label>
                    <Input fluid disabled={!editMode} value={prenom} onChange={(e) => setPrenom(e.target.value)} style={{ marginBottom: '2em' }} />
        
                    <Label style={{ marginBottom: '1em' }}>
                    <Icon name='user'/> Nom:
                    </Label>
                    <Input fluid disabled={!editMode} value={nom} onChange={(e) => setNom(e.target.value)} style={{ marginBottom: '2em' }} />
        
                    <Label style={{ marginBottom: '1em' }}>
                    <Icon name='mail'/> Email:
                    </Label>
                    <Input fluid disabled={!editMode} value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: '2em' }} />
        
                    {successMessage && <Message success>{successMessage}</Message>}
                    <Button color='blue' circular size='large' onClick={editMode ? handleSubmit : toggleEditMode}>{editMode ? 'Terminer' : 'Modifier Mon Profil'}</Button>
                    
                    
                </Grid.Column>

                </Grid>
            </Segment>
    </Container>
  );
};

export default ProfilClient;
