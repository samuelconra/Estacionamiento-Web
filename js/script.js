$(document).ready(function () {
    $('.parking-btn').on('click', function () {
        var x = $(this).data('x');
        var y = $(this).data('y');
        var scale = $(this).data('scale');

        // Aplica la transformación: traslada la imagen y hace zoom
        $('#map-image').css('transform', 'translate(' + x + '%, ' + y + '%) scale(' + scale + ')');
    });
});