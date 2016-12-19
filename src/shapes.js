
/**
 * Module to handle different types of tetris shapes.
 */
(function(shapes) {

    // Long skinny block
    shapes.block1 =
        [[0, 1, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0]];

    // L-shaped block
    shapes.block2 =
        [[0, 0, 0, 0],
         [0, 1, 1, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0]];

    // Another L-shaped block
    shapes.block3 =
        [[0, 0, 0, 0],
         [0, 1, 1, 0],
         [0, 0, 1, 0],
         [0, 0, 1, 0]];

    // Square block
    shapes.block4 =
        [[1, 1],
         [1, 1]];

    // T-shaped block
    shapes.block5 =
        [[0, 1, 0],
         [1, 1, 1],
         [0, 0, 0]];

     // Don't know what to call this shape
     shapes.block6 =
        [[0, 0, 0],
         [0, 1, 1],
         [1, 1, 0]];

     // Don't know what to call this shape, part 2
     shapes.block7 =
        [[0, 0, 0],
         [1, 1, 0],
         [0, 1, 1]];

     /**
      * List containing all of the tetris shapes.
      */
     shapes.all = [
         shapes.block1,
         shapes.block2,
         shapes.block3,
         shapes.block4,
         shapes.block5,
         shapes.block6,
         shapes.block7];

     /**
      * Shapes by their probability of being selected. Shapes that don't have
      * a mirror image of themselves as a new shape (e.g Block1, Block 4), will
      * be twice as likely as a T shaped block from being selected.  This prevents
      * too many mirror image blocks from being selected.
      */
     shapes.probabilityTable = [
         shapes.block1,
         shapes.block1,
         shapes.block2,
         shapes.block3,
         shapes.block4,
         shapes.block4,
         shapes.block5,
         shapes.block5,
         shapes.block6,
         shapes.block7];

     /**
      * Returns a randomly chosen new shape.
      */
     shapes.randomShape = function() {
         return shapes.probabilityTable[Math.floor(Math.random() * shapes.probabilityTable.length)];
     }
})(window.shapes = window.shapes || {});
