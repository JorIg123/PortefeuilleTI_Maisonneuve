import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Card, Image, Radio, Button, Form, Header } from "semantic-ui-react";

const Entrainement = () => {
    const [group, setGroup] = useState([]);
    const [flags, setFlags] = useState([]);
    const [randomCountries, setRandomCountries] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState({});
    const [results, setResults] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [reset, setReset] = useState(1);
    const [countCorrect, setCountCorrect] = useState(0);
    const navigate = useNavigate()
    
    useEffect(() => {
        const options = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=flags,name,capital');
                const countries = await response.json();
                
                
                const options = countries.map(country => {
                    return {
                        key: country.name,
                        text: country.name.common,
                        value: country.capital,
                        country: country.name.common, 
                        capital: country.capital, 
                        
                    };
                });
        
                return options;
            } catch (error) {
                console.error('Error al obtener los datos de los países:', error);
                return [];
            }
        };
        
        options().then(options => {
            const getRandomCountries = (array) => {
                const shuffledArray = array.sort(() => 0.5 - Math.random());
                return shuffledArray.slice(0, 6);
            };
        
            const randomGroup = getRandomCountries(options);
            setGroup(randomGroup);
        
            const getCountryFlags = async (randomGroup) => {
                const flagsArray = [];
                for (const country of randomGroup) {
                    try {
                        const response = await fetch(`https://restcountries.com/v3.1/name/${country.text}?fields=flags,name,capital`);
                        const data = await response.json();
                        flagsArray.push({
                            png: data[0].flags.png,
                            name: data[0].name.common
                        });
                    } catch (error) {
                        console.error("Error fetching flag for country:", country.text);
                    }
                }
                return flagsArray;
            };
        
            getCountryFlags(randomGroup).then((flagsArray) => {
                setFlags(flagsArray);
            });
        
            const getRandomCountriesArray = (randomGroup) => {
                const countries = randomGroup.map((country) => country.country);
                const shuffledCountries = countries.sort(() => 0.5 - Math.random());
                return shuffledCountries;
            };
        
            setRandomCountries(getRandomCountriesArray(randomGroup));
        });
    }, [reset]);

    const checkResults = () => {
        let correctCount = 0; 
        const newResults = {};
        group.forEach((country, index) => {
            if (selectedCountries[index] === country.country) {
                correctCount++; 
                newResults[index] = "¡Correct!";
            } else {
                newResults[index] = "Incorrect";
            }
        });
        setCountCorrect(correctCount); 
        setResults(newResults);
        setShowResults(true);
    };

    const handleCountrySelection = (index, country) => {
        setSelectedCountries((prevSelected) => ({ ...prevSelected, [index]: country }));
    };

    const handlePlayAgain = () => {
        setGroup([]);
        setFlags([]);
        setRandomCountries([]);
        setSelectedCountries({});
        setResults({});
        setCountCorrect(0)
        setShowResults(false);
        setReset(reset * (-1)); 
    };

    return (
        
        <Container>
            <Container>
                <Header as='h1' style={{fontSize: '2em', marginBottom: "10px", marginTop: "10px"}}>Choisissez le pays correspondant au drapeau </Header>
            
                <Form onSubmit={checkResults}>
                    <Card.Group>
                        {group.map((country, index) => (
                            <Card key={index}>
                                <Card.Content>
                                    <Card.Header>
                                        <Image src={flags[index]?.png} size="small"/>
                                    </Card.Header>
                                    <div style={{ marginBottom: "5px", marginTop: "5px"}}>
                                        {randomCountries.map((country, i) => (
                                            <div key={i}>
                                                <Radio
                                                    label={country}
                                                    name={`card_${index}`}
                                                    value={country}
                                                    checked={selectedCountries[index] === country} 
                                                    onChange={() => handleCountrySelection(index, country)}
                                                    disabled={showResults}
                                                />
                                                {i < randomCountries.length - 1 && <span>&nbsp;&nbsp;&nbsp;</span>}
                                            </div>
                                            
                                        ))}
                                        
                                       
                                    </div>
                                    <div class="divConEstilo">
                                         {showResults && <div><b>{results[index]}</b></div>}
                                        {showResults && <p>Pays: <b>{country.country}.</b><br></br> Capitale: <b>{country.capital}</b></p>}
                                    </div>
                                    
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                    <Button primary type="submit">Soumettre</Button>
                    {showResults && (<><Button onClick={handlePlayAgain}>Rejouer</Button><Button onClick={() => navigate('/jeux')}>Aller au Jeux</Button></>)}
                </Form>
            </Container>

            <Container>
                    <h1>Nombre de bonnes réponses: {countCorrect}/{group.length} </h1>
                    

            </Container>

        </Container>

       
    );
};

export default Entrainement;
