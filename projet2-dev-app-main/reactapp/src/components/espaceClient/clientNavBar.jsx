import React from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';

const ClientNavbar = () => {
  let token = sessionStorage.getItem('token');
  let idUser = sessionStorage.getItem('idUtilisateur');
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
              <Button as={NavLink} to="/login" color="blue" circular>
                Connexion
              </Button>
            </Menu.Item>
            </>
          )}
          {isLoggedIn && (
            <>
              <Menu.Item as={NavLink} to={`/home/${idUser}`} style={{ marginRight: '15px'}}>Accueil</Menu.Item>
              <Menu.Item  as={NavLink} to={`/profil/${idUser}`} style={{ marginRight: '15px'}}>Profil</Menu.Item>
              <Menu.Item as={NavLink} to={`/reservations/${idUser}`} style={{ marginRight: '15px'}}>Reservations</Menu.Item>
              <Menu.Item as={NavLink} to={`/favoris/${idUser}`}>Favoris</Menu.Item>
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

export default ClientNavbar;
