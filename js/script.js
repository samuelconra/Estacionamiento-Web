import { getFirestore, setDoc, doc, collection, addDoc, getDocs, onSnapshot, query, deleteDoc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { db } from './firebaseConfig.js';

// FUNCIONES
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

// ESTACIONAMIENTOS
const parkings = await getDocs(collection(db, "Parking"));

// CREACIÓN DE BOTONES
var buttons_html = "";
parkings.forEach((doc) => {
    buttons_html += createButton(doc.id, doc.data().entry);
});
$("#buttons-section").html(buttons_html);

// FUNCIONALIDAD DE BOTONES
$('.parking-btn').on('click', async function () {
    var parkingId = $(this).data('id')
    const parkingRef = doc(db, "Parking", parkingId);
    const parkingSnapshot = await getDoc(parkingRef);
    const positionArray = parkingSnapshot.data().position;

    $('.parking-btn').css('opacity', 0.7)
    $(this).css('opacity', 1)
    $('#map-image').css(
        'transform', 'translate(' + positionArray[0] + '%, ' +  positionArray[1] + '%) scale(' +  positionArray[2] + ')'
    );

    var info = createInfoSection(parkingSnapshot.data().name, parkingSnapshot.data().entry, parkingSnapshot.data().map)
    $("#info-parking").html(info);

    parked_cars = parkingSnapshot.data().cars

    if (parked_cars < 30){
        $('#disponibilidad-circle').css('background-color', 'green')
    } 
    else if(parked_cars < 70) {
        $('#disponibilidad-circle').css('background-color', 'orange')
    }
    else {
        $('#disponibilidad-circle').css('background-color', '#D30D3C')
    }

});