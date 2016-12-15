
(function(game, shapes, settings) {
    var fallTime;

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

    game.update = function() {
        if (game.block.checkBottom() == game.BOTTOM_COLLISION) {
            for (var i = 0; i < game.block.activeTiles.length; i++) {
                game.tiles.push(game.block.activeTiles[i]);
                game.block = game.newBlock();
            }
        }

        // Make block fall
        if (fallTime++ > settings.fallRate) {
            //if (block.checkBottom() === BOTTOM_COLLISION)
                //block = game.createBlock();

            game.block.updateCoordinates(0, 1);
            fallTime = 0;
        };
    }

    game.init = function() {
        fallTime = 0;
        game.block = game.newBlock();
    }
})(window.game = window.game || {}, shapes, settings); 
