import React from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom'
import { Menu, Container, Button } from 'semantic-ui-react';

function Header() {

  let token = sessionStorage.getItem('token');
  let idSalon = sessionStorage.getItem('idSalon');
  let isLoggedIn = token ? true : false;

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };
  return (
    <Menu fixed="top" borderless size="massive">
      <Container style={{ width: '100%', paddingLeft: '2%', paddingRight: '3%' }}>
        <Menu.Item as={NavLink} to="/" header>
          <img src="../img/logo.png" alt="logo" />
          ElBarber
        </Menu.Item>
        <Menu.Menu position="right">
          {location.pathname === '/' && !isLoggedIn && (
            <>
              <Menu.Item>
              <Button as={NavLink} to="/connexionSalon" color="blue" circular>
                Connexion
              </Button>
            </Menu.Item>
            </>
          )}
          {isLoggedIn && (
            <>
              <Menu.Item as={NavLink} to={`/horraireSalon/${idSalon}`} style={{ marginRight: '15px'}}>Votre Horaire</Menu.Item>
              <Menu.Item as={NavLink} to={`/profilSalon/${idSalon}`} style={{ marginRight: '15px'}}>Profil</Menu.Item>
              <Menu.Item  as={NavLink} to={`/horraireCoiffeur/${idSalon}`} style={{ marginRight: '15px'}}>Horaire coiffeur</Menu.Item>
              <Menu.Item as={NavLink} to={`/ajouterService/${idSalon}`} style={{ marginRight: '15px'}}>Ajouter un service</Menu.Item>
              <Menu.Item as={NavLink} to={`/avisSalon/${idSalon}`}>Avis</Menu.Item>
              <Menu.Item as={NavLink} to={`/photoSalon/${idSalon}`}>Vos photos</Menu.Item>
              <Menu.Item as={NavLink} to={`/inscriptionCoiffeur/${idSalon}`} style={{ marginRight: '15px'}}>Ajouter un coiffeur à votre Salon</Menu.Item>
              <Menu.Item>
              <Button color="red" circular onClick={handleLogout}>
                Deconnexion
              </Button>
              </Menu.Item>
            </>
           )}
        </Menu.Menu>
      </Container>
    </Menu>
  );

};
export default Header;
