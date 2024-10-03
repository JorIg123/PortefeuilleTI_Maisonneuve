
import React, { useState, useEffect } from 'react';
import { Card, Icon, Rating, Loader, Message, Container, Pagination, Header } from 'semantic-ui-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AvisCoiffeur = ({ idCoiffeur }) => {
    const [avis, setAvis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;

    const { salonID } = useParams();

    useEffect(() => {
        const fetchAvis = async () => {
            try {
                const response = await axios.get('http://localhost:3000/voirAvisParidSalonCoiffure', {
                    params: { idSalonCoiffure: salonID }
                });
                console.log(response.data);
                setAvis(response.data);
                setLoading(false);
            } catch (error) {
                setError('Erreur lors du chargement des avis');
                setLoading(false);
            }
        };

        fetchAvis();
    }, [idCoiffeur]);

    // Get current avis
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentAvis = avis.slice(indexOfFirstCard, indexOfLastCard);

    // Change page
    const handlePaginationChange = (e, { activePage }) => {
        setCurrentPage(activePage);
    };

    if (loading) {
        return <Loader active />;
    }

    if (error) {
        return <Message negative>{error}</Message>;
    }
console.log('MMM', currentAvis)
    return (
        
        <Container style={{ marginTop: '8em', marginBottom: '6em'}}>
        <Header as="h1" style={{ fontSize: '5em', marginBottom: '0.5em', textAlign: 'center'}}>Vos Avis </Header>

            <Card.Group style={{display: 'flex', justifyContent: 'center'}}>
                {currentAvis.map(aviso => (
                    <Card key={aviso.AvisId}>
                        <Card.Content>
                            <Card.Header>{aviso.commentaire}</Card.Header>
                            <Card.Meta>
                                <Rating icon='star' rating={aviso.etoiles} maxRating={5} disabled />
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name='user' />
                            {aviso.PrenomClient} {aviso.NomClient}
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Pagination
                style={{ marginTop: '2em', marginBottom: '6em', marginLeft: '8em' }}
                activePage={currentPage}
                onPageChange={handlePaginationChange}
                totalPages={Math.ceil(avis.length / cardsPerPage)}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
            />
        </Container>
    );
};

export default AvisCoiffeur;
