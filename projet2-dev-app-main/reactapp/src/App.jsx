import 'semantic-ui-css/semantic.min.css';
import ClientFinal from './components/espaceClient/ClientFinal';
import CoiffeurFinal from './components/espaceCoiffeur/CoiffeurFinal';
import SalonFinal from './components/espaceSalonCoiffure/SalonFinal';
import React, { useState,useEffect} from 'react';
import EcranPrincipale from './components/EcranPrincipale'; // Import the new component
import { Button, Card, Icon, Grid } from 'semantic-ui-react';

function App() {
  const [userType, setUserType] = useState(() => {
    // Check for stored user type in session storage
    return sessionStorage.getItem('userType') || null;
  });

  useEffect(() => {
    // Store the user type in session storage whenever it changes
    if (userType) {
      sessionStorage.setItem('userType', userType);
    } else {
      sessionStorage.removeItem('userType');
    }
  }, [userType]);
  return (
    <div className="App">
      {userType ? (
        <>
          {userType === 'client' && (
            <div>
              <ClientFinal />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120px' }}>
                <Button
                  circular
                  onClick={() => setUserType(null)}
                  size='massive'
                  color='blue'
                >
                  Je suis un Coiffeur/Salon
                </Button>
              </div>
            </div>
          )}
          {userType === 'coiffeur' && (
            <div>
              <CoiffeurFinal />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120px' }}>
                <Button
                  circular
                  onClick={() => setUserType(null)}
                  size='massive'
                  color='blue'
                >
                  Je suis un Client/Salon
                </Button>
              </div>
            </div>
          )}
          {userType === 'salon' && (
            <div>
              <SalonFinal />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120px' }}>
                <Button
                  circular
                  onClick={() => setUserType(null)}
                  size='massive'
                  color='blue'
                >
                  Je suis un Client/Coiffeur
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <EcranPrincipale setUserType={setUserType} />
      )}
    </div>
  );
}

export default App;
