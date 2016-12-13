

var Game = function(screenWidth, screenHeight, tileSize) {
    var placedBlocks = []
    var activeBlock = null;

    this.tileWidth = tileSize;
    this.tileHeight = tileSize;

    // Long skinny block
    this.block1Rotations = [
        [[0, 1, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0]],

        [[0, 0, 0, 0],
         [1, 1, 1, 1],
         [0, 0, 0, 0],
         [0, 0, 0, 0]]];

    // L-shaped block
    this.block2Rotations = [
        [[0, 0, 0, 0],
         [0, 1, 1, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0]],

        [[0, 0, 0, 0],
         [1, 1, 1, 0],
         [0, 0, 1, 0],
         [0, 0, 0, 0]],

        [[0, 0, 0, 0],
         [0, 0, 1, 0],
         [0, 0, 1, 0],
         [0, 1, 1, 0]],

        [[0, 0, 0, 0],
         [0, 0, 0, 0],
         [1, 0, 0, 0],
         [1, 1, 1, 0]]];

    // Square block
    this.block3Rotations = [
        [[0, 0, 0, 0],
         [0, 0, 0, 0],
         [1, 1, 0, 0],
         [1, 1, 0, 0]]];

    // T-shaped block
    this.block4Rotations = [
        [[0, 0, 0, 0],
         [0, 1, 0, 0],
         [1, 1, 1, 0],
         [0, 0, 0, 0]],

        [[0, 0, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 1, 0],
         [0, 1, 0, 0]],

        [[0, 0, 0, 0],
         [0, 0, 0, 0],
         [1, 1, 1, 0],
         [0, 1, 0, 0]],

        [[0, 0, 0, 0],
         [0, 1, 0, 0],
         [1, 1, 0, 0],
         [0, 1, 0, 0]]];

    this.colors = [color("green"), color("blue"), color("magenta"), color("yellow"), color("red")];

    this.createBlock = function() {
        var blockType =  Math.floor(Math.random() * 4);
        var color = this.colors[Math.floor(Math.random() * 5)];
        switch (blockType) {
            case 0: return new TetrisBlock(this.block1Rotations, color, this.tileWidth, this.tileHeight);
            case 1: return new TetrisBlock(this.block2Rotations, color, this.tileWidth, this.tileHeight);
            case 2: return new TetrisBlock(this.block3Rotations, color, this.tileWidth, this.tileHeight);
            case 3: return new TetrisBlock(this.block4Rotations, color, this.tileWidth, this.tileHeight);
        }
    }
}
