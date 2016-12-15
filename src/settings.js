/**
 * Common settings for tetris.
 */
(function(settings) {
    settings.screenWidth = 400;
    settings.screenHeight = 480;
    settings.tileSize = 40;
    settings.fallRate = 30;

    settings.vector = function(x, y) {
        this.x = x;
        this.y = y;
    };

    settings.createVector = function(x, y) {
        return new settings.vector(x, y);
    };
})(window.settings = window.settings || {});
