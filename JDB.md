# projet-08-jeux-video-front

## Sprint 0
###  05/02/2024
- Création du routage avec React Router Dom (passage du footer et du header dans le composant Layout)
- Footer et Header Statique
- Création de la page Erreur ( avec le path='*', pour gérer toutes le routes inconnus)
- Création de la page Accueil
- Import de ReduxJS/toolkit
- Création du store / reducer / selector
- Installation de Tailwind CSS pour React Vite, et de l'extension DaisyUI
- Import du menu burger et du footer via DaisyUI
- Modification des contenus (texte,images), ainsi que du rendu des tailles d'images sur le carroussel
- Import de react-responsive pour gérer les media-queries pour le responsive design
- Affichage conditionnel du menu burger sur Smartphone et tablette, affichage menu fixe sur PC
- Création de la page Register pour la création d'un compte avec un formulaire + Route
- Création de la page Login pour la Connexion utilisateur + Route
- Dynamisation de l'affichage (active) sur la page d'accueil
- Dynamisation des liens (Accueil, Genre) de la page d'accueil vers les pages concernées ( Link , NavLink)

###  06/02/2024
- Création des pages du site en statique ( Genres, Plateformes, Jeux-Vidéo, Parties, CGU, Contact)
- Surbrillance des liens au clic pour indiquer à l'utilisateur sur qu'elle page il se situe.
- Factorisation de la Navbar dans un composant et insertion dans le header.
- Insertion de la Métadescription, le title et logo pour le SEO.
- Création d'un fichier data.js (import dans App.tsx)
- Dynamisation des données dans Parties avec un map des données de data.js
- Dynamisation des données dans l'Accueil.
- Création et retour vers l'accueil de la page d'erreur.
- Creation de la page (Genres) avec dynamisation des données via le fichier genres.js.
- Creation de la page (Plateformes) avec dynamisation des données via le fichier platform.js.

## Sprint 1
###  07/02/2024
- Création du Readme pour déploiement du projet.
- Création de la page des jeux-vidéos.
- Gestion de la taille des images des cards pour normaliser les dimensions des cards.
- Création de la page pour un jeu-vidéo avec des données dynamique (data.js) en attente des données du back via un id.
- Création d'un bouton + link de retour vers les jeux-vidéo sur la page jeu.
- Création de la page CGU et de la page Contact avec un formulaire
- Création du formulaire de création d'une partie.

###  08/02/2024
- Rendu du bouton de création d'une partie
- Typage des données que nous allons recevoir via la doc du dictionnaire de données dans types.d.tsx
- Création des reducers (games,genres, platforms,users, videoGames)
- Appel Axios de l'API 
- Gestion des 3 types de réception de données de l'API (fulfilled, rejected, pending) avec modification des state error et loading en fonction de l'état.
- Création des hooks ( useAppSelector() et useAppDispatch() )
- Test d'appel de l'API dans App (en attente des déblocage des CORS par le back) avec un rendu au premier affiche avec useEffect().
- Appel de l'API avec axios en Get pour la récuperation des données.
- Envoi de données de l'utilisateur en POST pour la création d'un utilisateur (en statique)
- Récuperation du token de l'utilisateur et stockage en cookie.
- Dynamisation des données avec les données de l'API dans Genres et Jeux-vidéos.
- Correction des erreurs de typage des données (TypeScript).

###  09/02/2024
- Gestion de la connexion User avec récupération du token  et stockage en session ( Appel Axios en Post pour contrôle des données USER et récupération du token concérné)
- Passage des actions dans les state et payload.
- Création du composant Login.
- Modification du footer en fixed pour le défilement de la page.
- Privatisation des routes et renvoi vers la page de connexion si user non connecté.

### 12/02/2024
- Gestion de la création d'un compte d'un nouvel User avec une vérification de mot de passe.
- Création de nos actions dans User.ts, requete API via Axios et récupération de token de connexion en local.
- Connexion à la BDD avec les users créer précèdement.
- Création d'une partie via le formulaire disponible dans la page Parties et envoi en BDD ( Attente de retour du back ).
- Mise en forme ( CSS ) de la page Parties.

### 13/02/2024
- Validation avec le back de la réception des données de création d'une partie.
- Création de la page de Profil ( liaison des routes vers celle-ci dès que l'utilisateur se connecte).
- Récupération des données de l'utilisateur via un appel Back d'une route (En attente).
- Création de la page d'un genre affichant les jeux-vidéos correspondants.
- Création de la page d'une plateforme affichant les jeux-vidéos correspondants.
- Création d'une partie, à partir de la page d'un jeu-vidéo avec filtre du jeu dans le formulaire.

## Sprint 2
### 14/02/2024
- Connexion de l'utilisateur avec la touche Entrée.
- Récupération de la data en BDD sur les informations de l'utilisateur connecté.
- Dynamisation de la page de Profil avec les Favoris de l'User.
- Dynamisation de la page de Profil avec les Parties de l'User.

### 15/02/2024
- Dynamisation de la page des parties
- Résolution du problème de raffraichissement et de pertes de données de l'utilisateur connecté
- Appels API uniquement lorsque l'utilisateur est connecté.
- Factorisation et rendu conditionnel sur (isLogged) du UseEffect dans App.
- Creation d'une partie et affichage dans la page Parties.
- Rendu conditionnel des parties du jour.
- Rendu conditionnel des pârties ultérieur.

### 16/02/2024
- Création du bouton pour ajouter un favori sur un jeu-vidéo depuis la page "Jeux-vidéo".
- Ajout du jeu-vidéo Favori dans la page de profil.
- Possibilité à un autre joueur de rejoindre la partie créée.
- Rendu dynamique avec affichage actualisé du nombre de participants.
- Suppression d'une partie depuis la page de profil.
- Desinscription d'une partie depuis la page de profil.

### 19/02/2024
- Suppression d'un favori depuis la page de Profil.
- Création d'un loader et passage dans les state lorsque loading = true.
- Modification d'un favori depuis la page des jeux-vidéos avec actualisation du state.
- Bloquage de l'utilisateur si son compte n'est plus actif (avec rendu conditionnel d'un message pour prévenir l'utilisateur).
- Rendu conditionnel du bouton si la partie est complète dans Parties et Partie.
- Bloquage de l'utilisateur si son compte n'a pas était validé par email (avec rendu conditionnel d'un message pour prévenir l'utilisateur).
- Suppression d'un favori depuis la page de profil ( contenu dynamque sur la page des jeux-vidéos).

### 20/02/2024

### 21/02/2024

### 22/02/2024
- Desinstallation de DaisyUI
- Installation de Tailwind Element
- Passage des composants sous Tailwind Element
- Reconfigugartion des states avec le passage de l'id via les fonctions.
- Suppression des fonctions inutiles ( RemoveFavorites/addFavorites).

### 23/02/2024
- Réinstallation de DaisyUI
- Carroussel dynamique/responsive.
- Travail sur le responsive du site (title, card...).
- Rendu dynamique des coeurs des Jeux-vidéos via les states (travail avec le back pour récupération d'un nouveau tableau).
- Intégration d'un lien dans le jeu-vidéo vers les parties disponibles.
- Affichage des parties en cours sur un jeu.
- Rendu conditionnel du bouton d'inscription si le status de la partie est "finished".
- Rendu conditionnel sur l'affichage des parties avec le status "future".
- Insertion d'une section partie terminées sur la page de profil de l'utilisateur.

### 26/02/2024
- Redirection vers la possibilitée de créer un compte sur le login.
- Travail sur le responsive (titres, cards, boutons...).
- Modification des informations du profil
- Rendu dynamique sur la modification de parties
- Affichage du pseudo selon la plateforme sur laquelle une partie est crée pour transmettre les bons identifiants
- Affichage d'un bouton pour les utilisateurs ayant le role d'administateur afin de se rendre sur le back-office
  
