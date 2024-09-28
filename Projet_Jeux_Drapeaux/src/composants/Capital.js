
import React, { useState, useEffect } from "react";
import { Button, Card, Container, Image, Dropdown, Label } from "semantic-ui-react";

const Capital = () => {
    const [capital, setCapital] = useState("");
    const [countryData, setCountryData] = useState(null);

    const options = [
        { key: "Panama", text: "Panama", value: "Panama" },
        { key: "Bogota", text: "Bogota", value: "Bogota" },
        { key: "Moscow", text: "Moscow", value: "Moscow" },
        { key: "Beijing", text: "Beijing", value: "Beijing" },
        { key: "Brasilia", text: "Brasilia", value: "brasilia" },
        { key: "Washington_dc", text: "Washington D.C.", value: "Washington" },
        { key: "Canberra", text: "Canberra", value: "Canberra" },
        { key: "New_Delhi", text: "New Delhi", value: "New Delhi" },
        { key: "Ottawa", text: "Ottawa", value: "Ottawa" },
        { key: "buenos_aires", text: "Buenos Aires", value: "Buenos Aires" },
        { key: "Jakarta", text: "Jakarta", value: "Jakarta" },
        { key: "Ciudad_de_Mexico", text: "Ciudad de México", value: "Mexico" },
        { key: "Tokyo", text: "Tokyo", value: "Tokyo" },
        { key: "Riyadh", text: "Riyadh", value: "Riyadh" },
        { key: "Cairo", text: "Cairo", value: "Cairo" },
        { key: "Pretoria", text: "Pretoria", value: "Pretoria" },
        { key: "Ankara", text: "Ankara", value: "Ankara" },
        { key: "Paris", text: "Paris", value: "Paris" },
        { key: "Lima", text: "Lima", value: "Lima" },
        { key: "Port-au-Prince", text: "Port-au-Prince", value: "Port-au-Prince" },
        { key: "Wellington", text: "Wellington", value: "Wellington" },
        { key: "Athens", text: "Athens", value: "Athens" },
        { key: "Helsinki", text: "Helsinki", value: "Helsinki" },
        { key: "Berlin", text: "Berlin", value: "Berlin" },
        { key: "Tegucigalpa", text: "Tegucigalpa", value: "Tegucigalpa" },
        { key: "Reykjavik", text: "Reykjavik", value: "Reykjavik" },
        { key: "London", text: "London", value: "London" },
        { key: "San Jose", text: "San Jose", value: "San Jose" },
        { key: "Santo Domingo", text: "Santo Domingo", value: "Santo Domingo" },
        { key: "Havana", text: "Havana", value: "Havana" },
        { key: "Santiago", text: "Santiago", value: "Santiago" },
        { key: "Budapest", text: "Budapest", value: "Budapest" },
        { key: "Jerusalem", text: "Jerusalem", value: "Jerusalem" },
        { key: "Rome", text: "Rome", value: "Rome" },
        { key: "Manila", text: "Manila", value: "Manila" }, 
        { key: "Seoul", text: "Seoul", value: "Seoul" },
        { key: "Madrid", text: "Madrid", value: "Madrid" },
        { key: "Warsaw", text: "Warsaw", value: "Warsaw" },
        { key: "Pyongyang", text: "Pyongyang", value: "Pyongyang" },
        { key: "Asunción", text: "Asunción", value: "Asunción" },
        { key: "Lisbon", text: "Lisbon", value: "Lisbon" },
        { key: "Dakar", text: "Dakar", value: "Dakar" },
        { key: "Belgrade", text: "Belgrade", value: "Belgrade" },
        { key: "Singapore", text: "Singapore", value: "Singapore" },
        { key: "Stockholm", text: "Stockholm", value: "Stockholm" },
        { key: "Damascus", text: "Damascus", value: "Damascus" },
        { key: "Doha", text: "Doha", value: "Doha" },
        { key: "Freetown", text: "Freetown", value: "Freetown" },
        { key: "Bratislava", text: "Bratislava", value: "Bratislava" },
        { key: "Mogadishu", text: "Mogadishu", value: "Mogadishu" },
        { key: "Taipei", text: "Taipei", value: "Taipei" },
        { key: "Dodoma", text: "Dodoma", value: "Dodoma" },
        { key: "Bangkok", text: "Bangkok", value: "Bangkok" },
        { key: "Port of Spain", text: "Port of Spain", value: "Port of Spain" },
        { key: "Tunis", text: "Tunis", value: "Tunis" },
        { key: "Hanoi", text: "Hanoi", value: "Hanoi" },
        { key: "Montevideo", text: "Montevideo", value: "Montevideo" },
        { key: "Kyiv", text: "Kyiv", value: "Kyiv" },
        { key: "Bern", text: "Bern", value: "Bern" },
        { key: "Bucharest", text: "Bucharest", value: "Bucharest" },
        { key: "Oslo", text: "Oslo", value: "Oslo" },
    ];

    const fetchCountryData = async (capital) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/capital/${capital}?fields=languages,name,region,currencies,maps,flags,coatOfArms`);
            const data = await response.json();
            setCountryData(data[0]);
        } catch (error) {
            console.error("Error fetching country data:", error);
        }
    };

    const handleDropdownChange = (_, { value }) => {
        setCapital(value);
        fetchCountryData(value);
    };

    useEffect(() => {
        if (capital) {
            fetchCountryData(capital);
        }
    }, [capital]);

    return (
        <Container>
            <br /><h1>Information sur le pays dont la capitale est :</h1>
            <Dropdown
                placeholder="Sélectionnez une capitale"
                fluid
                selection
                options={options}
                onChange={handleDropdownChange}
                value={capital}
            />
            {countryData && (
                <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", width: "100%" }}>
                        <h2>Pays: {countryData.name.common}</h2>
                        <div style={{ marginRight: "10px" }}>
                            <Label>Flag:</Label><br /><br />
                            <Card key={`CardNb1-${countryData.name}`}>
                                
                                <Image src={countryData.flags.png} /><br /><br />
                            </Card>
                        </div>
                        <div>
                            <Label>Coat Of Arms:</Label><br /><br />
                            <Card key={`CardNb2-${countryData.name}`}>
                                <Image src={countryData.coatOfArms.png} />
                            </Card>
                        </div>
                    </div>
                    <Label>Region: {countryData.region}</Label>
                    <Label>Languages: {Object.values(countryData.languages).join(", ")}</Label>
                    <Label>Monnaie: {Object.values(countryData.currencies)[0].name}</Label><br /><br />
                    <Button href={countryData.maps.googleMaps} target="_blank">Voir sur Google Maps</Button>
                </div>
            )}
        </Container>
    );

};
export default Capital;

