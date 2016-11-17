# Back-end

## Stack :

- Node.js (moteur JS)
- Socket.io (websockets/tps réel)
- Express (serveur)

Pour le serveur, on utilise Node.js/Express
Avantages :
- Stack purement JS
- Gestion des Sockets avec Socket.io
- C'est fun

Gestion de la synchro temps réel :
- Socket.io

## Fonctionnement back :

Nous devons gérer :
- La connexion / déconnexion des utilisateurs
- La synchronisation temps-réel
- La génération des pommes et leur placement au fur et à mesure de la partie

Les questions à trancher :
- Rendering server-side ou API et rendering front ?
- Pseudos ?

## Déroulé d'une session côté serveur :

Bootstrap de la session :

- Placement des pommes

Lors de l'arrivée d'un user, le serveur :

- Envoie les assets et rend le tableau de jeu.
- Attribut un UUID au client
- Ouvre un socket avec le client
- Capture les evts envoyés par le client et les broadcaste aux autres clients

Durant la session, le serveur stocke :
- Les props du joueur : nombre de pommes mangées, l'UUID du joueur.
- Le nombre de joueurs sur la session.
- Le nombre et placement des pommes sur le tableau de jeu.
- La longueur et le placement des serpents OU les cases du tableau de jeu non-occupées
