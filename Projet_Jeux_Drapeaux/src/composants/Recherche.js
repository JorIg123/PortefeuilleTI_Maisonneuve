
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container, Image, Input, Label } from "semantic-ui-react";

const Recherche = (props) => {
    const [nom, setNom] = useState("");
    const [pays, setPays] = useState([]);

    const onClick = () => {
        fetch(`https://restcountries.com/v3.1/name/${nom}?fields=cca3,name,flags`)
        .then((response) => response.json())
        .then((data) => setPays(data))
        .catch((erreur) => console.log(erreur));
    };

    const renderPays = () => {
        return pays.map((mohsen) => {
            return (
                <Card key={mohsen.cca3}>
                    <Image src={mohsen.flags.png} />
                    <Card.Content>
                        <Card.Header>
                            <Link to={`/pays/${mohsen.cca3}`}>{mohsen.name.common}</Link>
                        </Card.Header>
                    </Card.Content>
                </Card>
            );
        });
    };

    return (
        <Container>
            <h1>Rechercher</h1>
            <Label pointing="right">Pays</Label>
            <Input type="text" value={nom} onChange={(e) => setNom(e.target.value)}></Input>
            <Button onClick={onClick}>Rechercher le pays</Button>
            <h2> Résultats de la recherche : </h2>
            {pays.length > 0 ? `Il y a ${pays.length} résulat(s)` : undefined}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", width: "100%" }}>
                {pays.length > 0 ? renderPays() : undefined}
            </div>
        </Container>
    );
};

export default Recherche;
