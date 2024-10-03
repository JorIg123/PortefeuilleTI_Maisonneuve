import React, {  } from 'react';
import { useParams } from 'react-router-dom';
import { Message } from 'semantic-ui-react';

const InscriptionCoiffeur = () => {
  const { salonID } = useParams();

  return (
    <Message info size='massive'  style={{marginTop: '5em', textAlign: 'center'}}>
      <Message.Header>Ajoutez des coiffeurs à votre salon !</Message.Header>
      <p>
        Si vous souhaitez ajouter des coiffeurs à votre salon, faites-leur parvenir votre ID personnel : <strong>{salonID}</strong>.
      </p>
    </Message>
  );
}

export default InscriptionCoiffeur;
