import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AccueilCoiffeur from './accueilCoiffeur';
import ConnexionForm from './connexionCoiffeur';
import InscriptionForm from './inscriptionCoiffeur';
import ProfilCoiffeur from './profilCoiffeur';
import DisponibiliteCoiffeur from './disponibiliteCoiffeur';
import ReservationsCoiffeur from './rendezvousCoiffeur';
import AvisCoiffeur from './avisCoiffeur';
import HeaderCoiffeur from './Header'
import Footer from './Footer';


function CoiffeurFinal() {

  return (
    <div className="App">
      <BrowserRouter>
        <HeaderCoiffeur/>
          <Routes>
            <Route path="/" element={<AccueilCoiffeur/>} />
            <Route path='/connexionCoiffeur' element={<ConnexionForm/>} />
            <Route path='/inscriptionCoiffeur' element={<InscriptionForm/>} />
            <Route path='/disponibiliteCoiffeur/:coiffeur_id' element={<DisponibiliteCoiffeur/>} />
            <Route path='/profilCoiffeur/:coiffeur_id' element={<ProfilCoiffeur/>} />
            <Route path='/rendezvousCoiffeur/:coiffeur_id' element={<ReservationsCoiffeur/>} />
            <Route path='/avisCoiffeur/:coiffeur_id' element={<AvisCoiffeur/>} />  
          </Routes>
        <Footer/> 
      </BrowserRouter>
    </div>
  );
}

export default CoiffeurFinal;
