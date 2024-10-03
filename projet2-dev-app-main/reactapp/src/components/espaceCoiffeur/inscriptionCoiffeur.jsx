import React, { useState } from 'react';
import { Button, Form, Input, Icon, Label, Container, Header } from 'semantic-ui-react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const InscriptionForm = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [idSalon, setIDSalon] = useState('')

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();

          axios.post('http://localhost:3000/image-upload-coiffeur', image)
          .then(res => {
            console.log('Axios response: ', res)
            
            fetch('http://localhost:3000/registerCoiffeur', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                Email: email,
                PrenomCoiffeur: prenom,
                NomCoiffeur: nom,
                MotDePasse: password,
                PhotoCoiffeur: res.data,
                IDSalon: idSalon
              })
            })
            .then(response => {
              if (response.ok) {
                console.log('[+] Coiffeur enregistré avec succès');
                navigate('/connexionCoiffeur');
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
         setImage(formData);
    }

    return (
      <div className="login-page" style={{ backgroundImage: `url('/img/Default_a_image_for_a_backgorund_barber_shop_website_2.jpg')`, backgroundSize: 'cover', height: '100vh' }}>
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', height: '100%',width: '100%' }}>
          <div className="login-container" style={{ display: 'flex',width: '48.5%' , padding: '2em', borderRadius: '10px', backgroundColor: 'rgb(242 245 249)', flexGrow: 1 }}>
            <div className="login-form" style={{ flex: 1 }}>
              <Form onSubmit={handleSubmit}>
                <Header as="h1" style={{ color: '#333', fontSize: '8em', marginTop: '0.5em', marginLeft:'24%' }}>El Barber</Header>
                <Header as="h2" style={{ fontSize: '3.5em', marginBottom: '1em', marginLeft:'29%'}}>Inscription Coiffeur</Header>
                <Form.Field style={{ marginLeft: '28%', width: '400px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                  <Input
                      iconPosition='left'
                      placeholder='Nom'
                      type='text'
                      icon={<Icon name='user' />}
                      required
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                  />
                </Form.Field>
                <Form.Field style={{ marginLeft: '28%', width: '400px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Input
                        iconPosition='left'
                        placeholder='Prenom'
                        type='text'
                        icon={<Icon name='user' />}
                        required
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                </Form.Field>
                <Form.Field inline style={{ marginLeft: '28%', width: '400px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Label style={{ fontSize: '1em' }}>Photo: </Label>
                    <Input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        required
                        onChange= {getFileInfo}
                    />
                </Form.Field>
                <Form.Field style={{ marginLeft: '28%', width: '400px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Input
                        iconPosition='left'
                        placeholder='Email'
                        type='email'
                        icon={<Icon name='envelope' />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Field>
                <Form.Field style={{ marginLeft: '28%', width: '400px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Input
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        icon={<Icon name='lock' />}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Field>
                <Form.Field style={{ marginLeft: '28%', width: '400px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Input
                        iconPosition='left'
                        placeholder='IDSalon'
                        type='text'
                        icon={<Icon name='lock' />}
                        required
                        value={idSalon}
                        onChange={(e) => setIDSalon(e.target.value)}
                    />
                </Form.Field>
                <Button type="submit" color='blue' size='large' style={{ marginTop: '2%',marginLeft:'43%', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>S'INSCRIRE</Button>
        </Form>
        </div>
      </div>
    </Container>
    </div>
  );
};

export default InscriptionForm;
