// Date and Time
const date = new Date()
document.getElementById("date").innerHTML = date.toDateString();
document.getElementById("time").innerHTML = date.toTimeString().slice(0, 5);

//Toggle Add Employee
function toggleEmployee() {
    var x = document.getElementById("add-employee");
    if (x.style.display === "none") {
        x.style.display = "flex";
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

