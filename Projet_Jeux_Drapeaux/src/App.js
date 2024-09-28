
import React from 'react';
import { BrowserRouter, Route, Routes, Link, useMatch } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Accueil from './composants/Accueil';
import Recherche from './composants/Recherche';
import Entrainement from './composants/Entrainement';
import Pays from './composants/Pays';
import Jeux from './composants/Jeux';
import Page404 from './composants/Page404';
import Capitale from './composants/Capital';
import Layout from './composants/Layout'
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './composants/ThemeToggle';

 

function App() {
    return (
        <React.Fragment>
            <div>
                <BrowserRouter>
                    <header>
                        <h2>Menu </h2>
                        <Menu>
                            <MenuItem to="/" label="Accueil" />
                            <MenuItem to="/recherche" label="Barre de Recherche" />
                            <MenuItem to="/pays" label="PAYS" />
                            <MenuItem to="/capitales" label="Capitales" />
                            <MenuItem to="/entrainement" label="Entrainement avant jouer" />
                            <MenuItem to="/jeux" label="Jeux" />
                        </Menu>
                    </header>

                    <Routes>
                        <Route path='' element={<Layout/>}>
                            <Route path="/" element={<Accueil />} />
                            <Route path="/recherche" element={<Recherche />} />
                            <Route path="/pays/:codePays" element={<Pays />} />
                            <Route path="/capitales" element={<Capitale />} />
                            <Route path="/entrainement" element={<Entrainement />} /> 
                            <Route path="/jeux" element={<Jeux />} /> 
                            <Route path="*" element={<Page404 />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '8vh' }}>
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider> 
            </div>


        </React.Fragment>
    );
}

function MenuItem({ to, label }) {
    const match = useMatch(to);

    return (
        <Menu.Item>
            <Link to={to} style={{ color: match ? "red" : "black", fontWeight: match ? "bold" : "normal" }}>
                {label}
            </Link>
        </Menu.Item>
    );
}

export default App;

