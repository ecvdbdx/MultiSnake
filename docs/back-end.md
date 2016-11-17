# Back-end

## Stack :

- Node.js (JS engine)
- Socket.io (websockets/realtime)
- Express (server)

We'll be using Node.js/Express for the server
Pros :
- Full JS down the line
- Sockets handling with Socket.io
- Fun

Realtime sync handling :
- Socket.io

## Back-end functions overview :

We must handle :
- Users check-in and check-outs
- Realtime sync
- Apples creation and placement throughout the game.

## Game session from a server-side perspective :

Session bootstrap :

- Apples placement

As the user arrives, the server :

- Sends assets and code to the client
- Gives the client a UUID
- Opens a socket with the client
- Catch events sent by the client and broadcasts them to others.

Throughout the session, the server stocks (real-time) :
- Player's props : UUID, eated apples count
- Global players count(with a max limit)
- Count and placement of apples on the gameboard
- Length and placement of all snakes OR free squares
