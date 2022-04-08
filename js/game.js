class Game {
  constructor(createElement, drawElement, board) {
    this.player = null;
    this.board = document.getElementById("board");
    // It has the function createDomElement inside this property, passed to the constructor
    this.createElement = createElement;
    this.drawElement = drawElement;
    this.obstacleArray = [];
    this.bulletArray = [];
    this.obstacleCounter = 0;
  }

  start() {
    // create & draw Player
    this.player = new Player();
    this.player.domElement = this.createElement("player");
    this.drawElement(this.player);

    let intervalId = setInterval(() => {
      // Creating New obstacles
      if (this.obstacleCounter === 30) {
        const newObstacle = new Obstacle();
        newObstacle.domElement = this.createElement("obstacle");
        this.drawElement(newObstacle);

        // we add every new obstacle to the obstacle array
        this.obstacleArray.push(newObstacle);

        this.obstacleCounter = Math.floor(Math.random() * 30);
      }

      this.obstacleArray.forEach((obstacle) => {
        if (obstacle.positionY === 0) {
          // Removing the element from the array as he reaches the bottom
          obstacle.deleteObstacle(obstacle, this.obstacleArray);
        }

        // Moving the obstacles and detecting collision with the player
        obstacle.moveDown();
        this.drawElement(obstacle);

        // if there is collision between player and obstacle
        if (this.detectCollision(this.player, obstacle)) {
          this.obstacleArray = [];
          this.bulletArray = [];

          while (this.board.firstChild) {
              this.board.removeChild(this.board.firstChild);
          }

          this.player = new Player();
          this.player.domElement = this.createElement("player");
          this.drawElement(this.player);
        }

        // Detecting collision between specific objects and the specific bullets
        this.bulletArray.forEach((bullet) => {
          if (this.detectCollision(bullet, obstacle)) {
            bullet.deleteBullet(bullet, this.bulletArray);
            obstacle.deleteObstacle(obstacle, this.obstacleArray);
          }
        });
      });
      this.obstacleCounter += 1;

      //Moving the bullets and deleting at the top
      this.bulletArray.forEach((bullet) => {
        if (bullet.positionY === 100) {
          bullet.deleteBullet(bullet, this.bulletArray);
        }

        bullet.moveUp();
        this.drawElement(bullet);
      });
    }, 50);
  }

  detectCollision(element, obstacle) {
    if (
      element.positionX < obstacle.positionX + obstacle.width &&
      element.positionX + element.width > obstacle.positionX &&
      element.positionY < obstacle.positionY + obstacle.height &&
      element.height + element.positionY > obstacle.positionY
    ) {
      return true;
    }
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

  shoot() {
    const newBullet = new Bullet(this.player.positionX);
    newBullet.domElement = this.createElement("bullet");
    this.drawElement(newBullet);

    this.bulletArray.push(newBullet);
  }
}

class Player {
  constructor() {
    this.positionX = 50;
    this.positionY = 0;
    this.width = 10;
    this.height = 5;
    this.domElement = null;
  }

  moveLeft() {
    // Moving to the left along the X axis. Decreasing the value of the X axis
    if (this.positionX > 0) {
      this.positionX--;
    }
  }

  moveRight() {
    if (this.positionX < 92) {
      this.positionX++;
    }
  }
}

class Obstacle {
  constructor() {
    this.positionX = Math.floor(Math.random() * 80);
    this.positionY = 90;
    this.height = 5;
    this.width = Math.floor(10 + Math.random() * 10);
    this.domElement = null;
  }

  moveDown() {
    this.positionY--;
  }

  deleteObstacle(element, obstacleArray) {
    obstacleArray.splice(obstacleArray.indexOf(element), 1);
    // Delete object from array
    // Delete DOM element
    element.domElement.remove();
  }
}

class Bullet {
  constructor(positionX) {
    this.positionX = positionX + 5;
    this.positionY = 5;
    this.height = 3;
    this.width = 3;
  }

  moveUp() {
    this.positionY++;
  }

  deleteBullet(bullet, bulletArray) {
    bulletArray.splice(bulletArray.indexOf(bullet), 1);
    // Delete object from array
    // Delete DOM element
    bullet.domElement.remove();
  }
}
