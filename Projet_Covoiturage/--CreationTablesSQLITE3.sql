-- Table Utilisateurs
CREATE TABLE Utilisateurs (
    idUtilisateur INTEGER PRIMARY KEY AUTOINCREMENT,
    prenom TEXT NOT NULL,
    nom TEXT NOT NULL,
    adresse TEXT NOT NULL,
    adresseCourriel TEXT NOT NULL,
    numeroTelephone TEXT NOT NULL,
    motDePasse TEXT NOT NULL
);

-- Table DeplacementsOfferts
CREATE TABLE DeplacementsOfferts (
    idDeplacement INTEGER PRIMARY KEY AUTOINCREMENT,
    idUtilisateurConducteur INTEGER NOT NULL,
    destination TEXT NOT NULL,
    dateDeplacement DATE NOT NULL,
    heure TIME NOT NULL,
    nbrPlaceDisponible INTEGER NOT NULL CHECK (nbrPlaceDisponible >= 0),
    cout NUMERIC NOT NULL DEFAULT 5.00,
    comptant TEXT NOT NULL,
    interact TEXT NOT NULL,
    precisionDeplacement TEXT DEFAULT '',
    FOREIGN KEY (idUtilisateurConducteur) REFERENCES Utilisateurs(idUtilisateur)
);

-- Table Reservations
CREATE TABLE Reservations (
    idReservation INTEGER PRIMARY KEY AUTOINCREMENT,
    idUtilisateurPassager INTEGER NOT NULL,
    idDeplacement INTEGER NOT NULL,
    FOREIGN KEY (idUtilisateurPassager) REFERENCES Utilisateurs(idUtilisateur),
    FOREIGN KEY (idDeplacement) REFERENCES DeplacementsOfferts(idDeplacement)
);

-- Table DeplacementsDemandes
CREATE TABLE DeplacementsDemandes (
    idDeplacementDemandes INTEGER PRIMARY KEY AUTOINCREMENT,
    idDemandeur INTEGER NOT NULL,
    destinationDemandee TEXT NOT NULL,
    dateDeplacementDemande DATE NOT NULL,
    heureDeplacementDemande TIME NOT NULL,
    precisionDeplacementDemande TEXT DEFAULT '',
    FOREIGN KEY (idDemandeur) REFERENCES Utilisateurs(idUtilisateur)
);
