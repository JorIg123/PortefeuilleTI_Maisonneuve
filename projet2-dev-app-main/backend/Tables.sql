-- SQLite
--Travail fait par Jorge/Alejandro
-- Create a new table called 'Avis' in schema '
-- Drop the table if it already exists
IF OBJECT_ID('Avis', 'U') IS NOT NULL
DROP TABLE Avis
GO
-- Create the table in the specified schema
CREATE TABLE Avis
(
    AvisId INTEGER primary key autoincrement,
    idClient integer not null,
    idSalonCoiffure integer not null,
    etoiles integer not null,
    commentaire text,
    CONSTRAINT FK_CLient_AVis FOREIGN KEY(idClient) REFERENCES Client(idCLIENT),
    CONSTRAINT FK_Salon_AVis FOREIGN KEY(idSalonCoiffure) REFERENCES SalonCoiffure(idSalon)
);
GO
----------------------------------------------------------------------------------------------------------

    CREATE TABLE Blacklist
(
    idToken integer PRIMARY KEY autoincrement,
    token varchar(512) not null
);

    -------------------------------------------------------------------------------------------------------------------
drop table CLient
    --Travail fait par Jorge/Alejandro
    create table Client
(
    IDclient integer PRIMARY KEY AUTOINCREMENT,
    PrenomClient varchar(50) not null,
    NomClient varchar(50) not null,
    photoProfil text not null,
    Email varchar(50) not null unique ,
    MotDePasse varchar(128) not null
)

    -----------------------------------------------------------------------------------------------------------------------

    --Travail fait par Jorge/Alejandro
create table Coiffeur
(
    iDCoiffeur INTEGER primary KEY AUTOINCREMENT,
    IDSalon INTEGER,
    PrenomCoiffeur varchar(50) not null,
    NomCoiffeur varchar(50) not null,
    Email varchar(50) not null unique,
    PhotoCoiffeur varchar(50),
    MotDePasse varchar(128) not null,
    FOREIGN KEY(idSalon) REFERENCES SalonCoiffure(idSalon)
)

--------------------------------------------------------------------------------------------------------------------------
--Travail fait par Jorge/Alejandro
create table SalonFavoris
(
    idFavoris INTEGER PRIMARY KEY AUTOINCREMENT,
    idClient INTEGER, 
    idSalon INTEGER,
    FOREIGN KEY(idClient) references Client(idCLIENT),
    FOREIGN KEY(idSalon) references SalonCoiffure(idSalon)
)

--------------------------------------------------------------------------------------------------------------------------
--Travail fait par Jorge/Alejandro
create table DisponibiliteCoiffeur
(
    idDispoC INTEGER primary KEY AUTOINCREMENT,
    idCoiffeur INTEGER,
    idDispoS INTEGER,
    debutShift time not null,
    finShift time not null,
    PauseDebut TIME not null,
    PauseFin TIME not null,
    CONSTRAINT FK_DispCoiff_idCoiffeur FOREIGN KEY(idCoiffeur) REFERENCES Coiffeur(IDCoiffeur),
    CONSTRAINT FK_DispCoiff_idDispoS FOREIGN KEY(idDispoS) REFERENCES DisponibiliteSalon(idDispoS)
)

--------------------------------------------------------------------------------------------------------------------------

--Travail fait par Jorge/Alejandro
create table RendezVous
(
    idRDV INTEGER PRIMARY KEY autoincrement,
    idSalonCoiffure INTEGER,
    idClient INTEGER,
    idService INTEGER,
    idCoiffeur INTEGER,
    dateRDV Date not null,
    heure TIME not null,
    FOREIGN KEY(idSalonCoiffure) references SalonCoiffure(IDSalon),
    FOREIGN KEY(idClient) references Client(idCLIENT),
    FOREIGN KEY(idService) references Services(idService ),
    FOREIGN KEY(idCoiffeur) references Coiffeur(IDCoiffeur)
)

-------------------------------------------------------------------------------------------------------------------------------
drop table SalonCoiffure
--Travail fait par Jorge/Alejandro
create table SalonCoiffure
(
    idSalon integer primary key autoincrement,
    nomSalon varchar(50) not null,
    telephoneSalon varchar(50) not null,
    adresse varchar(50) not null,
    bio text,
    PhotoSalon varchar(100),
    Email varchar(50) not null UNIQUE,
    MotDePasse varchar(128) not null
)

------------------------------------------------------------------------------------------------------------------------------
drop table PhotosSalon
create table PhotosSalon 
(
    idPhoto integer primary key autoincrement,
    SalonId integer,
    picture varchar(100),
    foreign key(SalonId) REFERENCES SalonCoiffure(idSalon)
)

-------------------------------------------------------------------------------------------------------------------------------

create table Services
(
    idService integer primary key autoincrement,
    idSalon integer not null,
    nom varchar(50) not null,
    prix FLOAT,
    duree TIME,
    FOREIGN KEY(idSalon) REFERENCES SalonCoiffure(idSalon)
)

------------------------------------------------------------------------------------------------------------------------------------

create table DisponibiliteSalon
(
    idDispoS INTEGER primary KEY AUTOINCREMENT,
    idSalon INTEGER,
    DateDispo date not null,
    Ouverture time not null,
    Fermeture time not null,
    CONSTRAINT FK_DispSalon_idSalon FOREIGN KEY(idSalon) REFERENCES SalonCoiffure(idSalon)
)