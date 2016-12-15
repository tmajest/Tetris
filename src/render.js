
(function(render, game, settings) {})(window.render = window.render || 
    new p5(function(p) {
        p.setup = function() {
            p.createCanvas(settings.screenWidth, settings.screenHeight);
            game.init();
        };

        p.draw = function() {
            p.clear();
            p.background(100);

            p.fill(game.block.color);
            var blockTiles = game.block.activeTiles;
            for (var i = 0; i < blockTiles.length; i++) {
                var tile = blockTiles[i];
                p.rect(tile.x, tile.y, settings.tileSize, settings.tileSize);
            }

            for (var i = 0; i < game.tiles.length; i++) {
                var placedTile = game.tiles[i];
                p.fill(placedTile.color);
                p.rect(placedTile.x, placedTile.y, settings.tileSize, settings.tileSize);
            }

            game.update()
        };

        p.keyPressed = function() {
            if (p.keyCode === p.LEFT_ARROW) {
                game.block.updateCoordinates(-1, 0);
            } else if (p.keyCode === p.RIGHT_ARROW) {
                game.block.updateCoordinates(1, 0);
            } else if (p.keyCode === p.UP_ARROW) {
                game.block.rotateRight();
            } else if (p.keyCode === p.DOWN_ARROW) {
                game.block.updateCoordinates(0, 1);
            }
        };
    }),
    game,
    settings);
