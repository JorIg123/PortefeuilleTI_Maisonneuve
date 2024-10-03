import React from 'react';
import { Container, Header, Card, Image, Grid, Segment } from 'semantic-ui-react';

const AccueilClient = () => {

    return (
        <div>
            <Segment
                textAlign='center'
                style={{
                    minHeight: '100vh',
                    padding: '0em 0em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none'
                }}
            >
            <div style={{ flex: '1', overflow: 'hidden', height: '100vh' }}>
                <img src='/img/backgroundlogin.jpg' alt='background' style={{ width: '100%', height: '100%', objectFit: 'cover',
                        marginTop: '-0em', }} />
            </div>
            <Container text style={{ flex: '1', background: 'gray', height: '100vh'  }}>
                <Header
                    as='h1'
                    content='Découvrez EL BARBER'
                    inverted
                    style={{
                        fontSize: '6em',
                        fontWeight:'bold',
                        marginBottom: 'auto',
                        marginTop: 'auto',
                        fontFamily: 'Poppins, sans-serif',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        paddingTop: '1.2em'
                    }} 
                />
                
                <Header
                    as='h2'
                    content="Votre nouveau compagnon pour des cheveux heureux et un style impeccable! "
                    style={{ fontSize: '2.5em', fontWeight: 'normal', marginTop: '2em', color: 'white',  }}
                />
                <Header
                    as='h3'
                    content="Parcourez notre sélection de coiffures tendance, réservez votre rendez-vous en ligne en toute simplicité, et profitez d'un service de qualité garanti. Chez EL BARBER, nous mettons en avant votre beauté et votre bien-être. Alors, ne tardez plus, réservez dès maintenant et laissez-vous chouchouter !"
                    inverted
                    style={{ fontSize: '1.5em', fontWeight: 'normal', marginTop: '4em', color:'white' }}
                />
            </Container>
        </Segment>

        <Segment vertical style={{ minHeight: '50vh',padding: '4em 0em' }}>
          <Container textAlign="center">
            <Header as="h3" style={{ fontSize: '5em', paddingBottom: '1em' }}>Découvrez nos coiffeurs professionnels</Header>
            <Card.Group centered>

                <Card style={{ width: '80%', maxWidth: '800px', marginBottom: '3%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Image src="/img/Default_A_modern_banner_for_a_barbershop_web_site_in_hd_withou_3.jpg" style={{ borderRadius: '10px 0 0 10px' }} />
                        </Grid.Column>
                        <Grid.Column>
                            <Card.Description>
                                <p style={{ fontSize: '2.5em', padding: '2em' }}>Talentueux</p>
                            </Card.Description>
                        </Grid.Column>
                    </Grid>
                </Card>

                <Card style={{ width: '80%', maxWidth: '800px', marginBottom: '3%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Image src="/img/Default_A_modern_banner_for_a_barbershop_web_site_in_hd_withou_2.jpg" style={{ borderRadius: '10px 0 0 10px' }} />
                        </Grid.Column>
                        <Grid.Column>
                            <Card.Description>
                                <p style={{ fontSize: '2.5em', padding: '2em' }}>Passionnés</p>
                            </Card.Description>
                        </Grid.Column>
                    </Grid>
                </Card>

                <Card style={{ width: '80%', maxWidth: '800px', marginBottom: '3%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Image src="/img/Default_A_modern_banner_for_a_barbershop_web_site_in_hd_withou_1.jpg" style={{ borderRadius: '10px 0 0 10px' }} />
                        </Grid.Column>
                        <Grid.Column>
                            <Card.Description>
                                <p style={{ fontSize: '2.5em', padding: '2em' }}>Professionnels</p>
                            </Card.Description>
                        </Grid.Column>
                    </Grid>
                </Card>
            </Card.Group>
          </Container>
        </Segment>

        <Segment vertical style={{ minHeight: '50vh', padding: '4em 0em', background: 'gray', display: 'flex', alignItems: 'center' }}>
            <Container textAlign="center">
                <Header as="h3" style={{ fontSize: '5em', paddingBottom: '1em' }}>Réservez facilement en ligne</Header>
                <Card style={{ width: '80%', maxWidth: '800px', margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <Image src="/img/Default_A_sleek_cuttingedge_barbershop_banner_in_high_definiti_0.jpg" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                    <Card.Description>
                        <p style={{ fontSize: '2em', padding: '1em' }}>Notre application vous permet de trouver et de réserver facilement un rendez-vous dans les meilleurs salons de votre région.</p>
                    </Card.Description>
                </Card>
            </Container>
        </Segment>

        <Segment vertical style={{ minHeight: '50vh', padding: '4em 0em', background: 'white', display: 'flex', alignItems: 'center' }}>
          <Container textAlign="center">
            <Header as="h3" style={{ fontSize: '5em', paddingBottom: '1em' }}>Profitez d'offres exclusives</Header>
                <Card style={{ width: '70%', maxWidth: '800px', margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <Image src="/img/Barbediscount.jpg" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                    <Card.Description>
                        <p style={{ fontSize: '2em', padding: '1em' }}>Profitez de promotions exclusives et de remises spéciales réservées aux utilisateurs de notre application.</p>
                    </Card.Description>
                </Card>
          </Container>
        </Segment>
        
        <Segment vertical style={{ minHeight: '50vh', padding: '4em 0em', background: 'gray', display: 'flex', alignItems: 'center' }}>
          <Container textAlign="center">
            <Header as="h3" style={{ fontSize: '5em', paddingBottom: '1em' }}>Recevez des rappels de rendez-vous</Header>
            <Card style={{ width: '80%', maxWidth: '800px', margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <Image src="/img/Default_a_image_for_marketing_a_Never_miss_an_appointment_agai_1.jpg" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                    <Card.Description>
                        <p style={{ fontSize: '2em', padding: '1em' }}>Ne manquez plus jamais un rendez-vous. Recevez des rappels automatiques et des notifications pour vous assurer d'être toujours à l'heure pour votre rendez-vous de coiffure.</p>
                    </Card.Description>
            </Card>
          </Container>
        </Segment>
      </div>
    )
}

export default AccueilClient