
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Header, Image, Grid, Card, Dropdown } from 'semantic-ui-react';
import Jackpot from './Jackpot'; 

const Jeux = () => {
    const [pays, setPays] = useState([]);
    const [currentCountry, setCurrentCountry] = useState(null);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [compQst, setCompQst] = useState(0);
    const [showCountryInfo, setShowCountryInfo] = useState(false);
    const [selectedCountryInfo, setSelectedCountryInfo] = useState(null); 
    const [selectedRegion, setSelectedRegion] = useState(null); 
    const [showJackpot, setShowJackpot] = useState(false); 
    const [counter, setCounter] = useState(0);
    const questionsTotales = 5;
    const audioRef = useRef(null); 
    const navigate = useNavigate();
    function numQstControl() {return questionsTotales - counter} 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                setPays(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (score === questionsTotales) {
            setShowJackpot(true);
            const timeout = setTimeout(() => {
                setShowJackpot(false);
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [score]);

    useEffect(() => {
            return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, [compQst]);

    const regionOptions = [
        { key: 'all', value: 'all', text: 'Toutes les régions' }, 
        ...[...new Set(pays.map(country => country.region))].map(region => ({key: region, value: region, text: region})),
    ];

    console.log("regionOptions: ",regionOptions) 
    
    const handleRegionChange = (e, { value }) => {
        setSelectedRegion(value);
        paysRandom(value);
    };

    const paysRandom = (region) => {
        let filteredPays = pays;
        if (region && region !== 'all') {
            filteredPays = pays.filter(country => country.region === region);
        }

        const randomIndex = Math.floor(Math.random() * filteredPays.length);
        const selectedCountry = filteredPays[randomIndex];
        setCurrentCountry(selectedCountry);

        const incorrectCountries = [];
        while (incorrectCountries.length < 3) {
            const randomIncorrectIndex = Math.floor(Math.random() * filteredPays.length);
            const randomIncorrectCountry = filteredPays[randomIncorrectIndex];
            if (randomIncorrectCountry.name.common !== selectedCountry.name.common && !incorrectCountries.some(country => country.name.common === randomIncorrectCountry.name.common)) {
                incorrectCountries.push(randomIncorrectCountry);
            }
        }

        const options = [...incorrectCountries, selectedCountry].sort(() => Math.random() - 0.5);
        setOptions(options);
       
        setCompQst(0);
    };

    const handleOptionClick = async (option, e) => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        if (numQstControl() === 0 ){
            handlePlayAgain()
        }else{ 
            setCounter(counter + 1); 
            if (option.name.common === currentCountry.name.common) {
                e.target.style.background = '#21ba45'
                setScore(prevScore => prevScore + 1);
            } else {e.target.style.background = 'red'} 
            setCompQst(compQst + 1);
            setTimeout(() => {
                if (questionNumber < questionsTotales - 1) {
                    setQuestionNumber(questionNumber + 1);
                    e.target.style.background = ''
                    paysRandom(selectedRegion);
                    setShowCountryInfo(true);
                    setSelectedCountryInfo(currentCountry);
                } else {
                    setShowCountryInfo(true);
                    setSelectedCountryInfo(currentCountry);
                }
            }, 750); 
        };
    }

    const playNationalAnthem = (cca2) => {
        try {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            const audio = new Audio(`https://nationalanthems.info/${cca2.toLowerCase()}.mp3`);
            audioRef.current = audio;
            audioRef.current.play()
                .catch(error => {
                    console.error('Erreur lors de la lecture de l\'hymne national', error);
                    alert(`[-] Désolé, il n'y a pas d'hymne disponible pour ce pays dans le système.`);
                });
            
        } catch (error) {
            console.error('Erreur lors du chargement de l\'hymne national :', error);
        }
    };
    
    const handlePlayAgain = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setScore(0);
        setQuestionNumber(0);
        setCompQst(0);
        setShowCountryInfo(false);
        setCurrentCountry(null);
        setSelectedRegion(null);
        setSelectedCountryInfo(null);
        setCounter(0); 
    };

    return (
        <Container style={{marginTop: '50px', display: 'flex', flexDirection:'column', alignItems: 'center'}}>
            {!selectedRegion ? (
                <div>
                    <Header as='h3'>Choisissez une région:</Header>
                    <Dropdown
                        placeholder='Sélectionner une région'
                        fluid
                        selection
                        options={regionOptions}
                        onChange={handleRegionChange}
                    />
                </div>
            ) : (
                <React.Fragment>
                    <Header as='h1' style={{fontSize: '4em'}}>À quel pays appartient le drapeau ?</Header>
                    {showJackpot && <Jackpot />} 
                    {currentCountry && (
                        <Grid columns={2} stackable>
                            <Grid.Column>
                                <Image size='big' src={currentCountry.flags.png} alt="Flag" />
                                <Header as='h2'>Score: {score}</Header>
                                <Header as='h2'>Questions restantes: {numQstControl()}/{questionsTotales} </Header>

                                <Button onClick={() => navigate('/')}>Accueil</Button>
                                <Button onClick={() => navigate('/entrainement')}>Entrainement</Button>
                                {(score === questionsTotales || questionNumber === questionsTotales - 1) && (
                                    <Button onClick={handlePlayAgain}>Rejouer</Button>
                                )}
                            </Grid.Column>
                            <Grid.Column>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {options.map(option => (
                                        <Button size='big' style={{marginBottom: '1em'}} key={option.name.common} onClick={(e) => handleOptionClick(option, e)}>
                                            {option.name.common}
                                        </Button>
                                    ))}
                                </div>
                                {showCountryInfo && selectedCountryInfo && (
                                    <Card style={{ width: '100%' }}>
                                        <Card.Content>
                                            <Card.Header>Informations sur {selectedCountryInfo.name.common}</Card.Header>
                                            <Card.Meta>Flag: <Image size='tiny' src={selectedCountryInfo.flags.png} alt="Flag" /></Card.Meta>
                                            <Card.Description>
                                                <p><strong>Nom: </strong>{selectedCountryInfo.name.common}</p>
                                                {selectedCountryInfo.capital && <p><strong>Capital: </strong>{selectedCountryInfo.capital}</p>}
                                                {selectedCountryInfo.area && <p><strong>Surface du pays: </strong>{selectedCountryInfo.area}Km/quarres</p>}
                                                {selectedCountryInfo.population && <p><strong>Population: </strong>{selectedCountryInfo.population}</p>}
                                                {selectedCountryInfo.languages && <p><strong>Languages: </strong>{Object.values(selectedCountryInfo.languages).join(', ')}</p>}
                                                <Button onClick={() => playNationalAnthem(selectedCountryInfo.cca2)}>Jouer l'hymne national</Button>
                                                <Button href={selectedCountryInfo.maps.googleMaps} target="_blank">Voir sur Google Maps</Button>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                )}
                            </Grid.Column>
                        </Grid>
                    )}
                </React.Fragment>
            )}

        </Container>
    );
};

export default Jeux;