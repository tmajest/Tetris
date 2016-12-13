
var TetrisBlock = function(rotations, color, tileWidth, tileHeight) {
    var NUM_TILES_X = 4;
    var NUM_TILES_Y = 4;

    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.rotationIndex = 0;
    this.rotations = rotations;
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
        this.rotationIndex = (this.rotationIndex + 1) % this.rotations.length;
    };

    this.rotateLeft = function() {
        this.rotationIndex = (this.rotationIndex + this.rotations.length - 1) % this.rotations.length;
    };

    this.activeTiles = function() {
        var active = []
        var rotation = this.rotations[this.rotationIndex];

        for (var i = 0; i < NUM_TILES_X; i++) {
            for (var j = 0; j < NUM_TILES_Y; j++) {
                if (rotation[i][j] === 1) 
                    active.push(this.coordinates[i][j]);
            }
        }
        return active;
    };

    this.updateCoordinates = function(xDiff, yDiff) {
        for (var i = 0; i < NUM_TILES_X; i++) {
            for (var j = 0; j < NUM_TILES_Y; j++) {
                this.coordinates[i][j].x += (xDiff * this.tileWidth);
                this.coordinates[i][j].y += (yDiff * this.tileHeight);
            }
        }
    };

    this.draw = function() {
        var tiles = this.activeTiles();
        fill(block.color);
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
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
            this.rotateLeft();
        }
    }

    this.setup();
};
