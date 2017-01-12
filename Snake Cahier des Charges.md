#Snake Multijoueur

##Système de jeu
Les joueurs contrôlent une longue et fine ligne semblable à un serpent, qui doit slalomer entre les autres joueurs pour survivre. Pour gagner en puissance, le joueur doit faire manger à son serpent un certain nombre de pommes, allongeant à chaque fois la taille du serpent. Alors que le serpent avance inexorablement, le joueur ne peut que lui indiquer une direction à suivre (en haut, en bas, à gauche, à droite) afin d'éviter que la tête du serpent ne touche les autres joueurs, auquel cas il risque de mourir.

##Règles du jeu
- Le serpent avance tout seul dans une direction choisit aléatoirement au début du jeu
- Le serpent peut se déplacer seulement à droite, gauche, en haut ou en bas. Pas de déplacement en diagonale ou en cercle
- La vitesse du serpent est la même pour tout le monde
- 2 serpents qui entrent en collision en tête à tête meurent
- Des pommes apparaissent aléatoirement sur la carte.
- 5 pommes sont disponible au début de la partie
- Une pomme apparrait à chaque fois qu'une pomme est mangée
- Si un serpent atteint le bord de la carte, il passe de l'autre côté
- Un serpent qui meurt a la possibilité de revenir dans la partie (Lorsque tous les serpents sont morts)

##Déroulement d'une partie
- Le nombre de joueurs maximum dans une partie est de 10
- Une partie commence à partir du moment ou une personne se connecte
- 10 couleurs différentes sont disponible au début de la partie
- Le joueur à la possibilité de rentrer un pseudo (Si le joueur ne rentre rien on lui assigne un pseudo aléatoirement)

##Map
- La taille du terrain de jeu est limité dans un rectangle de 1500x900px.
- La couleur de fond sera noir
- Les pommes en rouge

![Board grid](/docs/images/multisnake_board.png?raw=true "Board grid")
