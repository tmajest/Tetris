
var NO_COLLISION = 0;
var LEFT_COLLISION = 1;
var RIGHT_COLLISION = 2;
var BOTTOM_COLLISION = 3;

var TetrisBlock = function(rotations, color, tileSize, screenWidth, screenHeight) {
    var NUM_TILES_X = 4;
    var NUM_TILES_Y = 4;

    this.tileWidth = tileSize;
    this.tileHeight = tileSize;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.rotationIndex = 0;
    this.rotations = rotations;
    this.activeTiles = [];
    this.coordinates = [];
    this.color = color;

    this.setup = function() {
        this.coordinates = [];
        for (var i = 0; i < NUM_TILES_X; i++) {
            this.coordinates.push([]);
            for (var j = 0; j < NUM_TILES_Y; j++) {
                this.coordinates[i].push(createVector(j * this.tileWidth, i * this.tileHeight));
            }
        }    
        this.activeTiles = this.getActiveTiles(this.coordinates, 0);
    };

    this.rotateRight = function() {
        var newRotation = (this.rotationIndex + 1) % this.rotations.length;
        var newActiveTiles = this.getActiveTiles(this.coordinates, newRotation);
        if (this.getCollisionsHelper(newActiveTiles) === NO_COLLISION) {
            this.rotationIndex = newRotation;
            this.activeTiles = newActiveTiles;
        }
    };

    this.rotateLeft = function() {
        var newRotation = (this.rotationIndex + this.rotations.length - 1) % this.rotations.length;
        var newActiveTiles = this.getActiveTiles(this.coordinates, newRotation);
        if (this.getCollisionsHelper(newActiveTiles) === NO_COLLISION) {
            this.rotationIndex = newRotation;
            this.activeTiles = newActiveTiles;
        }
    };

    this.updateCoordinates = function(xDiff, yDiff) {
        var newCoordinates = this.getNewCoordinates(xDiff, yDiff);
        var newActiveTiles = this.getActiveTiles(newCoordinates, this.rotationIndex);
        var collision = this.getCollisionsHelper(newActiveTiles);
        if (collision === NO_COLLISION) {
            this.coordinates = newCoordinates;
            this.activeTiles = newActiveTiles;
        }

        return collision;
    };

    this.getNewCoordinates = function(xDiff, yDiff) {
        var newCoordinates = []
        for (var i = 0; i < NUM_TILES_X; i++) {
            newCoordinates.push([]);
            for (var j = 0; j < NUM_TILES_Y; j++) {
                var newX = this.coordinates[i][j].x + (xDiff * this.tileWidth);
                var newY = this.coordinates[i][j].y + (yDiff * this.tileHeight);
                newCoordinates[i].push(createVector(newX, newY));
            }
        }
        return newCoordinates;
    };

    this.getActiveTiles = function(coordinates, rotation) {
        var rotationMap = this.rotations[rotation];
        var newActive = [];
        for (var i = 0; i < NUM_TILES_X; i++) {
            for (var j = 0; j < NUM_TILES_Y; j++) {
                if (rotationMap[i][j] === 1) {
                    newActive.push(coordinates[i][j]);
                } 
            }
        }
        return newActive;
    }

    this.getCollisions = function() {
        return this.getCollisionsHelper(this.activeTiles);
    }

    this.getCollisionsHelper = function(tiles) {
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (tile.x < 0)
                return LEFT_COLLISION;
            else if (tile.x + this.tileWidth > this.screenWidth)
                return RIGHT_COLLISION;
            else if (tile.y + this.tileHeight > this.screenHeight)
                return BOTTOM_COLLISION;
        }
        return NO_COLLISION;
    }

    this.checkBottom = function() {
        for (var i = 0; i < this.activeTiles.length; i++) {
            var tile = this.activeTiles[i];
            if (tile.y + this.tileHeight >= this.screenHeight)
                return BOTTOM_COLLISION;
        }

        return NO_COLLISION;
    }

    this.draw = function() {
        fill(block.color);
        for (var i = 0; i < this.activeTiles.length; i++) {
            var tile = this.activeTiles[i];
            rect(tile.x, tile.y, this.tileWidth, this.tileHeight);
        }
    }

    this.keyPressed = function() {
        if (keyCode === LEFT_ARROW) {
            this.updateCoordinates(-1, 0, placedTiles);
        } else if (keyCode === RIGHT_ARROW) {
            this.updateCoordinates(1, 0, placedTiles);
        } else if (keyCode === UP_ARROW) {
            this.rotateRight(placedTiles);
        } else if (keyCode === DOWN_ARROW) {
            this.updateCoordinates(0, 1);
        }
    }

    this.setup();
};
