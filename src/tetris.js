
(function(game, settings) {
    game.NO_COLLISION = 0;
    game.LEFT_COLLISION = 1;
    game.RIGHT_COLLISION = 2;
    game.BOTTOM_COLLISION = 3;

    game.tetrisBlock = function(rotations, color, settings) {
        var NUM_TILES_X = 4;
        var NUM_TILES_Y = 4;

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
                    this.coordinates[i].push(settings.createVector(j * settings.tileSize, i * settings.tileSize));
                }
            }    
            this.activeTiles = this.getActiveTiles(this.coordinates, 0);
        };

        this.rotateRight = function() {
            var newRotation = (this.rotationIndex + 1) % this.rotations.length;
            var newActiveTiles = this.getActiveTiles(this.coordinates, newRotation);
            if (this.getCollisionsHelper(newActiveTiles) === game.NO_COLLISION) {
                this.rotationIndex = newRotation;
                this.activeTiles = newActiveTiles;
            }
        };

        this.rotateLeft = function() {
            var newRotation = (this.rotationIndex + this.rotations.length - 1) % this.rotations.length;
            var newActiveTiles = this.getActiveTiles(this.coordinates, newRotation);
            if (this.getCollisionsHelper(newActiveTiles) === game.NO_COLLISION) {
                this.rotationIndex = newRotation;
                this.activeTiles = newActiveTiles;
            }
        };

        this.updateCoordinates = function(xDiff, yDiff) {
            var newCoordinates = this.getNewCoordinates(xDiff, yDiff);
            var newActiveTiles = this.getActiveTiles(newCoordinates, this.rotationIndex);
            var collision = this.getCollisionsHelper(newActiveTiles);
            if (collision === game.NO_COLLISION) {
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
                    var newX = this.coordinates[i][j].x + (xDiff * settings.tileSize);
                    var newY = this.coordinates[i][j].y + (yDiff * settings.tileSize);
                    newCoordinates[i].push(settings.createVector(newX, newY));
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
                        var vect = coordinates[i][j];
                        newActive.push(game.createTile(vect.x, vect.y, this.color));
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
                    return game.LEFT_COLLISION;
                else if (tile.x + settings.tileSize > settings.screenWidth)
                    return game.RIGHT_COLLISION;
                else if (tile.y + settings.tileSize > settings.screenHeight)
                    return game.BOTTOM_COLLISION;
            }
            return game.NO_COLLISION;
        }

        this.checkBottom = function() {
            for (var i = 0; i < this.activeTiles.length; i++) {
                var tile = this.activeTiles[i];
                if (tile.y + settings.tileSize >= settings.screenHeight)
                    return game.BOTTOM_COLLISION;
            }

            return game.NO_COLLISION;
        }

        this.setup();
    };

    game.createBlock = function(rotations, color) {
        return new game.tetrisBlock(rotations, color, settings);
    };
})(window.game = window.game || {}, settings);
