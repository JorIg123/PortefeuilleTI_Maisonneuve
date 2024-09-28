
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Label, Segment } from "semantic-ui-react";

const Pays = () => {
    const { codePays } = useParams();
    const [pays, setPays] = useState([]);

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/alpha/${codePays}`)
            .then((response) => response.json())
            .then((data) => setPays(data))
            .catch((erreur) => console.log(erreur))
    }, [codePays]);

    if (pays.length === 0) {
        return null;
    }

    return (
        <div>
            <Container>
                <h1>{pays[0].name.common}</h1>
                <Segment>{pays[0].subregion}</Segment>
                <img alt="drapeau" src={pays[0].flags.png} style={{ width: 130, border: "1px solid grey" }} />
                <p>Superficie : {pays[0].area}m2</p>
                <p>Population : {pays[0].population} habitants</p>
                <p>Latitude : {pays[0].latlng[0]} - longitude : {pays[0].latlng[1]}</p>
                <div>
                    {pays[0].borders ?
                        pays[0].borders.map((frontalier) => <Label key={frontalier}>
                            <Link to={`/pays/${frontalier}`}>{frontalier}</Link>
                        </Label>)
                        : undefined}
                </div>
            </Container>
        </div>
    )
};

export default Pays;
