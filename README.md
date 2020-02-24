# Schmemory Game

I took the liberty of expanding upon the starter kit you provided and upgrading to Webpack 4 and modernizing the tools a bit, in addition to some babel configurations so I could use the latest and greatest ES7+. I decided to put a fun twist and honor my good dog Penelope, so I included static images of her in different cities that you have to match when you flip a card. I added a simple 60 second timer and a flip match count, a victory window overlay, and a game over window overlay (when time runs out!), and simple css animations. Animations and timing could be improved in a future iteration. The main game class should be reusable and could be called with more cards as long as there's an even amount.

## Instructions

```
npm install
```

To run in development
```
npm run start
```

To build production ready page
```
npm run build
```

Then deploy to any static hosting, I currently have it deployed using surge: [tender-ducks](https://tender-ducks.surge.sh)

