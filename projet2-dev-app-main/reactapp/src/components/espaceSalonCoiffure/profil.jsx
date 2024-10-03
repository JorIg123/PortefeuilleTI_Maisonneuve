import React, { useState, useEffect } from 'react';
import { Container, Header, Segment, Grid, Image, Icon, Label, Button, Input, Message } from 'semantic-ui-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfilSalon = () => {
    const [editMode, setEditMode] = useState(false);
    const [nomSalon, setnomSalon] = useState('');
    const [telephoneSalon, settelephoneSalon] = useState('');
    const [adresse, setadresse] = useState('');
    const [bio, setbio] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('')
    const [successMessage, setSuccessMessage] = useState('');

    const { salonID } = useParams();

    useEffect(() => {
        const fetchCoiffeurDetails = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getSalonsparID', {
                params: {
                    // id: props.match.params.id 
                    id: salonID
                }
                });
                setnomSalon(response.data.salon[0].nomSalon)
                settelephoneSalon(response.data.salon[0].telephoneSalon)
                setadresse(response.data.salon[0].adresse)
                setbio(response.data.salon[0].bio)
                setEmail(response.data.salon[0].Email)

                console.log(response.data);
                const nom = response.data.salon[0].PhotoSalon
                console.log(nom);

                const responseImage = await fetch(`http://localhost:3000/fileSalon/${nom}`);
                const arrayBuffer = await responseImage.arrayBuffer();
                const blob = new Blob([arrayBuffer]);
                const url = URL.createObjectURL(blob);
                setPhoto(url)
            
                // window.open(url);
            } catch (error) {
                console.error('Erreur lors de l\'obtention de l\'info du Salon', error);
            }
        };
    
        fetchCoiffeurDetails();
    }, []); 

    const toggleEditMode = () => {
        setEditMode(!editMode);
        setSuccessMessage('')
    };

    const handleSubmit = async () => {
    try {
        const response = await fetch('http://localhost:3000/modifierSalon', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Email, nomSalon, telephoneSalon, adresse, bio
                Email: email,
                nomSalon: nomSalon,
                telephoneSalon: telephoneSalon,
                adresse: adresse,
                bio: bio
            })
        });

        if (response.ok) {
            console.log('[+] Coiffeur modifier avec succès');
            setSuccessMessage('Votre Profil a ete Modifier avec succes !!!');
            setTimeout(() => {
                setSuccessMessage('');
                setEditMode(false);
            }, 800);
        } else {
            console.error('Erreur dans la mise a jour du Coiffeur');
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
                    <Image style={{height:'280px' , borderRadius: '50px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'}} src={photo} alt='Photo Profil'/>
                </Grid.Column>

                <Grid.Column width={10} textAlign='left'>
                    <Label style={{ marginBottom: '1em' }}>
                    <Icon name='user'/> NomSalon:
                    </Label>
                    <Input fluid disabled={!editMode} value={nomSalon} onChange={(e) => setnomSalon(e.target.value)} style={{ marginBottom: '2em' }} />
        
                    <Label style={{ marginBottom: '1em' }}>
                    <Icon name='phone'/> Telephone
                    </Label>
                    <Input fluid disabled={!editMode} value={telephoneSalon} onChange={(e) => settelephoneSalon(e.target.value)} style={{ marginBottom: '2em' }} />

                    <Label style={{ marginBottom: '1em' }}>
                    <Icon name='map marker alternate'/> Adresse
                    </Label>
                    <Input fluid disabled={!editMode} value={adresse} onChange={(e) => setadresse(e.target.value)} style={{ marginBottom: '2em' }} />
        
                    <Label style={{ marginBottom: '1em' }}>
                    <Icon name='edit'/> Bio
                    </Label>
                    <Input fluid disabled={!editMode} value={bio} onChange={(e) => setbio(e.target.value)} style={{ marginBottom: '2em' }} />

                    <Label style={{ marginBottom: '1em' }}>
                    <Icon name='mail'/> Email:
                    </Label>
                    <Input fluid disabled={!editMode} value={email} style={{ marginBottom: '2em' }} />
        
                    {successMessage && <Message success>{successMessage}</Message>}
                    <Button color='blue' circular size='large' onClick={editMode ? handleSubmit : toggleEditMode}>{editMode ? 'Terminer' : 'Modifier Mon Profil'}</Button>
                    
                    
                </Grid.Column>

                </Grid>
            </Segment>
    </Container>
  );
};

export default ProfilSalon;
