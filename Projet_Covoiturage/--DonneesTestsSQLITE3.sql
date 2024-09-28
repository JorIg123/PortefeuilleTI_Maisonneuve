-- Insertion des registres dans la table Utilisateurs
INSERT INTO Utilisateurs (prenom, nom, adresse, adresseCourriel, numeroTelephone, motDePasse)
VALUES
('Jean', 'Dupont', '123 Rue Principale', 'jean.dupont@example.com', '5145551234', 'mdp1'),
('Marie', 'Tremblay', '456 Rue Secondaire', 'marie.tremblay@example.com', '5145555678', 'mdp2'),
('Pierre', 'Lavoie', '789 Rue Troisième', 'pierre.lavoie@example.com', '4505559876', 'mdp3'),
('Isabelle', 'Gagnon', '101 Rue Quatrième', 'isabelle.gagnon@example.com', '4505554321', 'mdp4'),
('Luc', 'Leblanc', '222 Rue Cinquième', 'luc.leblanc@example.com', '5145558765', 'mdp5'),
('Sophie', 'Bergeron', '333 Rue Sixième', 'sophie.bergeron@example.com', '4505557890', 'mdp6'),
('Martin', 'Lévesque', '444 Rue Septième', 'martin.levesque@example.com', '5145552345', 'mdp7'),
('Nathalie', 'Fortin', '555 Rue Huitième', 'nathalie.fortin@example.com', '4505556543', 'mdp8'),
('François', 'Gauthier', '666 Rue Neuvième', 'francois.gauthier@example.com', '5145557890', 'mdp9'),
('Caroline', 'Dion', '777 Rue Dixième', 'caroline.dion@example.com', '4505551234', 'mdp10');

-- Insertion des registres dans la table DeplacementsOfferts
INSERT INTO DeplacementsOfferts (idUtilisateurConducteur, destination, dateDeplacement, heure, nbrPlaceDisponible, cout, comptant, interact, precisionDeplacement)
VALUES
(1, 'Saint-Donat', '2024-09-25', '08:00:00', 3, 5.00,'OUI', 'NON', 'Départ à 8h, possibilité d_arrêts'),
(2, 'Sainte-Agathe', '2023-09-26', '09:30:00', 2, 5.00,'OUI', 'NON', 'Départ à 9h30'),
(3, 'Saint-Donat', '2023-09-27', '07:45:00', 1, 5.00,'NON', 'OUI', 'Départ à 7h45, aucun arrêt'),
(4, 'Sainte-Agathe', '2023-09-28', '10:15:00', 4, 5.00,'OUI', 'NON', 'Départ à 10h15'),
(5, 'Saint-Donat', '2023-09-29', '07:30:00', 2, 5.00,'NON', 'OUI', 'Départ à 7h30, arrêts possibles'),
(6, 'Sainte-Agathe', '2023-09-30', '11:00:00', 3, 5.00,'OUI', 'NON', 'Départ à 11h, possibilité d_arrêts'),
(7, 'Saint-Donat', '2023-10-01', '08:15:00', 1, 5.00,'NON', 'OUI', 'Départ à 8h15, pas d_arrêt'),
(8, 'Sainte-Agathe', '2023-10-02', '09:45:00', 2, 5.00,'OUI', 'NON', 'Départ à 9h45'),
(9, 'Saint-Donat', '2023-10-03', '07:00:00', 4, 5.00,'OUI', 'OUI', 'Départ à 7h, arrêts possibles'),
(10, 'Sainte-Agathe', '2023-10-04', '12:30:00', 2, 5.00,'OUI', 'NON', 'Départ à 12h30'),
(1, 'Saint-Donat', '2023-10-05', '08:30:00', 2, 6.00, 'NON', 'OUI', 'Départ à 8h30, pas d_arrêt'),
(2, 'Sainte-Agathe', '2023-10-06', '10:00:00', 3, 6.00,'OUI', 'NON', 'Départ à 10h, arrêts possibles'),
(3, 'Saint-Donat', '2023-10-07', '07:15:00', 1, 6.00, 'OUI', 'OUI', 'Départ à 7h15, possibilité d_arrêts'),
(4, 'Sainte-Agathe', '2023-10-08', '11:30:00', 4, 6.00, 'OUI', 'NON', 'Départ à 11h30'),
(5, 'Saint-Donat', '2023-10-09', '09:00:00', 3, 6.00, 'NON', 'OUI', 'Départ à 9h, arrêts possibles'),
(6, 'Sainte-Agathe', '2023-10-10', '13:00:00', 2, 6.00, 'OUI', 'NON', 'Départ à 13h, possibilité d_arrêts'),
(7, 'Saint-Donat', '2023-10-11', '07:45:00', 1, 6.00,'NON', 'OUI', 'Départ à 7h45, pas d_arrêt'),
(8, 'Sainte-Agathe', '2023-10-12', '08:45:00', 2, 6.00,'OUI', 'NON', 'Départ à 8h45'),
(9, 'Saint-Donat', '2023-10-13', '07:30:00', 3, 6.00,'NON', 'OUI', 'Départ à 7h30, arrêts possibles'),
(10, 'Sainte-Agathe', '2023-10-14', '14:00:00', 1, 6.00,'OUI', 'NON', 'Départ à 14h, pas d_arrêt');

-- Insertion des registres dans la table DeplacementsDemandes
INSERT INTO DeplacementsDemandes (idDemandeur, destinationDemandee, dateDeplacementDemande, heureDeplacementDemande, precisionDeplacementDemande)
VALUES
( 10,'Sainte-Agathe', '2023-10-01', '08:45:00', 'Départ à 8h45'),
(10, 'Saint-Donat', '2023-10-09', '08:15:00', 'Départ à 8h15, pas d_arrêt'),
(9, 'Sainte-Agathe', '2023-10-09', '12:30:00', 'Départ à 12h30'),
(9, 'Sainte-Agathe', '2023-10-11', '08:15:00', 'Départ à 8h15/, pas d_arrêt'),
(8, 'Saint-Donat', '2023-10-09', '12:30:00', 'Départ à 12h30'),
(7, 'Sainte-Agathe', '2023-10-11', '12:30:00', 'Départ à 12h30'),
(6, 'Saint-Donat', '2023-10-06', '08:15:00', 'Départ à 8h15, pas d_arrêt'),
(6, 'Sainte-Agathe', '2023-10-09', '12:30:00', 'Départ à 12h30'),
(5, 'Sainte-Agathe', '2023-10-11', '12:30:00', 'Départ à 12h30'),
(5, 'Saint-Donat', '2023-10-06', '08:15:00', 'Départ à 8h15, pas d_arrêt')

-- Insertion des registres dans la table Reservations
INSERT INTO Reservations (idUtilisateurPassager ,idDeplacement )
VALUES 
(2, 1),
(3, 2),
(5, 3),
(7, 4),
(8, 5)
