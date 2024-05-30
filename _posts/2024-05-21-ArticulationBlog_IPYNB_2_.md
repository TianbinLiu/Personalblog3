---
layout: base
title: College Articulation Blog
type: hacks
toc: True
comments: False
---

# Describe key phrase(JavaScript Objects)
Game Control Code: Total ___ / 5, Grade __/1

Starting with GameSetup you will describe the JavaScript Objects and how they are collected

## JavaScript GameObjects to GameLevel

Inside the GameSetup (now is GameSetter), we are creating two variables to stores all the objects for the level and restore the information.

```javascript
const assets = {  
  obstacles: {
    tube: { src: "/images/platformer/obstacles/tube.png",
    hitbox: { widthPercentage: 0.5, heightPercentage: 0.5},
    width: 300,
    height: 300,
    scaleSize: 100,
    }
  },
  platforms: {
    grass: { src: "/images/platformer/platforms/grass.png" }, //MAY need 3 new variables: sizeRatio, widthRatio, and heightRatio
    itemBlock: {
      src: "/images/platformer/platforms/mario_block_spritesheet_v2.png",
      sizeRatio: 83.2,
      widthRatio: 0.5,
      heightRatio: 1.0,
      width: 204,
      height: 204,
      scaleSize: 80,
      speedRatio: 0.7,
      hitbox: { widthPercentage: 0.4, heightPercentage: -0.2 }
    }
  },
  backgrounds: {
    boss: { src: "/images/platformer/backgrounds/BossBackground.png", parallaxSpeed: 0.4, moveOnKeyAction: true },
    devil: {src: "/images/platformer/backgrounds/devil.png", parallaxSpeed: 2 },
  },
  transitions: {
    iceminiEnd: { src: "/images/platformer/transitions/IceMinigameEnd.png"},
  },
  players: {
    //code hidden
  },
  enemies: {
    //code hidden
  }
  };

  const objects = [
    // GameObject(s), the order is important to z-index...
    { name: 'bossbackground', id: 'background', class: BackgroundParallax, data: assets.backgrounds.boss },
    { name: 'devil', id: 'devil', class:BackgroundParallax, data: assets.backgrounds.devil},
    { name: 'boss', id: 'boss', class: Boss, data: assets.enemies.boss, xPercentage: 0.5, minPosition: 0.3 },
    { name: 'boss1', id: 'boss', class: Boss, data: assets.enemies.boss, xPercentage: 0.3, minPosition: 0.07 },
    { name: 'itemBlock', id: 'jumpPlatform', class: BossItem, data: assets.platforms.itemBlock, xPercentage: 0.2, yPercentage: 0.65 }, //item block is a platform
    { name: 'mario', id: 'player', class: PlayerBoss, data: assets.players.mario },
    { name: 'zombie', id: 'player', class: PlayerZombie, data: assets.players.zombie },
    { name: 'grass', id: 'platform', class: Platform, data: assets.platforms.grass },
    { name: 'tube', id: 'finishline', class: FinishLine, data: assets.obstacles.tube, xPercentage: 0.85, yPercentage: 0.855 },
    { name: 'iceminiEnd', id: 'background', class: BackgroundTransitions, data: assets.transitions.iceminiEnd },
  ];
```

Each object is an array that store several variables, information of the objects(player, background, tube, enemy), like name, id, class, data...

And this variable that stores all these arrays(objects) will pass through some functions inside the GameLevel.js like load() function in able to show/draw the objects on screen as "canvas" elements.

In order to pass through the functions inside the GameLevel.js
A new class object GameLevel will be created.
To create this new class object, we will first create a new object(in this case we called it GameSetterBoss) that stores the previous objects we have(objects and assets) and also assign it a tag(in this case we set it to "Boss")
```javascript
  const GameSetterBoss = {
    tag: 'Boss',
    assets: assets,
    objects: objects
  };
```
And then we will call the function GameLevelSetup(), which will set the object(GameSetterBoss) as input and return the class object GameLevel we want.

```javascript
  GameLevelSetup(GameSetterBoss, this.path, this.playerOffScreenCallBack);

  // Initialize Game Levels
  function GameLevelSetup(GameSetter, path, callback, passive = false) {
    var gameObjects = new GameSet(GameSetter.assets, GameSetter.objects, path);
    return new GameLevel({ tag: GameSetter.tag, callback: callback, objects: gameObjects.getGameObjects(), passive: passive });
  }
```
Below is the constructor of the class GameLevel, we can see that all the variables stores inside the GameSetterBoss will be assign to the GameLevel as its properties(level tag, information of the game objects). In the end, all of these information will be pass to array GameEnv.levels using the function push().
```javascript
  constructor(levelObject) {
        // The levelObjects property stores the levelObject parameter.
      this.levelObjects = levelObject;        
        // The tag is a friendly name used to identify the level.
      this.tag = levelObject?.tag;
        // The passive property determines if the level is passive (i.e., not playable).
      this.passive = levelObject?.passive;
        // The isComplete property is a function that determines if the level is complete.
        // build conditions to make determination of complete (e.g., all enemies defeated, player reached the end of the screen, etc.)
      this.isComplete = levelObject?.callback;
        // The gameObjects property is an array of the game objects for this level.
      this.gameObjects = this.levelObjects?.objects || [];
        // Each GameLevel instance is stored in the GameEnv.levels array.
      GameEnv.levels.push(this);
  }
```

This is how the JavaScript Objects become a GameLevel.

## GameLevel to and Array of GameLevels
Below are the functions inside the GameControl that related to GameLevel
```javascript
    async transitionToLevel(newLevel) {
        this.inTransition = true;

        // Destroy existing game objects
        GameEnv.destroy();

        // Load GameLevel objects
        if (GameEnv.currentLevel !== newLevel) {
            GameEnv.claimedCoinIds = [];
        }
        await newLevel.load();
        GameEnv.currentLevel = newLevel;

        // Update invert property
        GameEnv.setInvert();
        
        // Trigger a resize to redraw canvas elements
        window.dispatchEvent(new Event('resize'));

        this.inTransition = false;
    },

    /**
     * The main game control loop.
     * Checks if the game is in transition. If it's not, it updates the game environment,
     * checks if the current level is complete, and if it is, transitions to the next level.
     * If the current level is null, it transitions to the beginning of the game.
     * Finally, it calls itself again using requestAnimationFrame to create a loop.
     */    
    gameLoop() {
        // Turn game loop off during transitions
        if (!this.inTransition) {

            // Get current level
            GameEnv.update();
            const currentLevel = GameEnv.currentLevel;

            // currentLevel is defined
            if (currentLevel) {
                // run the isComplete callback function
                if (currentLevel.isComplete && currentLevel.isComplete()) {
                    const currentIndex = GameEnv.levels.indexOf(currentLevel);
                    // next index is in bounds
                    if (currentIndex !== -1 && currentIndex + 1 < GameEnv.levels.length) {
                        // transition to the next level
                        this.transitionToLevel(GameEnv.levels[currentIndex + 1]);
                    } 
                }
            // currentLevel is null, (ie start or restart game)
            } else {
                // transition to beginning of game
                this.transitionToLevel(GameEnv.levels[0]);
            }
        }

        // recycle gameLoop, aka recursion
        requestAnimationFrame(this.gameLoop.bind(this));  
    },
```

The function gameLoop() is the main loop for the game.
Inside the gameLoop(), the most important is the if-statement with the condition "currentlevel".

If the currentLevel is not defined (null, which means the game is just starting and has not passing any level yet), it won't pass through the code inside the if-statement, instead it will pass through the code inside the else-statement which will run the function transitionToLevel(), assign GameEnv.levels[0](The information of the objects in each level is already pass and store in the array GameEnv.levels as we create the GameLevel class object) as input, and go to the first level of the game.

And if the currentLevel is defined, it will check if currentLevel.isComplete is true, and if it is, it will transition to next level. (That's the weird part, I don't think this part of code is useful, because usually we will transition to next level by reaching the tube/finishLine and turn the variable isFinishing inside the Final State Machine to true, but I don't see any code such as turning isComplete to true as the variable isFinishing is turning to true, maybe I need to review the entire code and look the word one by one)


Inside the function transitionToLevel(), the function destroy() and load() are used to create and transtion between the levels.

The function destroy() is exist in all object class. Because the player, enemy, all other object class are extending the class gameObject, and the gameObject class contain the function destroy().
It is also exist in the GameEnv.js, but two destroy functions are not the same.

```javascript
    destroy() {
        const index = GameEnv.gameObjects.indexOf(this);
        if (index !== -1) {
            // Remove the canvas from the DOM
            this.canvas.parentNode.removeChild(this.canvas);
            GameEnv.gameObjects.splice(index, 1);
        }
    }

    ...

    static destroy() {
        // Destroy objects in reverse order
        for (var i = GameEnv.gameObjects.length - 1; i >= 0; i--) {
            const gameObject = GameEnv.gameObjects[i];
            gameObject.destroy();
        }
        GameEnv.gameObjects = [];
    }
```

The GameEnv.destroy() is used to call the destroy() function of all the game objects.
And the destroy function of the game objects is used to remove the object canvas and also remove the object information that store inside the array GameEnv.gameObjects in order for the next level to store his information to the array.

The load() function is used to draw the object as canvas element(creating the canvas element for each object and add them into the div element inside the html file).



## Show in inspect/elements how we can examine the GameObjects (canvas items) and see changes in their properties



## Show in code how we determine the end of level and where we transition between GameLevels.

