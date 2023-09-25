---
toc: True
comments: False
layout: post
title: Sprite Animation Tutorial, with character movement, wall collision
type: hacks
---

%%html

<body>
    <div>
        <canvas id="spriteContainer"> <!-- Within the base div is a canvas. An HTML canvas is used only for graphics. It allows the user to access some basic functions related to the image created on the canvas (including animation) -->
            <img id="dogSprite" src="https://tianbinliu.github.io/Personalblog3/images/spritesheet/dogSprites.png">
        </canvas>
    </div>
</body>

<script>
    window.addEventListener('load', function () {
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 160;
        const SPRITE_HEIGHT = 144;
        const SCALE_FACTOR = 2;
        const FRAME_LIMIT = 48;
        
        canvas.width = window.innerWidth/2;
        canvas.height = window.innerHeight/2;

        class Dog {
            constructor() {
                this.image = document.getElementById("dogSprite");
                this.spriteWidth = SPRITE_WIDTH;
                this.spriteHeight = SPRITE_HEIGHT;
                this.width = this.spriteWidth;
                this.height = this.spriteHeight;
                this.x = 0;
                this.y = 0;
                this.scale = 1;
                this.minFrame = 0;
                this.maxFrame = FRAME_LIMIT;
                this.frameX = 0;
                this.frameY = 0;
            }

            draw(context) {
                context.drawImage(
                    this.image,
                    this.frameX * this.spriteWidth,
                    this.frameY * this.spriteHeight,
                    this.spriteWidth,
                    this.spriteHeight,
                    this.x,
                    this.y,
                    this.width * this.scale,
                    this.height * this.scale
                );
            }

            update() {
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                } else {
                    this.frameX = 0;
                }
            }
        }

        const dog = new Dog();

dog.frameY = 1;
let currentdir = "null";
let pastdir = "null";
let bark = false;

addEventListener("keydown", function (event) {
    console.log(event.code)
    if (event.code == 'ArrowRight') {

    if(!bark){
          if(currentdir == "null" || currentdir=="right"){
            currentdir = "right";
            pastdir = "right";
            dog.frameY = 5;
            dog.x += 5;
          }
    }

    }
    if (event.code == 'ArrowLeft') {
    if(!bark){
        if(currentdir == "null" || currentdir=="left"){
        currentdir = "left";
        pastdir="left";
        dog.frameY = 2;
        dog.x -= 5;
        }
    }

    }
    if (event.code == 'ArrowDown') {
        if(!bark){
        if(pastdir=="right"){
            if(currentdir=="null"){
                dog.frameY = 5;
            }
        }
        else if(pastdir=="left"){
            if(currentdir=="null"){
                dog.frameY = 2;
            }
        }
        dog.y+=5;
        }

    }
    if (event.code == 'ArrowUp') {
        if(!bark){
        if(pastdir=="right"){
            if(currentdir=="null"){
                dog.frameY = 5;
            }
        }
        else if(pastdir=="left"){
            if(currentdir=="null"){
                dog.frameY = 2;
            }
        }
        dog.y-=5;
        }
    }
    if(event.code=='Space'){
        bark=true;
        if(dog.frameY==3 || dog.frameY==5){
            dog.frameY = 4;
        }
        else if(dog.frameY==0 || dog.frameY==2){
            dog.frameY = 1;
        }
    };
})

addEventListener("keyup", function (event) {
    if (event.code == 'ArrowRight') {
        if(!bark){
        if(currentdir=="right"){
            currentdir="null";
            dog.frameY=3;
        }
        }

    };
    if (event.code == 'ArrowLeft') {
        if(!bark){
            if(currentdir=="left"){
            currentdir="null";
            dog.frameY=0;
        }  
        }

    };
    if (event.code == 'ArrowDown') {
        if(!bark){
        if(currentdir=="null"){
        if(dog.frameY==5){
            dog.frameY=3;
        }
        else if(dog.frameY=2){
            dog.frameY=0;
        }
        }
        }


    };
    if (event.code == 'ArrowUp') {
        if(!bark){
        if(currentdir=="null"){
        if(dog.frameY==5){
            dog.frameY=3;
        }
        else if(dog.frameY=2){
            dog.frameY=0;
        }
        } 
        }
    }
    if(event.code=='Space'){
        bark=false;
        if(dog.frameY == 4){
            dog.frameY = 3;
        }
        else if(dog.frameY == 1){
            dog.frameY = 0;
        }
    };
})
addEventListener("click", function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    console.log("Mouse click at X: " + mouseX + ", Y: " + mouseY);
    if (dog.x !== mouseX) {
        if (dog.x < mouseX) {
            dog.x += 1;
        } else {
            dog.x -= 1;
        }
    }

    if (dog.y !== mouseY) {
        if (dog.y < mouseY) {
            dog.y += slope;
        } else {
            dog.y -= slope;
        }
    }
});


        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dog.draw(ctx);
            dog.update();
            requestAnimationFrame(animate);
        }

        animate();
    });
</script>
