
(function(game) {
    game.tile = function(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    };

    game.createTile = function(x, y, color) {
        return new game.tile(x, y, color);
    };

})(window.game = window.game || {});
