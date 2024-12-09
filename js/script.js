import { getFirestore, setDoc, doc, collection, addDoc, getDocs, onSnapshot, query, deleteDoc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { db } from './firebaseConfig.js';

var parkingSelectedId = 'None'
const parkings = await getDocs(collection(db, 'Parking'));
var buttons_html = '';
$("#info-parking").html(createBaseInfo());

// FUNCIONES
function createButton(id, entry, color) {
    var htmlButton = `
    <button class="parking-btn bg-second" data-id="${id}" style="box-shadow: 0px 4px 0px 0px ${color};">
        ${entry}
    </button>
    `;
    return htmlButton;
}

function createInfoSection(name, entry, link, id, cars, capacity){
    if (window.matchMedia("(max-width: 575px)").matches) 
    {
        var htmlSection = `
            <h3>${entry} - ${name}</h3>
            <p class="info-text"><i class="fa-solid fa-circle-check pe-2"></i>Disponibilidad</p>
            <p id="disponibilidad-circle"></p>
            <div>
                <p class="icon-availability"><i class="fa-solid fa-car"></i></p>
                <p class="text-availability">Lugares Disponibles: ${capacity - cars}</p>
            </div>
            <div class="d-block text-end mt-3">
                <a class="bg-second" href="${link}" target="_blank">Ver Ruta</a>
            </div>
        `;
    }
    else{
        var htmlSection = `
            <h3>${entry} - ${name}</h3>
            <img src="images/accesos_img/${id}_Image.png" alt="acceso" id="img-acceso">
            <p class="info-text"><i class="fa-solid fa-circle-check pe-2"></i>Disponibilidad</p>
            <p id="disponibilidad-circle"></p>
            <div>
                <p class="icon-availability"><i class="fa-solid fa-car"></i></p>
                <p class="text-availability">Lugares Disponibles: ${capacity - cars}</p>
            </div>
            <div class="d-block text-end mt-3">
                <a class="bg-second" href="${link}" target="_blank">Ver Ruta</a>
            </div>
        `;
    }
    return htmlSection;
}

function createBaseInfo(){
    var htmlSection = `
        <h3>Sin estacionamientos Seleccionados</h3>
        <p class="info-text"><i class="fa-solid fa-circle-check pe-2"></i>Disponibilidad</p>
        <p id="disponibilidad-circle" style="background-color: gray;"></p>
    `;
    return htmlSection
}

// CREACIÓN DE BOTONES
parkings.forEach((doc) => {
    var cars = doc.data().cars;
    var color = ""
    var capacity = doc.data().capacity;

    if (cars < capacity-25){ color = 'green'; } 
    else if(cars < capacity-10) { color = 'orange'; }
    else { color = '#D30D3C'; }

    buttons_html += createButton(doc.id, doc.data().entry, color);
});
$('#buttons-section').html(buttons_html);


// FUNCIONALIDAD DE BOTONES
$('.parking-btn').on('click', async function () {
    $("img").remove(`.section-image`);
    if (parkingSelectedId == $(this).data('id')){
        $('#map-image').css(
            'transform', 'translate(' + 0 + '%, ' +  0 + '%) scale(' +  1 + ')'
        );

        $('.parking-btn').css('opacity', 0.7);
        $("#info-parking").html(createBaseInfo());
        parkingSelectedId = 'None';
    }
    else{
        // Busqueda de Estacionamiento
        parkingSelectedId = $(this).data('id');
        const parkingId = parkingSelectedId;
        const parkingRef =  doc(db, 'Parking', parkingId);
        const parkingSnap = await getDoc(parkingRef);
        const positionArray = parkingSnap.data().position;
    
        // Movimiento de Imagen
        $('.parking-btn').css('opacity', 0.7);
        $(this).css('opacity', 1);
        $('#map-image').css(
            'transform', 'translate(' + positionArray[0] + '%, ' +  positionArray[1] + '%) scale(' +  positionArray[2] + ')'
        );
        
        
        // Añadir Img de Sección
        var selected_section = `
            <img src="images/accesos/${parkingSelectedId}.png" alt="map" class="section-image" id="section-${parkingSelectedId}"></img>
        `;
        setTimeout(() => {
            $("img").remove(`.section-image`);
            $('#container-images').append(selected_section);
            $('.section-image').css({
                'transform': 'translate(' + positionArray[0] + '%, ' +  positionArray[1] + '%) scale(' +  positionArray[2] + ')'  // Mover a su lugar y tamaño original
            });

            setTimeout(() => {
                $('.section-image').css({
                    'opacity': 1,
                });
            }, 50);
        }, 700);
        
        // Agregar info de estacionamiento
        var info = createInfoSection(parkingSnap.data().name, parkingSnap.data().entry, parkingSnap.data().map, parkingSelectedId, parkingSnap.data().cars, parkingSnap.data().capacity);
        $("#info-parking").html(info);
    
        // Cambiar disponibilidad de estacionamiento
        var parked_cars = parkingSnap.data().cars;
        var parking_capacity = parkingSnap.data().capacity;
        if (parked_cars < parking_capacity-25){
            $('#disponibilidad-circle').css('background-color', 'green');
        } 
        else if(parked_cars < parking_capacity-10) {
            $('#disponibilidad-circle').css('background-color', 'orange');
        }
        else {
            $('#disponibilidad-circle').css('background-color', '#D30D3C');
        }
    }

});