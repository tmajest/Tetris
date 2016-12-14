
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
        this.activeTiles = this.getNewTiles(0, 0, 0);
    };

    this.rotateRight = function(placedTiles) {
        var newRotationIndex = (this.rotationIndex + 1) % this.rotations.length;
        var newTiles = this.getNewTiles(newRotationIndex, 0, 0);
        if (this.checkBounds(newTiles, placedTiles)) {
            this.rotationIndex = newRotationIndex;
            this.activeTiles = newTiles;
        }
    };

    this.rotateLeft = function(placedTiles) {
        var newRotationIndex = (this.rotationIndex + 3) % this.rotations.length;
        var newTiles = this.getNewTiles(newRotationIndex, 0, 0);
        if (this.checkBounds(newTiles, placedTiles)) {
            this.rotationIndex = newRotationIndex;
            this.activeTiles = newTiles;
        }
    };

    this.getNewTiles = function(rotationIndex, xDiff, yDiff) {
        var newTiles = []
        var rotation = this.rotations[rotationIndex];

        for (var i = 0; i < NUM_TILES_X; i++) {
            for (var j = 0; j < NUM_TILES_Y; j++) {
                if (rotation[i][j] === 1) {
                    var vect = this.coordinates[i][j];
                    newTiles.push(createVector(
                        vect.x + (xDiff * this.tileWidth), vect.y + (yDiff * this.tileWidth)));
                }
            }
        }
        return newTiles;
    };

    this.updateCoordinates = function(xDiff, yDiff, placedTiles) {
        var newTiles = this.getNewTiles(0, xDiff, yDiff);
        if (!this.checkBounds(newTiles, placedTiles)) {
            return false;
        }

        this.activeTiles = newTiles;
        return true;
    };

    this.checkBounds = function(newTiles, placedTiles) {
        for (var i = 0; i < newTiles.length; i++) {
            var newTile = newTiles[i];
            if (newTile.x < 0 || newTile.x + this.tileWidth >= this.screenWidth ||
                newTile.y < 0 || newTile.y + this.tileHeight >= this.screenHeight) {
                return false;
            }

            if (placedTiles) {
                for (var j = 0; j < placedTiles.length; j++) {
                    var placedTile = placedTiles[j];
                    if (dist(placedTile.x, newTile.x, placedTile.y, newTile.y) < this.tileWidth) {
                        return false;
                    }
                } 
            }
        }

        return true;
    };

    this.draw = function() {
        fill(block.color);
        for (var i = 0; i < this.activeTiles.length; i++) {
            var tile = this.activeTiles[i];
            rect(tile.x, tile.y, this.tileWidth, this.tileHeight);
        }
    }

    this.keyPressed = function(placedTiles) {
        if (keyCode === LEFT_ARROW) {
            this.updateCoordinates(-1, 0, placedTiles);
        } else if (keyCode === RIGHT_ARROW) {
            this.updateCoordinates(1, 0, placedTiles);
        } else if (keyCode === UP_ARROW) {
            this.rotateRight(placedTiles);
        } else if (keyCode === DOWN_ARROW) {
            this.updateCoordinates(0, 1, placedTiles);
        }
    }

    this.setup();
};
