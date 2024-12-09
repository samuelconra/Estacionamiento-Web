import { getFirestore, setDoc, doc, collection, addDoc, getDocs, onSnapshot, query, deleteDoc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { db } from './firebaseConfig.js';

const parkings = await getDocs(collection(db, 'Parking'));
addCards()
var parking_html = ''

// FUNCIONES
function createParkingSection(id, entry, name, cars, capacity) {
    var htmlSection = `
    <div class="col-lg-3 col-11 p-3 align-content-center">
        <div class="div-estacionamiento text-center align-content-center">
            <i class="fa-solid fa-car icon-car"></i>
            <h5 class="parking-entry">${entry}</h5>
            <p class="parking-name">${name}</p>
            <p class="info-parking-cars">Coches: ${cars}</p>
            <p class="info-parking-capacity">Disponibilidad: ${capacity - cars}</p>
            <input type="text" name="input_cars" id="input_cars_${id}" class="input_cars" value=10>
            <button class="btn-modify" data-id="${id}" data-type="minus"><i class="fa-solid fa-minus"></i></button>
            <button class="btn-modify" data-id="${id}" data-type="add"><i class="fa-solid fa-plus"></i></button>
        </div>
    </div>
    `;
    return htmlSection;
}

// CREACIÓN DE SECCIONES
async function addCards(){
    parking_html = ''
    parkings.forEach((doc) => {
        parking_html += createParkingSection(doc.id, doc.data().entry, doc.data().name, doc.data().cars, doc.data().capacity);
    });
    $('#parkings-modifiers').html(parking_html);
}

$('.btn-modify').on('click', async function () {
    var type = $(this).data('type');
    var id = $(this).data('id');
    var input = parseInt($('#input_cars_' + id).val(), 10); // Convertir a número entero

    if (isNaN(input) || input < 0) {
        console.log("El valor ingresado no es válido.");
        return;
    }

    const parkingRef = doc(db, 'Parking', id);
    const parkingDoc = await getDoc(parkingRef);

    if (parkingDoc.exists()) {
        let currentCars = parkingDoc.data().cars || 0; // Valor actual del campo 'cars'

        // Determinar si se suma o resta
        let newCarsValue = type === 'add' ? currentCars + input : currentCars - input;

        // Asegurarse de que el valor no sea negativo y no supere la capacidad
        newCarsValue = Math.max(0, newCarsValue);
        newCarsValue = Math.min(parkingDoc.data().capacity, newCarsValue);

        // Actualizar el valor en Firestore
        await updateDoc(parkingRef, {
            cars: newCarsValue
        });

    } else {
        console.log("El documento no existe.");
    }
    location.reload();
});
