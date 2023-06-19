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
//Toggle Add Employee
function toggleAction() {
    var x = document.getElementById("expand-action");

    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }

}

//Toggle Logout Pane
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

