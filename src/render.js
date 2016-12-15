
var game;
var block;
var screenWidth = 400;
var screenHeight = 480;
var tileSize = 20;

var fallRate = 30;
var fallTime = 0;

function setup() {
    createCanvas(screenWidth, screenHeight);

    game = new Game(tileSize, screenWidth, screenHeight);
    block = game.createBlock();
}

function draw() {
    clear();
    background(100);

    block.draw();

    // Make block fall
    fallTime++;
    if (fallTime > fallRate) {
        if (block.checkBottom() === BOTTOM_COLLISION)
            block = game.createBlock();

        block.updateCoordinates(0, 1);
        fallTime = 0;
    }
}

function keyPressed() {
    block.keyPressed();
}
