import React, { useState, useEffect  } from 'react';
import { Container, Header, Card, Icon, Image } from 'semantic-ui-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomeClient = () => {
    const [favoritedMap, setFavoritedMap] = useState(new Map());
    const [salons, setSalons] = useState([]);
    const { user_id } = useParams();
    console.log(user_id);

    const navigate = useNavigate()

    const toggleFavorite = async (idSalon) => {
        try {
            const isFavorited = favoritedMap.get(idSalon) || false; 
            setFavoritedMap(new Map(favoritedMap.set(idSalon, !isFavorited))); 
            
            let url = '';
            if (isFavorited) {
                url = `http://localhost:3000/deleteSalonFavorisParidClientidSalon`; 

                const response = await fetch(url, {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idClient: user_id,
                        idSalon
                    })
                });
                if (response.ok) {
                    console.log('[+] Favoris efface avec succes');
                } else {
                    console.error('Erreur lors de la supression des favoris', response);
                }
            } else {
                url = 'http://localhost:3000/enregistrerSalonFavoris'; 

                const response = await fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idClient: user_id,
                        idSalon
                    })
                });
                if (response.ok) {
                    console.log('[+] Favoris Enregistrer avec succes');
                } else {
                    console.error('Erreur lors de l ajout des favoris', response);
                }
            }
           
        } catch (error) {
            console.error('Error lors de la ajout/supression des favoris:', error);
        }
    };

    useEffect(() => {
        const fetchSalons = async () => {
            try {
                const responseSalons = await axios.get('http://localhost:3000/getSalons');
                const allSalons = responseSalons.data;
                console.log(allSalons);

                const responseFavoris = await axios.get('http://localhost:3000/voirsalonFavorisParidclient', {
                    params: {
                        idClient: user_id
                    }
                });
                const favoritedSalonIds = responseFavoris.data.map(salon => salon.idSalon);
    
                const updatedFavoritedMap = new Map(favoritedMap);
                allSalons.forEach(salon => {
                    updatedFavoritedMap.set(salon.idSalon, favoritedSalonIds.includes(salon.idSalon));
                });
                console.log(updatedFavoritedMap);
                setFavoritedMap(updatedFavoritedMap);
    
                const listep = await Promise.all(allSalons.map(async (element) => {
                    const nom = element.PhotoSalon;
                    console.log(nom);
    
                    const responseImage = await fetch(`http://localhost:3000/fileSalon/${nom}`);
                    const arrayBuffer = await responseImage.arrayBuffer();
                    const blob = new Blob([arrayBuffer]);
                    const url = URL.createObjectURL(blob);
                    return { url: url }
                }));

                setSalons({allSalons, listep});  
                console.log('Prueba Salones:', salons);          
            } catch (error) {
                console.error('Error lors de l obtention des salons:', error);
            }
        };
    
        fetchSalons();
    }, []);

    return (
        <Container style={{ marginTop: '8em', width: '100%' }}>
            <Header as="h1" textAlign="center" style={{ fontSize: '8em' }}>Salons de Coiffure</Header>
            {salons.allSalons && salons.allSalons.length > 0 && (
        <Card.Group centered style={{ marginTop: '5em', marginBottom: '3em' }}>
            {salons.allSalons.map((salon, index) => {

                return (
                        <Card key={salon.idSalon} style={{ 
                            width: '550px', 
                            height: '400px', 
                            marginRight: '3em', 
                            marginBottom: '7em', 
                            boxShadow: '0 4px 8px rgba(0, 0, 0, .5)'
                            }}
                            onClick={()=>{
                                navigate(`/detailsSalon/${salon.idSalon}`)
                            }}>

                            <Image src={salons.listep[index].url} style={{ height: '350px' }} />

                            <Icon
                                name="circle"
                                color="yellow"
                                size="big"
                                style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '2px',
                                    zIndex: '1'
                                }}
                            />

                            <Icon
                                name={favoritedMap.get(salon.idSalon) ? 'heart' : 'heart outline'}
                                color={favoritedMap.get(salon.idSalon) ? 'red' : 'black'}
                                style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', zIndex: '2' }}
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(salon.idSalon) }}
                            />
                            <Card.Content>
                                <Card.Header>{salon.nomSalon}</Card.Header>
                            </Card.Content>

                        </Card>
                )
            })}
        </Card.Group>
            )}
        </Container>
    );
};


export default HomeClient;
