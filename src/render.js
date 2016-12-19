
/**
 * Render the game board and tetris blocks.
 */
(function(render, tetris, colors, settings) {})(
    window.render = window.render ||
    new p5(function(p) {

        /**
         * P5 setup function.
         */
        p.setup = function() {
            p.createCanvas(settings.screenWidth, settings.screenHeight);
            tetris.init();
            p.strokeWeight(3);
        };

        /**
         * P5 draw function.
         */
        p.draw = function() {
            p.clear();
            p.background(colors.backgroundColor);

            // Update the game state every 40 frames
            if (p.frameCount % settings.fallRate === 0) {
                tetris.update();
            }

            // Draw placed tiles
            for (var i = 0; i < tetris.COLS; i++) {
                for (var j = 0; j < tetris.ROWS; j++) {
                    var color = tetris.board[i][j];
                    if (color) {
                        p.fill(color.fillColor);
                        p.stroke(color.outlineColor);
                        p.rect(
                            i * settings.tileSize,
                            j * settings.tileSize,
                            settings.tileSize,
                            settings.tileSize);
                    }
                }
            }

            // Draw active block
            var n = tetris.block.matrix.length;
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    if (tetris.block.matrix[i][j] === 1) {
                        p.fill(tetris.block.color.fillColor);
                        p.stroke(tetris.block.color.outlineColor);
                        p.rect(
                            (tetris.block.x + i) * settings.tileSize,
                            (tetris.block.y + j) * settings.tileSize,
                            settings.tileSize,
                            settings.tileSize);
                    }
                }
            }
        };

        /**
         * KeyPressed function - handle moving and rotating the active tetris block.
         */
        p.keyPressed = function() {
            if (p.keyCode === p.LEFT_ARROW) {
                tetris.moveBlock(-1, 0);
            } else if (p.keyCode === p.RIGHT_ARROW) {
                tetris.moveBlock(1, 0);
            } else if (p.keyCode === p.UP_ARROW) {
                tetris.rotateBlock();
            } else if (p.keyCode === p.DOWN_ARROW) {
                tetris.moveBlock(0, 1);
            }
        };
    }),
    tetris,
    colors,
    settings);
