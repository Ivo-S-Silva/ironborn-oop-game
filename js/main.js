function createDomElement(className){
    const board = document.getElementById("board");
    const newElement = document.createElement("div");
    
    //Identifying the specific type of element we are creating (player, enemy, wall)
    newElement.className = className;

    board.appendChild(newElement);

    return newElement;
}

// Create a function to move a DOM element. instance is passed to identify
// the element to move
function drawDomElement(instance){    
    instance.domElement.style.left  = instance.positionX + "%";
    instance.domElement.style.bottom  = instance.positionY + "%";

    instance.domElement.style.width  = instance.obstacleWidth + "px";
    instance.domElement.style.height  = instance.obstacleHeight + "px";

}

// Starting a new game by creating a new instance of the game class
// Passing the createDomElement function to be able to execute it at game start
const game = new Game(createDomElement, drawDomElement);
game.start();

document.addEventListener('keydown', function(event){
/*Every time an event is fired, you can get the information about it in a variable 
that can be passed inside the function of the event. Using developer tools it's possible to
see all the properties it has to be able to interact with it.*/

switch(event.key){
    case "ArrowRight":
        game.movePlayer("right");
        break;
    case "ArrowLeft":
        game.movePlayer("left");
        break;
}
})