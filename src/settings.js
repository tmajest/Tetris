/**
 * Common settings for tetris.
 */
(function(settings) {
    settings.screenWidth = 301;
    settings.screenHeight = 721;
    settings.tileSize = 30;
    settings.fallRate = 30;

    settings.vector = function(x, y) {
        this.x = x;
        this.y = y;
    };

    settings.createVector = function(x, y) {
        return new settings.vector(x, y);
    };
})(window.settings = window.settings || {});
