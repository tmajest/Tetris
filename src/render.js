
var game;
var block;
var screenWidth = 640;
var screenHeight = 480;
var tileSize = 20;

var fallRate = 30;
var fallTime = 0;

function setup() {
    createCanvas(screenWidth, screenHeight);

    game = new Game(screenWidth, screenHeight, tileSize);
    block = game.createBlock();
}

function draw() {
    clear();
    block.draw();

    // Make block fall
    fallTime++;
    if (fallTime > fallRate) {
        block.updateCoordinates(0, 1);
        fallTime = 0;
    }

    if (block.coordinates[0][0].y > displayHeight) {
        block = game.createBlock();
    }
}

function mouseClicked() {
    block.rotateRight();
}

function keyPressed() {
    block.keyPressed();
}
