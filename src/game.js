
(function(game, shapes, colors, settings) {
    var fallTime;
    var MAX_COLS = 10;

    game.block = null;
    game.tiles = [];


    game.newBlock = function() {
        var shape = shapes.newShape();
        var color = colors.newColor();
        return game.createBlock(shape, color, settings);
    }

    game.activeTiles = function() {
        return game.block.activeTiles;
    };

    game.removeFullRows = function() {
        var counts = {};
        var toRemove = [];
        for (var i = 0; i < game.tiles.length; i++) {
            var tile = game.tiles[i];
            if (tile.y in counts) {
                counts[tile.y].push(tile);
            } else {
                counts[tile.y] = [tile];
            }

            if (counts[tile.y].length === MAX_COLS) {
                toRemove.push(tile.y);
            }
        }

        if (toRemove.length >= 0) {
            // Remove tiles in full rows
            for (var i = game.tiles.length - 1; i >= 0; i--) {
                var tile = game.tiles[i];
                if (toRemove.indexOf(tile.y) >= 0)
                    game.tiles.splice(i, 1);
            }

            // Push down rest of tiles
            for (var i = 0; i < game.tiles.length; i++) {
                var tile = game.tiles[i];
                tile.y += settings.tileSize * toRemove.length;
            }
        }
    };

    game.update = function() {
        if (fallTime++ > settings.fallRate) {
            game.block.updateCoordinates(0, 1, false);
            fallTime = 0;
        };

        if (game.block.checkBottom(game.tiles) === game.BOTTOM_COLLISION) {
            game.block.updateCoordinates(0, -1, false);
            for (var i = 0; i < game.block.activeTiles.length; i++) {
                game.tiles.push(game.block.activeTiles[i]);
            }
            game.block = game.newBlock();
            game.removeFullRows();
        }

    }

    game.init = function() {
        fallTime = 0;
        game.block = game.newBlock();
    }
})(window.game = window.game || {}, shapes, colors, settings);
