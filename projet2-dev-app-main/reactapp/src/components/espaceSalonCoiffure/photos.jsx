import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Header, Label, Input, Container } from 'semantic-ui-react';
import axios from 'axios';

const PhotosSalon = () => {
  const { salonID } = useParams();
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
        const fetchCoiffeurDetails = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getPhotosSalon', {
                params: {
                    // id: props.match.params.id 
                    SalonId: salonID
                }
                });

                console.log(response.data);
                const listep = await Promise.all(response.data.map(async (element) => {
                    const nom = element.picture;
                    console.log(nom);
    
                    const responseImage = await fetch(`http://localhost:3000/fileSalon/${nom}`);
                    const arrayBuffer = await responseImage.arrayBuffer();
                    const blob = new Blob([arrayBuffer]);
                    const url = URL.createObjectURL(blob);
                    return { idPhoto: element.idPhoto, url: url }
                }));
                setPhotos(listep)
            
                // window.open(url);
            } catch (error) {
                console.error('Erreur lors de l\'obtention de l\'info du Salon', error);
            }
        };
    
        fetchCoiffeurDetails();
    }, []); 

  const handleDeletePhoto = async (photoId) => {
    try{
        const response = await axios.delete('http://localhost:3000/deletePhotoSalonParID', {
                params: { id: photoId }
                });
                alert('[+] Photo Delete Avec Succes')
                window.location.reload()
                console.log(response.data);
    }catch(error){
        console.error('Error', error);
    }
  };

  const handleUploadPhoto = () => {
    console.log('Fotografia', photo);
    axios.post('http://localhost:3000/image-upload-salon', photo)
          .then(res => {
            console.log('Photo: ', res.data)
            
            fetch('http://localhost:3000/ajouterPhotoSalon', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                // SalonId, picture
                SalonId: salonID,
                picture: res.data,
              })
            })
            .then(response => {
              if (response.ok) {
                console.log('[+] Salon enregistré avec succès');
                window.location.reload()
              } else {
                console.error('Erreur', response.statusText);
              }
            })
            .catch(error => {
              console.error('Erreur', error);
            });
        })
    }

  const getFileInfo = (e) => {
    //NOTE THE ADDITION OF 'e' PARAMETER
       console.log('File info working!')
       console.log(e.target.files[0]);
       const formData = new FormData(); 
       //FILE INFO NAME WILL BE "my-image-file"
       formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
       setPhoto(formData);
  }

  return (
    <Container textAlign='center' style={{ marginTop: '8em', marginBottom: '5em'  }}>
      <Header as="h1" style={{ fontSize: '5em', marginBottom: '0.5em', textAlign: 'center'}}>Vos Photos </Header>
      <Button  onClick={handleUploadPhoto} circular color='blue' style={{ marginBottom: '1em', marginRight: '1em', fontSize: '1em' }}>
        Ajouter un photo
      </Button>
      <Input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        required
        onChange= {getFileInfo}
      />
      <Card.Group centered style={{marginTop: '2em'}}>
        {photos.map(photo => (
          <Card key={photo.id}>
            <Card.Content>
              <Card.Description>
                <img src={photo.url} alt={'photoSalon'} style={{ maxWidth: '100%' }} />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button color='red' onClick={() => handleDeletePhoto(photo.idPhoto)}>Supprimer</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};
  
  export default PhotosSalon;