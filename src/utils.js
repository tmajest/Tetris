
/**
 * Utility functions for tetris.
 */
(function(utils) {

    /**
     * Initialize an empty matrix with the given dimensions.
     */
    utils.newMatrix = function(rows, cols) {
        var matrix = [];
        for (var i = 0; i < rows; i++) {
            matrix.push([]);
            for (var j = 0; j < cols; j++) {
                matrix[i].push(undefined);
            }
        }
        return matrix;
    };

    /**
     * Rotate the matrix by 90 degrees.  Returns a new matrix.
     */
    utils.rotateMatrix = function(matrix) {
        var n = matrix.length;
        var newMatrix = utils.newMatrix(n, n);

        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                newMatrix[i][j] = matrix[j][n - i - 1];
            }
        }
        
        return newMatrix;
    }

})(window.utils = window.utils || {});
