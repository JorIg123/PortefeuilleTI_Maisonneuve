import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';

const HeaderCoiffeur = () => {
  let token = sessionStorage.getItem('token');
  let idCoiffeur = sessionStorage.getItem('idCoiffeur');
  let isLoggedIn = token ? true : false;

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Menu fixed="top" borderless size="massive">
      <Container style={{width: "100%", paddingLeft: "2%", paddingRight: '3%'}}>
        <Menu.Item as={NavLink} to="/" header>
          <img src="../img/logo.png" alt="logo" />
          ElBarber
        </Menu.Item>
        <Menu.Menu position="right" >
        {location.pathname === '/' && !isLoggedIn && (
            <>
              <Menu.Item>
              <Button as={NavLink} to="/connexionCoiffeur" color="blue" circular>
                Connexion
              </Button>
            </Menu.Item>
            </>
          )}
          {isLoggedIn && (
            <>
              <Menu.Item as={NavLink} to={`/disponibiliteCoiffeur/${idCoiffeur}`} style={{ marginRight: '15px'}}>Horaire</Menu.Item>
              <Menu.Item  as={NavLink} to={`/profilCoiffeur/${idCoiffeur}`} style={{ marginRight: '15px'}}>Profil</Menu.Item>
              <Menu.Item as={NavLink} to={`/rendezvousCoiffeur/${idCoiffeur}`} style={{ marginRight: '15px'}}>Réservation</Menu.Item>
              <Menu.Item as={NavLink} to={`/avisCoiffeur/${idCoiffeur}`}>Avis</Menu.Item>
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

export default HeaderCoiffeur;
