document.addEventListener("DOMContentLoaded", function () {
  const rooms = document.querySelectorAll(".room");

  rooms.forEach((room) => {
    const status = room.querySelector(".status").textContent;
    if (status === "0") {
      status.innerHTML = "Hello";
      room.querySelector("button").className = "btn btn-danger m-1";
      room.querySelector("button").innerHTML = "Check Out";
      room.querySelector("button").dataset.target = "#checkOutRoom";
    }
  });
});
