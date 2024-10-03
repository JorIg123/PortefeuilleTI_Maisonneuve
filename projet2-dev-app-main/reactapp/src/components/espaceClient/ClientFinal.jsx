import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AccueilClient from './AccueilClient';
import ClientNavbar from './clientNavBar';
import DetailsSalonCoiffure from './DetailsSalonCoiffure'
import FavorisClient from './FavorisClient'
import HomeClient from './HomeClient'
import LoginForm from './LoginForm'
import ProfilClient from './ProfilClient';
import RegisterForm from './RegisterForm';
import ReservationsClient from './ReservationsClient';
// import Footer from './Footer'

const ClientFinal = () => {
    return (
      <Router>
        <ClientNavbar/>
        <Routes>
          <Route path="/" element={<AccueilClient/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home/:user_id" element={<HomeClient/>} />
          <Route path="/profil/:user_id" element={<ProfilClient/>} />
          <Route path="/reservations/:user_id" element={<ReservationsClient/>} />
          <Route path="/favoris/:user_id" element={<FavorisClient/>} />
          <Route path="/detailsSalon/:salon_id" element={<DetailsSalonCoiffure/>} />
        </Routes>
      </Router>
    );
  };
  
  export default ClientFinal;