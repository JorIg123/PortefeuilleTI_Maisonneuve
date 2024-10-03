import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#eaeaea', padding: '2em 0' }}>
      <Container>
        <div className="flex-contact" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="flex" style={{ flex: 1 }}>
            <div style={{ marginBottom: '6em', textAlign: 'left' }}>
              <Header as="h2" style={{ fontSize: '3em' }}>Pour nous joindre</Header>
              <p style={{ fontSize: '1.5em', marginBottom: '0.1em' }}>
                <a href="mailto:ElBarber@gmail.com">ElBarber@gmail.com</a>
              </p>
              <p style={{ fontSize: '1.5em' }}>
                <a href="tel:438-123-456">438-123-456</a>
              </p>
            </div>
            <div className="flex-logo" style={{ display: 'flex', alignItems: 'center' }}>
              <Image className="logo2" src="../img/facebook.png" alt="facebook" style={{ width: '30px', marginRight: '10px' }} />
              <Image id="logo2-insta" src="../img/instagram.png" alt="instagram" style={{ width: '30px', marginRight: '10px' }} />
              <Image className="logo2" src="../img/linkedin.png" alt="linkedin" style={{ width: '30px' }} />
            </div>
          </div>
          <div className="flex-map" style={{ flex: 1 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d22350.70532600428!2d-73.54720552183143!3d45.55358099250924!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91bf5bacbeffd%3A0x68ff300997eff5c!2sColl%C3%A8ge%20de%20Maisonneuve!5e0!3m2!1sfr!2sca!4v1702967268796!5m2!1sfr!2sca"
              title="Google Maps - Collège de Maisonneuve"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: '10px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
