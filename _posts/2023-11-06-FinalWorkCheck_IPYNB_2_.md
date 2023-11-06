---
toc: True
comments: True
layout: post
title: Final Work Check
type: hacks
---

## Combat System
### During the game loop(the function below, which will run repeatedly), I add a if-statement to check if the boolean valuable "Battle" is set to true or not. If it is set as true, that means the user has already attack the monster on the map, and the game should change to Combat mode. As the "Battle" is set to true, every time the function startGameLoop repeat, the battle() will also run again


```python
  startGameLoop() {
    const step = () => {
      // Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Establish the camera person
      const cameraPerson = this.map.gameObjects.hero;

      // Update all objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          map: this.map,
        });
      });

      // Draw Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      // Draw Game Objects
      Object.values(this.map.gameObjects).sort((a, b) => {
        return a.y - b.y;
      }).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      });

      // Draw Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);

      if(Battle){
        this.map.battle();   //activate combat mode
      }

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }
```

### To change the boolean valuable "Battle", I set up a KeyPressListener, every time when the user press "Enter", it will run the function checkForActionCutscene(). The if-statement with condition "canMove" is to check if the character control by the user is in world event(such as conversation with npc, if the user is already in the conversation with npc, the "canMove" will set to false so that the character control by the user cannot move anymore) or not. If the user is already in such world event("canMove" = false) or the user is already in combat mode("Battle" = true), then user cannot attack and activate combat mode.


```python
if (canMove) {
    new KeyPressListener("Space", () => {
      if(!Battle){
        this.map.checkForBattle();
      }
    });
  }
```

### the function checkForBattle() below is used to check if the user's character is "touch"/near the monster or not (confirm that the user's attack actually hit the monster/NPCs). It also check the object user attack to is a NPC, monster, or object on the map, and based on who the user attack to, it will run different if-statement and have different effects to it. 


```python
checkForBattle() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.heronextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      if (object.isMounted) {
        if ((((nextCoords.x) >= (object.Wallx) && ((nextCoords.x - object.WallSizex) <= (object.Wallx + object.WallSizex))) && ((nextCoords.y >= (object.Wally)) && (nextCoords.y <= (object.Wally + (object.WallSizey)))))) {
          object.reach = true;
        }
        return object.reach;
      }
    });
    if (!this.isCutscenePlaying && match && match.alive) {
      match.hp -= 1;
      if (match.hp > 0) {
        setTimeout(() => {
          this.startCutscene(match.talking[1].Receiveattackevents, match.alive);
        }, 500); // Delay for 0.5 second (500 milliseconds)
      }
      else if (match.hp <= 0) {
        setTimeout(() => {
          this.startCutscene(match.talking[2].death, match.alive);
        }, 500); // Delay for 0.5 second (500 milliseconds)

        match.alive = false;
        match.createSprite();
        console.log(match)
        match.behaviorLoop = [];
        if (typeof (this.cutsceneSpaces[match.id]) !== "undefined") {
          this.cutsceneSpaces[match.id][0].events = {};
        }
        match.isMounted = false;
      }
      if(match.monster){
        Battle = true;
        match.behaviorLoop = [];
        battlepreperation();
        window.OverworldMaps[match.type + "battle"].gameObjects[match.type].src = match.src;
        window.OverworldMaps[match.type + "battle"].gameObjects[match.type].createSprite();
        this.startCutscene(this.cutsceneSpaces[match.type + "battle"][0].events, match.alive)
        match.alive = false;
        match.isMounted = false;
        setTimeout(() => {
          match.createSprite();
        }, 500); 
        if(persondirection === "left"){
          window.OverworldMaps[match.type + "battle"].gameObjects["hero"].x = utils.withGrid(19);
          window.OverworldMaps[match.type + "battle"].gameObjects["hero"].direction = "left";
          window.OverworldMaps[match.type + "battle"].gameObjects[match.type].x = utils.withGrid(12);
        }
        else if(persondirection === "right"){
          window.OverworldMaps[match.type + "battle"].gameObjects["hero"].x = utils.withGrid(12);
          window.OverworldMaps[match.type + "battle"].gameObjects["hero"].direction = "right";
          window.OverworldMaps[match.type + "battle"].gameObjects[match.type].x = utils.withGrid(21);
          window.OverworldMaps[match.type + "battle"].gameObjects[match.type].direction = "left";
        }
      }

    }
  }
```

### the function changeMap() below is used to change the background/map of the game. changeMap itself is one of the world events list inside cutsceneSpaces. So that based on what type of object the user attack to (monster, npc, or object), it will change to different maps


```python
this.startCutscene(this.cutsceneSpaces[match.type + "battle"][0].events, match.alive)
//-------------------------------------------------------------------
marketplace: new Person({
  isMounted: true,
  x: utils.withGrid(15),
  y: utils.withGrid(24),
  Wallx: utils.withGrid(13),
  Wally: utils.withGrid(24),
  WallSizex: utils.withGrid(2),
  WallSizey: utils.withGrid(1),
  sizex: 196,
  sizey: 228,
  reach: false,
  id: "marketplace",
  type: "object",   // type of object
  ifdialogue: true,
  src: "https://tianbinliu.github.io/CSSE-Tri1-FinalProject/images/characters/marketplace.png",
}),
slime: new Person({
  isMounted: true,
  x: utils.withGrid(15),
  y: utils.withGrid(30),
  Wallx: utils.withGrid(13.5),
  Wally: utils.withGrid(28.5),
  WallSizex: utils.withGrid(1),
  WallSizey: utils.withGrid(1),
  sizex: 32,
  sizey: 32,
  hp: 2,
  reach: false,
  alive: true,
  id: "slime",
  monster: true,
  type: "slime", //type of object
  ifdialogue: true,
  ...
}),
//-------------------------------------------------------------------
changeMap(resolve) {
  const sceneTransition = new SceneTransition();
  sceneTransition.init(document.querySelector(".game-container"), () => {
  this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
  resolve();
    sceneTransition.fadeOut();
  })
}

//-----------------------------------------------
cutsceneSpaces: {
    ["slimebattle"]:[
      {
        events:[
          {type: "changeMap", map: "slimebattle" }
        ]
      }
    ],
    ["marketplace"]:[
      {
        events:[
          {type: "changeMap", map: "marketplace" }
        ]
      }
    ]
  }
```

### And same for other world event like different attacks or the different dialogs/textmessenge.


```python
cutsceneSpaces: {

    ["heroFirst"]:[
      {
        events: [
          { type: "textMessage", text: "Note: Now you're in trouble!" },
          { type: "textMessage", text: "You will have a fair battle with a slime!" },
          { type: "textMessage", text: "This will be a turn-base battle" },
          { type: "textMessage", text: "You need to use number key 1/2/3/4 to attack and activate your skills!" },
          { type: "textMessage", text: "Now enjor your battle!" },
          { type: "textMessage", text: "You Start First" },
        ]
      }
    ],
    ["slimeFirst"]:[
      {
        events: [
          { type: "textMessage", text: "Note: Now you're in trouble!" },
          { type: "textMessage", text: "You will have a fair battle with a slime!" },
          { type: "textMessage", text: "This will be a turn-base battle" },
          { type: "textMessage", text: "You need to use number key 1/2/3/4 to attack and activate your skills!" },
          { type: "textMessage", text: "Now enjor your battle!" },
          { type: "textMessage", text: "Slime Start First" },
        ]
      }
    ],
    ["slimeattackleft"]: [
      {
        events: [
          { who: "slime", type: "walk", direction: "left", spritedirection: "left" },
          { who: "slime", type: "walk", direction: "left", spritedirection: "left" },
          { who: "slime", type: "walk", direction: "left", spritedirection: "left" },
          { who: "slime", type: "walk", direction: "left", spritedirection: "left" },
          { who: "slime", type: "walk", direction: "left", spritedirection: "left" },
          { who: "slime", type: "walk", direction: "left", spritedirection: "left" },
          { who: "slime", type: "walk", direction: "left", spritedirection: "left" },
          { who: "slime", type: "walk", direction: "left", spritedirection: "left" },
          { type: "textMessage", text: "Slime attack! " },
          { who: "slime", type: "stand", direction: "left", time: 500 },
          { who: "slime", type: "attack", direction: "left", spritedirection: "left" },
          { type: "textMessage", text: "You receive 1 demage" },
          { who: "slime", type: "stand", direction: "right", time: 500 },
          { who: "slime", type: "walk", direction: "right", spritedirection: "right" },
          { who: "slime", type: "walk", direction: "right", spritedirection: "right"  },
          { who: "slime", type: "walk", direction: "right", spritedirection: "right" },
          { who: "slime", type: "walk", direction: "right", spritedirection: "right"  },
          { who: "slime", type: "walk", direction: "right", spritedirection: "right" },
          { who: "slime", type: "walk", direction: "right", spritedirection: "right"  },
          { who: "slime", type: "walk", direction: "right", spritedirection: "right" },
          { who: "slime", type: "walk", direction: "right", spritedirection: "right"  },
          { who: "slime", type: "stand", direction: "left", time: 500 },
          { type: "textMessage", text: "Your Turn!" },
          { type: "textMessage", text: "Normal attack(key 1)/Crescent(key 2)/Upslash(key 3)/Flurry(key 4)" },
        ]
      }
    ],
    ...
  }
```

## I have more stuffs to show up, but you know everything are connected to each other, if I want to explain deeply, then I might need to explain the whole projects... I think what I have right now are enough to present my work for this trimester and can prove that I'm fully participate in it.
