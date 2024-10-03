import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Header, Segment, Grid, Image, Icon, Rating, Button, Form, Label, TextArea, Popup, Select } from 'semantic-ui-react';
import axios  from 'axios';

const DetailsSalon = () => {
  const [salonDetails, setSalonDetails] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [etoilesClient, setEtoilesClient] = useState(0)
  const [commentaireClient, setCommentaireClient] = useState('')

  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [serviceChoisi, setserviceChoisi] = useState(false);

  const [coiffeurs, setCoiffeurs] = useState([]);
  const [selectedCoiffeurId, setSelectedCoiffeurId] = useState(0);
  const [coiffeurChoisi, setcoiffeurChoisi] = useState(false);

  const [coiffeurAvailability, setCoiffeurAvailability] = useState([]);
  const [coiffeurAvailabilityTime, setCoiffeurAvailabilityTime] = useState([]);

  const [dateRDV, setdateRDV] = useState('')
  const [dateChoisi, setdateChoisi] = useState(false);
  

  const [page, setPage] = useState(1);
  const reviewsPerPage = 5;

  const [showPopup, setShowPopup] = useState(false);

  const [photos, setPhotos] = useState([])

  const idUser = sessionStorage.getItem('idUtilisateur');
  console.log(idUser);
  const { salon_id } = useParams();
  
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSalonDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getSalonsparID', {
          params: {
            id: salon_id
          }
        });
        const allSalons = response.data
        console.log('Informacion del Salon: ', allSalons);
        const nom = allSalons.salon[0].PhotoSalon;
        console.log(nom);

        const responseImage = await fetch(`http://localhost:3000/fileSalon/${nom}`);
        const arrayBuffer = await responseImage.arrayBuffer();
        const blob = new Blob([arrayBuffer]);
        const url = URL.createObjectURL(blob);
      
        setSalonDetails({allSalons, url});
        console.log('DetailsSalon: ', salonDetails);

        const listep2 = await Promise.all(allSalons.photos.map(async (element) => {
          const nom = element.picture;
          console.log('Lolololo:', nom);

          const responseImage = await fetch(`http://localhost:3000/fileSalon/${nom}`);
          const arrayBuffer = await responseImage.arrayBuffer();
          const blob = new Blob([arrayBuffer]);
          const url = URL.createObjectURL(blob);
          return { url: url }
          }));
          setPhotos(listep2)
          console.log('Ojooooooo: ', photos);

        const favoriteResponse = await axios.get('http://localhost:3000/voirsalonFavorisParidclient', {
          params: {
            idClient: idUser,
          }
        });
        console.log(favoriteResponse.data);
        favoriteResponse.data.forEach(element => {
          if(element.idSalon === parseInt(salon_id)){
              setIsFavorite(true)
              console.log(isFavorite);
          }
        });

        const fetchServices = await axios.get('http://localhost:3000/voirServicesParidSalon', {
          params: {
            idSalon: salon_id
          }
        })
        console.log(fetchServices.data);
        setServices(fetchServices.data)

        const fetchCoiffeurs = await axios.get('http://localhost:3000/voirCoiffeurParIDSalon', {
          params: {
            IDSalon: salon_id
          }
        })
        console.log(fetchCoiffeurs.data);
        setCoiffeurs(fetchCoiffeurs.data)

      } catch (error) {
        console.error('Erreur lors de l obtention de l info du Salon', error);
      }
    };

    fetchSalonDetails();
  }, [salon_id]);
  
  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        const url = `http://localhost:3000/deleteSalonFavorisParidClientidSalon`; 
        const response = await fetch(url, {
          method: 'delete',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              idClient: idUser,
              idSalon: salon_id
          })
      });
      if (response.ok) {
          console.log('[+] Favoris efface avec succes');
      } else {
          console.error('Erreur lors de la supression des favoris', response);
      }
      } else {
        await axios.post('http://localhost:3000/enregistrerSalonFavoris', {
          idClient: idUser,
          idSalon: salon_id
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleDonnerAvis = async () => {
    try {
      console.log(etoilesClient);
        await axios.post('http://localhost:3000/enregistrerAvis', {
          // idClient, idSalonCoiffure, etoiles, commentaire
          idClient: idUser,
          idSalonCoiffure: salon_id,
          etoiles: etoilesClient,
          commentaire: commentaireClient 
        });
        window.location.reload()
      } catch (error) {
      console.error('Erreur au moment de faire un commentaire', error);
    }
  };

  const getCurrentReviews = () => {
    const startIndex = (page - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    return salonDetails.allSalons.reviews.slice(startIndex, endIndex);
  };

  const handelPopupClose = () => {
    setShowPopup(false)
    setserviceChoisi(false)
    setcoiffeurChoisi(false)
    setdateChoisi(false)
  }

  const handleDateDispoCoiffeur = async () => {
    try {
      setcoiffeurChoisi(true)
      console.log('CoiffeurID: ', selectedCoiffeurId);
      const fetchDateDispoCoiffeurs = await axios.get('http://localhost:3000/DispoCoiffeur', {
          params: {
            idCoiffeur: selectedCoiffeurId
          }
        })
        console.log('Fechas disponible', fetchDateDispoCoiffeurs.data.resultats);
        setCoiffeurAvailability(fetchDateDispoCoiffeurs.data.resultats)
    }catch(error) {
      console.error('Erreur fetching l horaire du coiffeur', error);
    }
  }

  const handleHeureDispo =  async (date, debutshift, finshift, pausedebut, PauseFin) => {
    try{
      setdateRDV(date)
      console.log('Date', dateRDV);
      console.log(debutshift);
      let rdvDuCoiffeur = []

      const fetchRdvCoiffeurDansLaJournee = await axios.get('http://localhost:3000/RDVCoiffeurJournee', {
          params: {
            idCoiffeur: selectedCoiffeurId,
            dateRDV: date
          }
        })
        console.log(fetchRdvCoiffeurDansLaJournee.data.resultatsFinaux);
        fetchRdvCoiffeurDansLaJournee.data.resultatsFinaux.forEach(element => {
          console.log('aaaaaaaaaaaaaaaaaaaaaaaa',element.dateRDV === date);
          if(element.dateRDV === date) {rdvDuCoiffeur.push(element)}
        });

      const fetchServiceParID = await axios.get('http://localhost:3000/getServiceParId', {
          params: {
            idService: selectedServiceId
          }
        })
        console.log(fetchServiceParID.data);
        const duree = fetchServiceParID.data[0].duree

        const fetchHoraireCoiffeur = await axios.get('http://localhost:3000/obtenirHoraire', {
          params: {
            debutshift,
            finshift,
            pausedebut, 
            PauseFin, 
            rdvDuCoiffeur: JSON.stringify(rdvDuCoiffeur), 
            duree
          }
        })
        console.log(fetchHoraireCoiffeur.data);
        setCoiffeurAvailabilityTime(fetchHoraireCoiffeur.data.heuresDisponibles);
        setdateChoisi(true)
        
    }catch(error) {
      console.error('Erreur fetching l heure du coiffeur', error);
    }

  }

  const handleReserverPlace = async (heure) => {
    try {
      const fetchReserverPlaceRDV = await axios.post('http://localhost:3000/prendreRDV', {
        idSalonCoiffure: salon_id, 
        idClient: idUser, 
        idService: selectedServiceId, 
        idCoiffeur: selectedCoiffeurId, 
        dateRDV, 
        heure
        })
      console.log(fetchReserverPlaceRDV.data);
      alert('[+] Votre Rendez Vous a ete pris avec succes')
      navigate(`/reservations/${idUser}`)

    } catch(error){
      console.error('[-] Erreur', error);
    }
  }

 

  return (
    <Container style={{ marginTop: '9em', marginBottom: '8em' }}>
      {salonDetails.hasOwnProperty('url') && (
        <>
          <Segment style={{ borderRadius: '50px', boxShadow: '0 4px 8px rgba(0, 0, 0, 1)'}}>
            <Grid>
            <Grid.Column width={16}>
                <Header as="h1" textAlign="center" style={{ fontSize: '5em', marginBottom:'0.5em', marginTop:'0.5em'}}>{salonDetails.allSalons.salon[0].nomSalon}</Header>
            </Grid.Column>

              <Grid.Column width={11}>
                <Image style={{borderRadius: '50px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'}} src={salonDetails.url}/>
                <Header as="h1" textAlign='left'>Description</Header>
                <p style={{textAlign: 'left', fontSize:'1.3em'}}> {salonDetails.allSalons.salon[0].bio} </p>
              </Grid.Column>

              <Grid.Column width={5} textAlign='left'>
                <Header as="h1" style={{marginBottom: '1em'}}>Information du Salon</Header>
                <p style={{marginBottom: '2em'}}><Icon name='clock'/> <b>Horaire Aujourd'hui:</b> { salonDetails.allSalons.horaire.length > 0 ? salonDetails.horaire[0].Ouverture + '-' +  salonDetails.horaire[0].Fermeture : "Fermé aujourd'hui"}</p>
                <p style={{marginBottom: '2em'}}><Icon name='mail' /> <b>Email:</b> {salonDetails.allSalons.salon[0].Email}</p>
                <p style={{marginBottom: '2em'}}><Icon name='phone' /> <b>Telephone:</b> {salonDetails.allSalons.salon[0].telephoneSalon}</p>
                <p style={{marginBottom: '2em'}}><Icon name='map marker alternate' /> <b>Adresse:</b> {salonDetails.allSalons.salon[0].adresse}</p>

                <Button color='blue' circular onClick={() => setShowPopup(true)}> Prendre RDV </Button>

                {showPopup && (
                  <Popup
                    open
                    onClose={handelPopupClose}
                    trigger={<span> </span>}
                    position='bottom center'
                    style={{ maxWidth: '900px', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}
                  >
                  {serviceChoisi ? (
                    coiffeurChoisi ? (
                        dateChoisi ? (
                          <>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-2.5em' }}>
                            <Button icon='close' onClick={handelPopupClose} circular style={{ background: 'none', border: 'none', boxShadow: 'none', color: '#999999', padding: '0' }} />
                          </div>
                          <Header as="h1" style={{marginBottom: '0.5em', fontSize: '2.5em'}}>Selectionner une heure</Header>
                          <Grid columns={3}>
                            {coiffeurAvailabilityTime.map(heure => (
                              <Grid.Column key={heure}>
                                <Button style={{ marginBottom: '5px', marginRight: '-4em' }} key={heure} onClick={() => {handleReserverPlace(heure)}} circular color='blue'>{heure}</Button>
                              </Grid.Column>
                            ))}
                          </Grid>
                        </>
                        ) : (
                          <>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-2.5em' }}>
                              <Button icon='close' onClick={handelPopupClose} circular style={{ background: 'none', border: 'none', boxShadow: 'none', color: '#999999', padding: '0' }} />
                            </div>
                            <Header as="h1" style={{marginBottom: '0.5em', fontSize: '2.5em'}}>Selectionner une date</Header>
                            <Grid columns={3}>
                              {coiffeurAvailability.map(({ DateDispo, debutShift, finShift, PauseDebut, PauseFin }) => (
                                <Grid.Column key={DateDispo}>
                                  <Button style={{ marginBottom: '5px', marginRight: '-3em' }} key={DateDispo} onClick={() => {handleHeureDispo(DateDispo, debutShift, finShift, PauseDebut, PauseFin)}} circular color='blue'>{DateDispo}</Button>
                                </Grid.Column>
                              ))}
                            </Grid>
                          </>
                        )
                    ) : (
                      <>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                        <Button icon='close' onClick={handelPopupClose} circular style={{ background: 'none', border: 'none', boxShadow: 'none', color: '#999999', padding: '0' }} />
                      </div>
                      <Header as="h1" style={{marginBottom: '0.5em', fontSize: '2.5em'}}>Selectionner un coiffeur</Header>
                      <Select placeholder='Seleccionner un coiffeur'
                        options={coiffeurs.map(coiffeur => ({
                          key: coiffeur.iDCoiffeur,
                          value: coiffeur.iDCoiffeur,
                          text: `${coiffeur.PrenomCoiffeur} ${coiffeur.NomCoiffeur}`,
                          content: (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              {/* <Image src={'/img/Default_A_modern_banner_for_a_barbershop_web_site_in_hd_withou_3.jpg'} circular size='small' style={{ marginRight: '10px' }} /> */}
                              <span>{coiffeur.PrenomCoiffeur} {coiffeur.NomCoiffeur}</span>
                            </div>
                          )
                        }))}
                        value={selectedCoiffeurId}
                        onChange={(e, { value }) => {
                          if (value !== null) {
                            setSelectedCoiffeurId(value);
                          }
                        }}
                      />
                      <Button style={{marginBottom: '0.5em', marginLeft: '4em'}} color='blue' onClick={handleDateDispoCoiffeur}>Continuer</Button>
                   </>
                    )
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <Button icon='close' onClick={handelPopupClose} circular style={{ background: 'none', border: 'none', boxShadow: 'none', color: '#999999', padding: '0' }} />
                      </div>
                      <Header as="h1" style={{marginBottom: '0.5em', fontSize: '2.5em'}}>Selectionner un service</Header>
                      <Select placeholder='Seleccionner un service'
                      options={services.map(service => ({ key: service.idService, value: service.idService, text: `${service.nom} - Prix: ${service.prix}$ - Durée: ${service.duree}` }))}
                      onChange={(e, { value }) => setSelectedServiceId(value)} />
                    
                    <Button style={{marginBottom: '0.5em', marginLeft: '4em'}} color='blue' onClick={() => setserviceChoisi(true)  }>Continuer</Button>
                    </>
                  )}
                  </Popup>
                )}
              
                <Button color='red' circular onClick={handleToggleFavorite}>
                  {isFavorite ? 'Enlever des favoris' : 'Ajouter à mes Favoris'}
                </Button>

              </Grid.Column>
              
              <Grid.Column width={16} textAlign='left'>
                <Header as="h1">Images</Header>
                <Grid stackable columns={5}>
                    {photos.map((photo, index) => {
                        return(
                            <Grid.Column key={index}>
                                <Image style={{height:'200px', borderRadius: '50px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'}} src={photo.url} fluid />
                            </Grid.Column>
                        )
                })}
                </Grid>
                
              </Grid.Column>

              <Grid.Column width={16} textAlign='left'>
                <Header as="h1">Reviews</Header>
                <Button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  icon='chevron left'
                  circular
                />
                <Button
                  disabled={salonDetails.allSalons.reviews.length <= page * reviewsPerPage}
                  onClick={() => setPage(page + 1)}
                  icon='chevron right'
                  circular
                  style={{marginBottom: "2em"}}
                />
                {getCurrentReviews().map((review, index) => (
                  <div key={index} style={{ marginBottom: '2em' }}>
                    <Rating icon='star' rating={review.etoiles} maxRating={5} disabled />
                    <p>{review.commentaire}</p>
                  </div>
                ))}
                
                <Form style={{marginBottom: "2em"}}>
                  <Form.Field>
                    <Label>Notez le salon</Label>
                    <Rating icon='star' maxRating={5} onRate = {(e, {rating}) => {setEtoilesClient(rating)}} />
                  </Form.Field>
                  <Form.Field>
                    <Label>Commentaire</Label>
                    <TextArea onChange = {(e) => {setCommentaireClient(e.target.value)}}/>
                  </Form.Field>
                  <Button color='blue' circular onClick={handleDonnerAvis}>Donner votre avis</Button>
                </Form>
              </Grid.Column>

            </Grid>
          </Segment>
        </>
      )}
    </Container>
  );
};

export default DetailsSalon;
