$(document).ready(function () {

    function createButton(id, entry) {
        var htmlButton = `
        <button class="parking-btn bg-second" data-id=${id}">
            ${entry}
        </button>
        `;
        return htmlButton;
    }
    
    function createInfoSection(name, entry, link){
        var htmlSection = `
            <h3>${entry} - ${name}</h3>
            <p class="info-text"><i class="fa-solid fa-circle-check pe-2"></i>Disponibilidad</p>
            <p id="disponibilidad-circle"></p>
            <div class="d-block text-end mt-3">
                <a class="bg-second" href="${link}" target="_blank">Ver Ruta</a>
            </div>
        `;
        return htmlSection;
    }

    var parkings = [
        {
            id: 0,
            name: 'Estacionamiento Principal',
            entry: 'Acceso 1',
            x_position: -20,
            y_position: -70,
            scale: 2,
            map: 'https://maps.app.goo.gl/5BbG48CVQoysZnpd7',
            disponibilidad: 1
        },
        {
            id: 1,
            name: 'Estacionamiento Ingenierías',
            entry: 'Acceso 3',
            x_position: 60,
            y_position: 20,
            scale: 2.4,
            map: 'https://maps.app.goo.gl/axGMGTW5GKRwMrt98',
            disponibilidad: 2
        },
        {
            id: 2,
            name: 'Estacionamiento Facultad de Diseño',
            entry: 'Acceso 4',
            x_position: -50,
            y_position: 0,
            scale: 1.4,
            map: 'https://maps.app.goo.gl/aqzfJZEsrc3AyfEh9',
            disponibilidad: 0
        },
        {
            id: 0,
            name: 'Estacionamiento Principal',
            entry: 'Acceso 1',
            x_position: -20,
            y_position: -70,
            scale: 2,
            map: 'https://maps.app.goo.gl/5BbG48CVQoysZnpd7',
            disponibilidad: 1
        },
        {
            id: 1,
            name: 'Estacionamiento Ingenierías',
            entry: 'Acceso 3',
            x_position: 60,
            y_position: 20,
            scale: 2.4,
            map: 'https://maps.app.goo.gl/axGMGTW5GKRwMrt98',
            disponibilidad: 2
        },
        {
            id: 2,
            name: 'Estacionamiento Facultad de Diseño',
            entry: 'Acceso 4',
            x_position: -50,
            y_position: 0,
            scale: 1.4,
            map: 'https://maps.app.goo.gl/aqzfJZEsrc3AyfEh9',
            disponibilidad: 0
        },
    ]

    var buttons_parking = "";
    parkings.forEach((parking) => {
        buttons_parking += createButton(parking['id'], parking['entry']);
    });
    $("#buttons-section").html(buttons_parking);

    

    $('.parking-btn').on('click', function () {
        var parking = parkings[parseInt($(this).data('id'))] 
        // console.log(parking)

        $('.parking-btn').css('opacity', 0.7)
        $(this).css('opacity', 1)
        $('#map-image').css(
            'transform', 'translate(' + parking['x_position'] + '%, ' +  parking['y_position'] + '%) scale(' +  parking['scale'] + ')'
        );

        var info = createInfoSection(parking['name'], parking['entry'], parking['map'])
        $("#info-parking").html(info);

        console.log(parking['disponibilidad'])

        if (parking['disponibilidad'] == 0){
            $('#disponibilidad-circle').css('background-color', 'green')
        } 
        else if(parking['disponibilidad'] == 1) {
            $('#disponibilidad-circle').css('background-color', 'orange')
        }
        else {
            $('#disponibilidad-circle').css('background-color', '#D30D3C')
        }

    });
});