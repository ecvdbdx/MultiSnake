#Contrôle du serpent
*Romain Thoreau & Guilhmen Canivet*

##Tâches
Nous devons donner à un objet un mouvement continue.
Nous devons génerer un mouvement aléatoire lors de l'initialisation. 
Nous devons ensuite pouvoir gérer ce mouvement. 
Dans un premier temps nous devons le faire  via les touches du clavier dans les 4 directions. 
Nous devons gérer les colisions (ou au moins avoir un envoie/retour lors d'une colision). 
Nous devrons implicitement gérer la vitesse. 
Enfin nous pourrons ajouter le contrôle par gyroscope ou accéléromètre.

##Manière de procéder
Le mouvement sera généré par une vitesse et une direction.
Une fonction renvera une direction aléatoire pour l'initialisation.
La vitesse sera une variable constante dans un premier temps.
Le fait de gérer le mouvement sera une modification de la variable "direction", elle sera modifié par un setter.
La détection des touches du clavier sera une liste de listeners sur certaines touches.
Nous pensons utiliser une API pour recevoir les mouvements d'un téléphone.

##Technologie
Nous utiliserons jQuery pour interagir avec l'objet et écouter les touches de clavier enfoncées.
Nous pouvons récupérer le mouvement d'un téléphone manuellement via des écouteurs, mais nous pourrions utiliser une API pour avoir de meilleurs résultats.
