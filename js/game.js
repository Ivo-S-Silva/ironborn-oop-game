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
        // create & draw Player
        this.player = new Player();
        this.player.domElement = this.createElement("player");
        this.drawElement(this.player);

        // create & draw Obstacle
        this.obstacle = new Obstacle();
        this.obstacle.domElement = this.createElement("obstacle")
        this.drawElement(this.obstacle);

        let intervalId = setInterval(() => {
            this.obstacle.moveDown();
            this.drawElement(this.obstacle);
            // if (this.obstacle.positionY === 0)
        }, 50);
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
        this.positionX --;
    }    

    moveRight(){
        this.positionX ++;
    }
}


class Obstacle {
    constructor(){
        this.positionX = 50;
        this.positionY = 90;
        this.domElement = null;
    }

    moveDown(){
        this.positionY --;
    }
}