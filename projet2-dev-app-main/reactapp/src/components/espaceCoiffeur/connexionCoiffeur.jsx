import React, {useState} from 'react';
import { Container, Form, Icon, Input, Button, Header } from 'semantic-ui-react';
import { NavLink, useNavigate } from 'react-router-dom';

const ConnexionForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/loginCoiffeur', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              Email: email,
              MotDePasse: password
          })
      });

      const data = await response.json()

      if (response.ok) {
          
          console.log('[+] Coiffeur connecté avec succès', data);
          const  token  = data.token;
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('idCoiffeur', data.coiffeurID);
          navigate(`/disponibiliteCoiffeur/${data.coiffeurID}`);
      } else {
          console.error('Erreur', response.statusText);
      }
  } catch (error) {
      console.error('Erreur', error);
  }
  }
  return (
    <div className="login-page" style={{ backgroundImage: `url('/img/Default_a_image_for_a_backgorund_barber_shop_website_2.jpg')`, backgroundSize: 'cover', height: '100vh' }}>
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', height: '100%',width: '100%' }}>
      <div className="login-container" style={{ display: 'flex',width: '48.5%' , padding: '2em', borderRadius: '10px', backgroundColor: 'rgb(242 245 249)', flexGrow: 1 }}>
        <div className="login-form" style={{ flex: 1 }}>

          <Form onSubmit={handleSubmit}>

            <Header as="h1" style={{ color: '#333', fontSize: '8em', marginBottom: '0.5em', marginTop: '0.5em', marginLeft: "24%" }}>El Barber</Header>
            <Header as="h2" style={{ fontSize: '3.5em', marginBottom: '1em', marginLeft: "28.5%"}}>Connexion Coiffeur</Header>
            <Form.Field style={{ marginLeft:'28%', width: '400px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <Input
                    iconPosition='left'
                    placeholder='Email'
                    type='email'
                    icon={<Icon name='envelope' />}
                    value = {email}
                    onChange = {(e) => {setEmail(e.target.value)}}
                    required
                />
            </Form.Field>
            <Form.Field style={{ marginLeft:'28%', width: '400px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <Input
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    icon={<Icon name='lock' />}
                    value = {password}
                    onChange = {(e) => {setPassword(e.target.value)}}
                    required
                />
            </Form.Field>
            <Form.Field style={{marginLeft: '43%'}}>
                <Button type="submit" color='blue' style={{ marginTop: '15px', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>SE CONNECTER</Button>
                <p>Pas encore inscrit ? <NavLink to="/inscriptionCoiffeur">inscription</NavLink></p>
            </Form.Field>
          </Form>
        </div>
      </div>
    </Container>
  </div>
  );
};

export default ConnexionForm;
