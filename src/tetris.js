
/**
 * Handles tetris board and game logic.
 */
(function(tetris, shapes, colors, utils, settings) {

    var fallTime = 0;

    tetris.ROWS = 24;
    tetris.COLS = 10;

    tetris.block;
    tetris.board;

    /**
     * Returns true if the block at the given location and rotation will
     * collide with another block or the game's walls.
     */
    var collisions = function(x, y, matrix) {
        var n = matrix.length;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                if (matrix[i][j] === 1) {
                    var newX = x + i;
                    var newY = y + j;
                    if (newX < 0 || newX >= tetris.COLS ||
                        newY < 0 || newY >= tetris.ROWS ||
                        tetris.board[newX][newY])
                        return true;
                }
            }
        }
        return false;
    };

    /**
     * Check if the active block is sitting on the bottom of the board or
     * on one of the placed tiles.
     */
    var checkBottom = function() {
        var n = tetris.block.matrix.length;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                if (tetris.block.matrix[i][j] === 1) {
                    var x = tetris.block.x + i;
                    var y = tetris.block.y + j;
                    if (y === tetris.ROWS - 1 || tetris.board[x][y + 1]) {
                        return true;
                    }
                }
            }
        }
    };

    /**
     * Clears any full rows, pushing the elements above it down one row.
     */
    var clearFullRows = function() {
        for (var j = 0; j < tetris.ROWS; j++) {
            var count = 0;
            for (var i = 0; i < tetris.COLS; i++) {
                if (tetris.board[i][j])
                    count++;
            }

            if (count === tetris.COLS) {
                // Full row, need to move all tiles above this down one.
                for (var i = 0; i < tetris.COLS; i++) {
                    for (var j2 = j; j2 >= 0; j2--) {
                        tetris.board[i][j2] = tetris.board[i][j2 - 1];
                        tetris.board[i][j2 - 1] = undefined;
                    }
                }
            }
        }
    };

    /**
     * Initialize the tetris board and state.
     */
    tetris.init = function() {
        tetris.board = utils.newMatrix(tetris.ROWS, tetris.COLS);
        tetris.block = tetris.newBlock(tetris.COLS / 2 - 2, 0);
    };

    /**
     * Update the game board, making the active piece fall.
     */
    tetris.update = function() {
        if (checkBottom()) {
            // Need to move the active block to the placed tiles board.
            var n = tetris.block.matrix.length;
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    if (tetris.block.matrix[i][j] === 1) {
                        var x = tetris.block.x + i;
                        var y = tetris.block.y + j;
                        tetris.board[x][y] = tetris.block.color;
                    }
                }
            }

            // Clear any full rows if necessary
            clearFullRows();

            // Now create a new block
            tetris.block = tetris.newBlock(tetris.COLS / 2 - 2, 0);
        } else {
            tetris.moveBlock(0, 1);
        }
    };

    /**
     * Move the active block in the given directions if there are no collisions.
     */
    tetris.moveBlock = function(xDiff, yDiff) {
        var newX = tetris.block.x + xDiff;
        var newY = tetris.block.y + yDiff;
        if (!collisions(newX, newY, tetris.block.matrix)) {
            tetris.block.move(xDiff, yDiff);
        }
    };

    /**
     * Rotates the block by 90 degrees if there are no collisions.
     */
    tetris.rotateBlock = function() {
        var newMatrix = utils.rotateMatrix(tetris.block.matrix);
        if (!collisions(tetris.block.x, tetris.block.y, newMatrix)) {
            tetris.block.matrix = newMatrix;
        }
    };
})(window.tetris = window.tetris || {}, shapes, colors, utils, settings);
