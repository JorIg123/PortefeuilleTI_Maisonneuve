
# PortefeuilleTI_Maisonneuve

Ce référentiel contient tous les projets développés pendant mes études en technologies de l'information et développement d'applications au Collège de Maisonneuve. Les dossiers node_modules ont été supprimés dans les différentes applications. Pour les rétablir, utilisez la commande "npm install" avant d'exécuter l'application.

## Projets
- [Projet_Covoiturage](./Projet_Covoiturage/): L'application web de gestion de covoiturage qui permet l'enregistrement des utilisateurs, de voyages (offre et demande d'itinéraires), de réservations dans un contexte général. L'application permet la manipulation des informations associées à chaque utilisateur, voyage offert ou demandé, ou réservation pour effectuer une modification ou suppression.

Une explication plus détaillée de l'utilisation de l'application se trouve dans le fichier "Application de gestion de covoiturage.docx".

Pour exécuter l'application :
  1. Clonez le dépôt.
  2. Installez les dépendances avec `npm install`.
  3. Lancez le serveur avec `node server.js`.
  4. Ouvrez le navigateur et visitez `http://localhost:3000`.


- [Projet_Jeux_Drapeaux](./Projet_Jeux_Drapeaux/): Jeux_Drapeaux est une application qui vise à aider à mémoriser les drapeaux, les capitales, la localisation et d'autres aspects des différents pays. L'application offre un entraînement avant le jeu principal.
Il s'agit d'un projet React. Dans le code de l'application, les éléments suivants sont inclus :

1. Utilisation des États
2. Gestion des Formulaires
3. Utilisation de React Router Dom v6
4. Utilisation de l'Outlet
5. Utilisation du Hook Navigate
6. Rendu conditionnel
7. Création et gestion du Contexte
8. Gestion des Événements

Pour plus de détails, voir le document : "Présentation des Aspects Clés de l'Application". 

Pour exécuter l'application :
  1. Clonez le dépôt.
  2. Installez les dépendances avec `npm install`.
  3. Lancez l'application avec `npm start`.
  4. Un navigateur ouvrira la page: `http://localhost:3000`.

- [Projet_Gestion_Formulaire_Py](./Projet_Gestion_Formulaire_Py/): Une description plus détaillée de l'application peut être consultée dans le document "TP2-Cmaisonneuve_goodOne.pdf".
L'application est réalisée avec une programmation orientée objet en langage Python.

- [Projet_Impression_Basique_de_Facturation_Py](./Projet_Impression_Basique_de_Facturation_Py): Application avec un code basique en langage Python qui calcule et imprime le total des achats dans un format de facture. L'application permet de supprimer des achats de la facture si nécessaire et prend en compte les taxes selon l'article.

- [Projet_Bacelet_Prison](./Projet_Bacelet_Prison): L'application notifie les inscrits de la position des prisonniers selon qu'ils soient à l'intérieur ou à l'extérieur de la prison. L'application est codée en Java et combine les patrons de conception État et Observateur. La classe Test.java contient la méthode "public static void main". Une instance de la classe Bracelet associée à un prisonnier est créée avec les coordonnées, le nom du prisonnier, sa condition par rapport à la prison, et la prison dans laquelle il est détenu. Une instance de Bracelet peut inscrire un observateur et établir les limites en relation avec la prison pour les notifications.