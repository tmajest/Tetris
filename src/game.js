
(function(game, shapes, settings) {
    var fallTime;
    var MAX_COLS = 10;

    game.block = null;
    game.tiles = [];

    var colors = [
        "green",
        "blue", 
        "magenta", 
        "yellow", 
        "red"];

    game.newBlock = function() {
        var blockType =  Math.floor(Math.random() * 5);
        var color = colors[Math.floor(Math.random() * 5)];
        switch (blockType) {
            case 0: 
                return game.createBlock(
                    shapes.block1,
                    color, 
                    settings);
            case 1: 
                return game.createBlock(
                    shapes.block2,
                    color, 
                    settings);
            case 2:
                return game.createBlock(
                    shapes.block3,
                    color, 
                    settings);
            case 3:
                return game.createBlock(
                    shapes.block4,
                    color, 
                    settings);
            case 4:
                return game.createBlock(
                    shapes.block5,
                    color, 
                    settings);
        }
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

        if (toRemove.length > 0) {
            game.tiles = game.tiles.filter(function(t) {
                return toRemove.indexOf(t) < 0;
            });    

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
})(window.game = window.game || {}, shapes, settings); 
