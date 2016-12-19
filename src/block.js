
/**
 * Represents an active block on the tetris board.
 */
(function(tetris, shapes, colors, utils, settings) {
    tetris.Block = function(shape, color, x, y) {
        this.matrix = shape;
        this.color = color;
        this.x = x;
        this.y = y;

        /**
         * Moves the block by the given x and y difference.
         */
        this.move = function(xDiff, yDiff) {
            this.x += xDiff;
            this.y += yDiff;
        };
    };

    /**
     * Creates a new block with a randomly chosen shape and color.
     */
    tetris.newBlock = function(x, y) {
        var shape = shapes.randomShape();
        var color = colors.randomColor();
        return new tetris.Block(shape, color, x, y);
    }
})(window.tetris = window.game || {}, shapes, colors, utils, settings);
