/*
Player:

Info:
- Position


Functionality:
- moveLeft()
- moveRight()
*/

class Game {
  constructor(createElement, drawElement) {
    this.player = null;
    // It has the function createDomElement inside this property, passed to the constructor
    this.createElement = createElement;
    this.drawElement = drawElement;
    this.objectArray = [];
    this.obstacleCounter = 0;
  }

  start() {
    // create & draw Player
    this.player = new Player();
    this.player.domElement = this.createElement("player");
    this.drawElement(this.player);


    let intervalId = setInterval(() => {
      if (this.obstacleCounter === 30) {
        this.obstacle = new Obstacle();
        this.obstacle.domElement = this.createElement("obstacle");
        this.drawElement(this.obstacle);

        // we add every new obstacle to the obstacle array
        this.objectArray.push(this.obstacle);

        this.obstacleCounter = Math.floor(Math.random() * 30);
      }

      this.objectArray.forEach((element) => {
        if(element.positionY === 0) {
          // Removing the element from the array as he reaches the bottom
          this.objectArray.shift();

          element.domElement.remove();
        };
      
        console.log(this.objectArray.length);

        element.moveDown();
        this.drawElement(element);
      });
      this.obstacleCounter += 1;
    }, 100);
  }

  movePlayer(direction) {
    switch (direction) {
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
  constructor() {
    this.positionX = 45;
    this.positionY = 0;
    this.domElement = null;
  }

  moveLeft() {
    // Moving to the left along the X axis. Decreasing the value of the X axis
    if (this.positionX > 0){
    this.positionX--;
  }
  }

  moveRight() {
    if (this.positionX < 92){
    this.positionX++;
  }
  }
}

class Obstacle {
  constructor() {
    this.positionX = Math.floor(Math.random() * 80);
    this.positionY = 90;
    this.obstacleHeight = 20;
    this.obstacleWidth = Math.floor(10 + Math.random() * 90);
    this.domElement = null;
  }

  moveDown() {
    this.positionY--;
  }

  // deleteObstacle(element){
  //   if(element.positionY === 0){
        
  //       // Delete object from array


  //       // Delete DOM element 
  //   }     
  // }
}
