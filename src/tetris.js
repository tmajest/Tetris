
var TetrisBlock = function(rotations, color, tileWidth, tileHeight) {
    var NUM_TILES_X = 4;
    var NUM_TILES_Y = 4;

    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
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
                this.coordinates[i].push(createVector(j * tileWidth, i * tileHeight));
            }
        }    
    };

    this.rotateRight = function() {
        var newRotation = (this.rotationIndex + 1) % this.rotations.length;
        var newActiveTiles = this.getActiveTiles(this.coordinates, newRotation);
        if (this.checkBounds(newActiveTiles)) {
            this.rotationIndex = newRotation;
            this.activeTiles = newActiveTiles;
        }
    };

    this.rotateLeft = function() {
        var newRotation = (this.rotationIndex + this.rotations.length - 1) % this.rotations.length;
        var newActiveTiles = this.getActiveTiles(this.coordinates, newRotation);
        if (this.checkBounds(newActiveTiles)) {
            this.rotationIndex = newRotation;
            this.activeTiles = newActiveTiles;
        }
    };

    this.updateCoordinates = function(xDiff, yDiff) {
        var newCoordinates = this.getNewCoordinates(xDiff, yDiff);
        var newActiveTiles = this.getActiveTiles(newCoordinates, this.rotationIndex);
        if (this.checkBounds(newActiveTiles)) {
            this.coordinates = newCoordinates;
            this.activeTiles = newActiveTiles;
        }
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

    this.checkBounds = function(tiles) {
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (tile.x < 0 || tile.x + this.tileWidth >= this.screenWidth ||
                tile.y < 0 || tile.y + this.tileHeight >= this.screenHeight) {
                return false;
            }
        }
        return true;
    }

    this.draw = function() {
        fill(block.color);
        for (var i = 0; i < this.activeTiles.length; i++) {
            var tile = this.activeTiles[i];
            rect(tile.x, tile.y, tileWidth, tileHeight);
        }
    }


    this.keyPressed = function() {
        if (keyCode === LEFT_ARROW) {
            this.updateCoordinates(-1, 0);
        } else if (keyCode === RIGHT_ARROW) {
            this.updateCoordinates(1, 0);
        } else if (keyCode === UP_ARROW) {
            this.rotateRight();
        } else if (keyCode === DOWN_ARROW) {
            this.updateCoordinates(0, 1);
        }
    }

    this.setup();
};
