/*
Player:

Info:
- Position


Functionality:
- moveLeft()
- moveRight()
*/

class Game {
    constructor(createElement, drawElement){
        this.player = null;
        // It has the function createDomElement inside this property, passed to the constructor
        this.createElement = createElement;
        this.drawElement = drawElement;
    }

    start(){
        this.player = new Player();
        this.player.domElement = this.createElement("player");
        this.drawElement(this.player);
    }

    movePlayer(direction){
        switch(direction){
            case "left":
                this.player.moveLeft();
                break;
            case "right":
                this.player.moveRight();
                break;
        }
        // Each time the player moves, the element is redrawn
        // Calls the drawElement function and says it's the player
        // that is moving.
        this.drawElement(this.player);
    }
}

class Player {
    constructor(){
        this.positionX = 45;
        this.positionY = 0;
        this.domElement = null;
    }

    moveLeft(){
        // Moving to the left along the X axis. Decreasing the value of the X axis
        this.positionX -=2;
    }    

    moveRight(){
        this.positionX +=2;
    }
}


const myPlayer = new Player();
