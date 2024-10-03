-- SQLite
------------------------------------------------------------

--Clients
INSERT INTO Client (PrenomClient, NomClient, Email, MotDePasse)
VALUES ('Élise', 'Dubois', 'elise@example.com', 'mdp123');

INSERT INTO Client (PrenomClient, NomClient, Email, MotDePasse)
VALUES ('Luc', 'Lefevre', 'luc@example.com', 'mdp456');

INSERT INTO Client (PrenomClient, NomClient, Email, MotDePasse)
VALUES ('Camille', 'Moreau', 'camille@example.com', 'mdp789');

INSERT INTO Client (PrenomClient, NomClient, Email, MotDePasse)
VALUES ('Théo', 'Girard', 'theo@example.com', 'mdp101112');

INSERT INTO Client (PrenomClient, NomClient, Email, MotDePasse)
VALUES ('Chloé', 'Robert', 'chloe@example.com', 'mdp131415');

INSERT INTO Client (PrenomClient, NomClient, Email, MotDePasse)
VALUES ('Matéo', 'Richard', 'mateo@example.com', 'mdp161718');

INSERT INTO Client (PrenomClient, NomClient, Email, MotDePasse)
VALUES ('Emma', 'Petit', 'emma@example.com', 'mdp192021');

INSERT INTO Client (PrenomClient, NomClient, Email, MotDePasse)
VALUES ('Nathan', 'Durand', 'nathan@example.com', 'mdp222324');

INSERT INTO Client (PrenomClient, NomClient, Email, MotDePasse)
VALUES ('Léa', 'Leroy', 'lea@example.com', 'mdp252627');

INSERT INTO Client (PrenomClient, NomClient, Email, MotDePasse)
VALUES ('Hugo', 'Roux', 'hugo@example.com', 'mdp282930');


--------------------------------------------------------------------------------------------
delete from salonCoiffure where idSalon = 4
--Coiffeurs
INSERT INTO Coiffeur (IDSalon, PrenomCoiffeur, NomCoiffeur, Email, PhotoCoiffeur, MotDePasse)
VALUES (1, 'Jean', 'Dupont', 'jean.dupont@example.com', 'jean.jpg', 'mdp123');

INSERT INTO Coiffeur (IDSalon, PrenomCoiffeur, NomCoiffeur, Email, PhotoCoiffeur, MotDePasse)
VALUES (1, 'Marie', 'Leclerc', 'marie.leclerc@example.com', 'marie.jpg', 'mdp456');

INSERT INTO Coiffeur (IDSalon, PrenomCoiffeur, NomCoiffeur, Email, PhotoCoiffeur, MotDePasse)
VALUES (2, 'Pierre', 'Lefevre', 'pierre.lefevre@example.com', 'pierre.jpg', 'mdp789');

INSERT INTO Coiffeur (IDSalon, PrenomCoiffeur, NomCoiffeur, Email, PhotoCoiffeur, MotDePasse)
VALUES (2, 'Sophie', 'Girard', 'sophie.girard@example.com', 'sophie.jpg', 'mdp101112');

INSERT INTO Coiffeur (IDSalon, PrenomCoiffeur, NomCoiffeur, Email, PhotoCoiffeur, MotDePasse)
VALUES (3, 'Nicolas', 'Martin', 'nicolas.martin@example.com', 'nicolas.jpg', 'mdp131415');

INSERT INTO Coiffeur (IDSalon, PrenomCoiffeur, NomCoiffeur, Email, PhotoCoiffeur, MotDePasse)
VALUES (3, 'Céline', 'Dubois', 'celine.dubois@example.com', 'celine.jpg', 'mdp161718');

INSERT INTO Coiffeur (IDSalon, PrenomCoiffeur, NomCoiffeur, Email, PhotoCoiffeur, MotDePasse)
VALUES (4, 'Thomas', 'Roux', 'thomas.roux@example.com', 'thomas.jpg', 'mdp192021');

INSERT INTO Coiffeur (IDSalon, PrenomCoiffeur, NomCoiffeur, Email, PhotoCoiffeur, MotDePasse)
VALUES (4, 'Charlotte', 'Petit', 'charlotte.petit@example.com', 'charlotte.jpg', 'mdp222324');

INSERT INTO Coiffeur (IDSalon, PrenomCoiffeur, NomCoiffeur, Email, PhotoCoiffeur, MotDePasse)
VALUES (5, 'Alexandre', 'Leroy', 'alexandre.leroy@example.com', 'alexandre.jpg', 'mdp252627');

INSERT INTO Coiffeur (IDSalon, PrenomCoiffeur, NomCoiffeur, Email, PhotoCoiffeur, MotDePasse)
VALUES (5, 'Émilie', 'Renaud', 'emilie.renaud@example.com', 'emilie.jpg', 'mdp282930');

----------------------------------------------------------------------------------------------------

--SalonCoiffures
INSERT INTO SalonCoiffure (nomSalon, telephoneSalon, adresse, bio, photoProfil, Email, MotDePasse)
VALUES ('Salon de Beauté Élégance', '0123456789', '123 Rue de la Beauté', 'Salon de beauté spécialisé dans les coupes modernes et les soins capillaires de haute qualité.',readfile('../reactapp/public/img/backgroundlogin2.jpg') , 'contact@elegance.com', 'mdp123');

INSERT INTO SalonCoiffure (nomSalon, telephoneSalon, adresse, bio, Email, MotDePasse)
VALUES ('Chez Coiffeur', '0987654321', '456 Avenue des Cheveux', 'Salon de coiffure familial offrant des coupes classiques et des styles tendance pour toute la famille.',(SELECT readfile('../reactapp/public/img/backgroundlogin3.jpg')) , 'contact@chezcoiffeur.com', 'mdp456');

INSERT INTO SalonCoiffure (nomSalon, telephoneSalon, adresse, bio, Email, MotDePasse)
VALUES ('Studio de Coiffure Chic', '0543219876', '789 Boulevard de la Mode', 'Studio de coiffure haut de gamme offrant des services de coupe, de coloration et de stylisme personnalisés.',(SELECT readfile('../reactapp/public/img/backgroundlogin4.jpg')) , 'contact@chicstudio.com', 'mdp789');

INSERT INTO SalonCoiffure (nomSalon, telephoneSalon, adresse, bio, Email, MotDePasse)
VALUES ('Le Salon Créatif', '0789456123', '987 Rue de l''Art', 'Salon de coiffure créatif proposant des coupes uniques et des styles innovants pour ceux qui osent être différents.',(SELECT readfile('../reactapp/public/img/Default_A_modern_banner_for_a_barbershop_web_site_in_hd_a_prof_0.jpg')) , 'contact@lesaloncreatif.com', 'mdp101112');

INSERT INTO SalonCoiffure (nomSalon, telephoneSalon, adresse, bio, Email, MotDePasse)
VALUES ('Salon Harmonie des Cheveux', '0321654987', '654 Avenue de l''Harmonie', 'Salon de coiffure équilibré offrant des services de coupe et de coloration pour hommes et femmes.',(SELECT readfile('../reactapp/public/img/Default_A_moder_banner_for_a_barbershop_in_hd_Professional_3.jpg')) , 'contact@harmoniecheveux.com', 'mdp131415');

INSERT INTO SalonCoiffure (nomSalon, telephoneSalon, adresse, bio, Email, MotDePasse)
VALUES ('La Coupe Parfaite', '0912345678', '321 Rue de la Perfection', 'Salon de coiffure spécialisé dans la création de coupes personnalisées pour mettre en valeur la beauté naturelle de chaque client.',(SELECT readfile('../reactapp/public/img/Default_A_modern_banner_for_a_barbershop_web_site_in_hd_a_prof_0.jpg')) , 'contact@lacoupeparfaite.com', 'mdp161718');

INSERT INTO SalonCoiffure (nomSalon, telephoneSalon, adresse, bio, Email, MotDePasse)
VALUES ('Beauté et Style', '0765432198', '456 Boulevard de la Beauté', 'Salon de beauté offrant des services de coiffure et de soins esthétiques pour une apparence élégante et soignée.',(SELECT readfile('../reactapp/public/img/Default_A_modern_banner_for_a_barbershop_web_site_in_hd_withou_0 (1).jpg')) , 'contact@beauteetstyle.com', 'mdp192021');

INSERT INTO SalonCoiffure (nomSalon, telephoneSalon, adresse, bio, Email, MotDePasse)
VALUES ('Salon Prestige', '0123456789', '789 Avenue du Prestige', 'Salon de coiffure de luxe offrant des services exclusifs de coupe, de coloration et de soins capillaires pour une expérience haut de gamme.',(SELECT readfile('../reactapp/public/img/Default_A_sleek_cuttingedge_barbershop_banner_in_high_definiti_0 (3).jpg')) , 'contact@salonprestige.com', 'mdp222324');

INSERT INTO SalonCoiffure (nomSalon, telephoneSalon, adresse, bio, Email, MotDePasse)
VALUES ('Coupe et Couleur', '0987654321', '654 Rue de la Coupe', 'Salon de coiffure dynamique proposant des services de coupe et de coloration pour un look moderne et vibrant.',(SELECT readfile('../reactapp/public/img/Default_A_sleek_cuttingedge_barbershop_banner_in_high_definiti_0.jpg')) , 'contact@coupeetcouleur.com', 'mdp252627');

INSERT INTO SalonCoiffure (nomSalon, telephoneSalon, adresse, bio, Email, MotDePasse)
VALUES ('Style et Élégance', '0543219876', '321 Avenue de l''Élégance', 'Salon de coiffure élégant offrant des services de coupe et de stylisme pour une allure sophistiquée et raffinée.',(SELECT readfile('../reactapp/public/img/Default_A_modern_banner_for_a_barbershop_web_site_in_hd_withou_0 (2).jpg')) , 'contact@styleetelegance.com', 'mdp282930');

--------------------------------------------------------------------------------------------------------------------

--Services
INSERT INTO Services (idSalon, nom, prix, duree)
VALUES (1, 'Coupe Homme', 25.50, '00:30:00');

INSERT INTO Services (idSalon, nom, prix, duree)
VALUES (1, 'Coupe Femme', 35.75, '01:00:00');

INSERT INTO Services (idSalon, nom, prix, duree)
VALUES (2, 'Coloration', 45.00, '01:30:00');

INSERT INTO Services (idSalon, nom, prix, duree)
VALUES (2, 'Brushing', 20.00, '00:45:00');

INSERT INTO Services (idSalon, nom, prix, duree)
VALUES (3, 'Coiffure de Mariage', 60.00, '02:00:00');

INSERT INTO Services (idSalon, nom, prix, duree)
VALUES (3, 'Mèches', 50.00, '01:30:00');

INSERT INTO Services (idSalon, nom, prix, duree)
VALUES (4, 'Coupe Enfant', 15.00, '00:20:00');

INSERT INTO Services (idSalon, nom, prix, duree)
VALUES (4, 'Balayage', 55.00, '01:45:00');

INSERT INTO Services (idSalon, nom, prix, duree)
VALUES (5, 'Coiffure Homme', 30.00, '00:45:00');

INSERT INTO Services (idSalon, nom, prix, duree)
VALUES (5, 'Coiffure Femme', 40.00, '01:30:00');

-------------------------------------------------------------------------------------------------------------------------------

--RendezVous
INSERT INTO RendezVous (idSalonCoiffure, idClient, idService, idCoiffeur, dateRDV, heure)
VALUES (1, 1, 1, 1, '2024-04-26', '09:00:00');

INSERT INTO RendezVous (idSalonCoiffure, idClient, idService, idCoiffeur, dateRDV, heure)
VALUES (1, 2, 2, 2, '2024-04-02', '10:30:00');

INSERT INTO RendezVous (idSalonCoiffure, idClient, idService, idCoiffeur, dateRDV, heure)
VALUES (2, 3, 3, 3, '2024-04-03', '11:15:00');

INSERT INTO RendezVous (idSalonCoiffure, idClient, idService, idCoiffeur, dateRDV, heure)
VALUES (2, 4, 4, 4, '2024-04-04', '14:00:00');

INSERT INTO RendezVous (idSalonCoiffure, idClient, idService, idCoiffeur, dateRDV, heure)
VALUES (3, 5, 5, 5, '2024-04-05', '15:45:00');

INSERT INTO RendezVous (idSalonCoiffure, idClient, idService, idCoiffeur, dateRDV, heure)
VALUES (3, 6, 6, 6, '2024-04-06', '16:30:00');

INSERT INTO RendezVous (idSalonCoiffure, idClient, idService, idCoiffeur, dateRDV, heure)
VALUES (4, 7, 7, 7, '2024-04-07', '08:45:00');

INSERT INTO RendezVous (idSalonCoiffure, idClient, idService, idCoiffeur, dateRDV, heure)
VALUES (4, 8, 8, 8, '2024-04-08', '12:00:00');

INSERT INTO RendezVous (idSalonCoiffure, idClient, idService, idCoiffeur, dateRDV, heure)
VALUES (5, 9, 9, 9, '2024-04-09', '09:30:00');

INSERT INTO RendezVous (idSalonCoiffure, idClient, idService, idCoiffeur, dateRDV, heure)
VALUES (5, 10, 10, 10, '2024-04-10', '11:00:00');

----------------------------------------------------------------------------------------------------------------------------

--DisponibiliteCoiffeur
delete from DisponibiliteCoiffeur where idDispoS = 19
INSERT INTO DisponibiliteCoiffeur (idCoiffeur, idDispoS, debutShift, finShift, PauseDebut, PauseFin)
VALUES (12, 29, '09:00:00', '18:00:00', '12:00:00', '13:00:00');

INSERT INTO DisponibiliteCoiffeur (idCoiffeur, idDispoS, debutShift, finShift, PauseDebut, PauseFin)
VALUES (2, 2, '08:30:00', '17:30:00', '12:30:00', '13:30:00');

INSERT INTO DisponibiliteCoiffeur (idCoiffeur, idDispoS, debutShift, finShift, PauseDebut, PauseFin)
VALUES (3, 3, '10:00:00', '19:00:00', '13:00:00', '14:00:00');

INSERT INTO DisponibiliteCoiffeur (idCoiffeur, idDispoS, debutShift, finShift, PauseDebut, PauseFin)
VALUES (4, 4, '11:00:00', '20:00:00', '14:00:00', '15:00:00');

INSERT INTO DisponibiliteCoiffeur (idCoiffeur, idDispoS, debutShift, finShift, PauseDebut, PauseFin)
VALUES (5, 5, '08:00:00', '17:00:00', '12:00:00', '13:00:00');

INSERT INTO DisponibiliteCoiffeur (idCoiffeur, idDispoS, debutShift, finShift, PauseDebut, PauseFin)
VALUES (6, 6, '09:30:00', '18:30:00', '13:30:00', '14:30:00');

INSERT INTO DisponibiliteCoiffeur (idCoiffeur, idDispoS, debutShift, finShift, PauseDebut, PauseFin)
VALUES (7, 7, '10:30:00', '19:30:00', '14:30:00', '15:30:00');

INSERT INTO DisponibiliteCoiffeur (idCoiffeur, idDispoS, debutShift, finShift, PauseDebut, PauseFin)
VALUES (8, 8, '11:30:00', '20:30:00', '15:00:00', '16:00:00');

INSERT INTO DisponibiliteCoiffeur (idCoiffeur, idDispoS, debutShift, finShift, PauseDebut, PauseFin)
VALUES (9, 9, '08:45:00', '17:45:00', '12:45:00', '13:45:00');

INSERT INTO DisponibiliteCoiffeur (idCoiffeur, idDispoS, debutShift, finShift, PauseDebut, PauseFin)
VALUES (10, 10, '09:15:00', '18:15:00', '13:15:00', '14:15:00');

------------------------------------------------------------------------------------------------------------------------------------

--CoiffeurFavoris
INSERT INTO CoiffeurFavoris (idClient, idCoiffeur)
VALUES (1, 1);

INSERT INTO CoiffeurFavoris (idClient, idCoiffeur)
VALUES (1, 2);

INSERT INTO CoiffeurFavoris (idClient, idCoiffeur)
VALUES (2, 3);

INSERT INTO CoiffeurFavoris (idClient, idCoiffeur)
VALUES (2, 4);

INSERT INTO CoiffeurFavoris (idClient, idCoiffeur)
VALUES (3, 5);

INSERT INTO CoiffeurFavoris (idClient, idCoiffeur)
VALUES (3, 6);

INSERT INTO CoiffeurFavoris (idClient, idCoiffeur)
VALUES (4, 7);

INSERT INTO CoiffeurFavoris (idClient, idCoiffeur)
VALUES (4, 8);

INSERT INTO CoiffeurFavoris (idClient, idCoiffeur)
VALUES (5, 9);

INSERT INTO CoiffeurFavoris (idClient, idCoiffeur)
VALUES (5, 10);

----------------------------------------------------------------------------------------------------------------------------------------

--Avis
INSERT INTO Avis (idClient, idSalonCoiffure, etoiles, commentaire)
VALUES (1, 1, 5, 'Excellent salon, personnel très professionnel et accueillant.');

INSERT INTO Avis (idClient, idSalonCoiffure, etoiles, commentaire)
VALUES (2, 2, 4, 'Bonne expérience, mais un peu cher pour les services proposés.');

INSERT INTO Avis (idClient, idSalonCoiffure, etoiles, commentaire)
VALUES (3, 3, 5, 'Le meilleur salon que j''ai jamais visité, je le recommande vivement.');

INSERT INTO Avis (idClient, idSalonCoiffure, etoiles, commentaire)
VALUES (4, 4, 3, 'Service correct, mais attente un peu longue.');

INSERT INTO Avis (idClient, idSalonCoiffure, etoiles, commentaire)
VALUES (5, 5, 5, 'Toujours satisfaite de mes visites, personnel très compétent.');

INSERT INTO Avis (idClient, idSalonCoiffure, etoiles, commentaire)
VALUES (6, 1, 4, 'Très bon salon, mais un peu difficile à trouver.');

INSERT INTO Avis (idClient, idSalonCoiffure, etoiles, commentaire)
VALUES (7, 2, 2, 'Déçue par la prestation, je ne reviendrai pas.');

INSERT INTO Avis (idClient, idSalonCoiffure, etoiles, commentaire)
VALUES (8, 3, 5, 'Service exceptionnel, je suis une cliente fidèle.');

INSERT INTO Avis (idClient, idSalonCoiffure, etoiles, commentaire)
VALUES (9, 4, 4, 'Très bonne ambiance, je recommande.');

INSERT INTO Avis (idClient, idSalonCoiffure, etoiles, commentaire)
VALUES (10, 5, 3, 'Expérience mitigée, je pense essayer un autre salon la prochaine fois.');

------------------------------------------------------------------------------------------------------------------------------------

--DispoSalon
INSERT INTO DisponibiliteSalon (idSalon, DateDispo, Ouverture, Fermeture)
VALUES (1, '2024-05-14', '09:00:00', '18:00:00');

INSERT INTO DisponibiliteSalon (idSalon, DateDispo, Ouverture, Fermeture)
VALUES (1, '2024-04-02', '09:00:00', '18:00:00');

INSERT INTO DisponibiliteSalon (idSalon, DateDispo, Ouverture, Fermeture)
VALUES (2, '2024-04-01', '08:30:00', '17:30:00');

INSERT INTO DisponibiliteSalon (idSalon, DateDispo, Ouverture, Fermeture)
VALUES (2, '2024-04-02', '08:30:00', '17:30:00');

INSERT INTO DisponibiliteSalon (idSalon, DateDispo, Ouverture, Fermeture)
VALUES (3, '2024-04-01', '10:00:00', '19:00:00');

INSERT INTO DisponibiliteSalon (idSalon, DateDispo, Ouverture, Fermeture)
VALUES (3, '2024-04-02', '10:00:00', '19:00:00');

INSERT INTO DisponibiliteSalon (idSalon, DateDispo, Ouverture, Fermeture)
VALUES (4, '2024-04-01', '11:00:00', '20:00:00');

INSERT INTO DisponibiliteSalon (idSalon, DateDispo, Ouverture, Fermeture)
VALUES (4, '2024-04-02', '11:00:00', '20:00:00');

INSERT INTO DisponibiliteSalon (idSalon, DateDispo, Ouverture, Fermeture)
VALUES (5, '2024-04-01', '08:00:00', '17:00:00');

INSERT INTO DisponibiliteSalon (idSalon, DateDispo, Ouverture, Fermeture)
VALUES (5, '2024-04-02', '08:00:00', '17:00:00');

