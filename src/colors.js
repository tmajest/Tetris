
/**
 * Module to handle color picking.
 */
(function(colors) {

    colors.backgroundColor = "#252B36";

    colors.fillColors = [
        "#005A6E",
        "#1F8A70",
        "#BEDB39",
        "#FFE11A",
        "#FD7400",
        "#FD3803"
    ];

    colors.outlineColors = [
        "#003742",
        "#145948",
        "#778A47",
        "#94820F",
        "#853D00",
        "#6E1801"
    ];

    /**
     * Color object to store fill and outline colors.
     */
    colors.TetrisColor = function(fillColor, outlineColor) {
        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
    };

    /**
     * Create a new random TetrisColor object. The outline color will
     * always be slightly darker than the fill color.
     */
    colors.randomColor = function() {
        var i = Math.floor(Math.random() * colors.fillColors.length);
        var fillColor = colors.fillColors[i];
        var outlineColor = colors.outlineColors[i];
        return new colors.TetrisColor(fillColor, outlineColor);
    };
})(window.colors = window.colors || {});
