import React from 'react';
import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import InscriptionCoiffeur from './inscriptionCoiffeur';
import InscriptionSalon from './inscriptionSalon';
import ConnexionSalon  from './connexionSalon';
import Accueil  from './accueil';
import AjouterService  from './ajouterService';
import HorraireCoiffeur  from './horaireCoiffeur';
import HorraireSalon from './horaireSalon';
import Profil from './profil';
import Avis from './avisSalon'
import Photos from './photos'

function App() {
  return (
    <div>
      <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Accueil/>} exact />
        <Route path='/inscriptionSalon' element={<InscriptionSalon/>} />
        <Route path='/connexionSalon' element={<ConnexionSalon/>} />
        <Route path='/inscriptionCoiffeur/:salonID' element={<InscriptionCoiffeur/>} />
        <Route path='/ajouterService/:salonID' element={<AjouterService/>} />
        <Route path='/horraireCoiffeur/:salonID' element={<HorraireCoiffeur/>} />
        <Route path='/horraireSalon/:salonID' element={<HorraireSalon/>} />
        <Route path='/profilSalon/:salonID' element={<Profil/>} />
        <Route path='/avisSalon/:salonID' element={<Avis/>} />
        <Route path='/photoSalon/:salonID' element={<Photos/>} />
      </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;