date = new Date();

document.addEventListener('DOMContentLoaded', function () {
    const rooms = document.querySelectorAll('.room');
    rooms.forEach(room => {
        const status = room.querySelector('h4').textContent;
        if (status === 'Booked') {
            room.style.backgroundColor = 'red'
        }
    });
    if (y.querySelector('h4').textContent === 'Available') {
        y.style.backgroundColor = 'red';
    }
});

//Togglers
function toggleAction() {
    var x = document.getElementById("expand-action");

    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}


function toggleAllocation(roomNumber, roomRate) {
    var x = document.getElementById("room-allocation");
    if (x.style.display === "none") {
        x.style.display = "flex";

        const today = date.toISOString().split('T')[0];
        var tomorrow = date;
        tomorrow.setDate(tomorrow.getDate() + 1);
        var tomorrow = tomorrow.toISOString().split('T')[0];

        document.getElementById('lbl-rate').innerHTML = (`Pay Ksh. ${roomRate}`);
        document.getElementById('lbl-number').innerHTML = (`Room ${roomNumber}`);
        document.getElementById('rm-number').value = roomNumber
        document.getElementById('rm-rate').value = roomRate
        document.getElementById('check-in').value = today;
        document.getElementById('check-out').setAttribute('min', tomorrow);

    } else {
        x.style.display = "none";
    }
}

function checkOut(roomNumber) {
    var x = document.getElementById("checkout");
    if (x.style.display === "none") {
        x.style.display = "flex";

        const today = date.toISOString().split('T')[0];

        document.getElementById('checkout-number').innerHTML = (`Checking out from Room ${roomNumber}`);
        document.getElementById('check-out-rm-number').value = roomNumber;
        document.getElementById('check-out-date').value = today;
        document.getElementById('check-out-date').setAttribute('min', today);

    } else {
        x.style.display = "none";
    }
}

function logout() {
    var x = document.getElementById("logout");
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

//Autofill Room Rates
function updateRate(e) {
    room = e.target.value;
    rate = document.getElementById("rate");
    if (room === 'single') {
        rate.value = 1000;
    }
    else if (room === 'double') {
        rate.value = '1500';
    } else if (room === 'queen') {
        rate.value = '3000';
    } else if (room === 'king') {
        rate.value = '5000';
    }
}

//Open Pages
function openRooms() {
    window.location.href = '/rooms';
}

function openBookings() {
    window.location.href = '/history';
}
