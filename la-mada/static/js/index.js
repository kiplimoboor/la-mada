// Gereral
date = new Date();
const today = date.toISOString().split("T")[0];

// Room Management
const rooms = document.querySelectorAll(".room");
rooms.forEach((room) => {
  const status = room.querySelector(".status").textContent;
  const button = room.querySelector("button");
  const rmNumber = room.querySelector(".rm-number").textContent.toLowerCase();
  const rmType = room.querySelector(".rm-type").textContent.toLocaleLowerCase();
  let rate = room
    .querySelector(".rm-rate")
    .textContent.slice(3, -3)
    .replace(",", "");
  if (status === "0") {
    button.className = "btn btn-danger m-1";
    button.innerHTML = "Check Out";
    button.dataset.target = "#checkOutRoom";

    //Auto Fill In Room Details
    button.onclick = () => {
      const checkOutModal = document.querySelectorAll("#checkOutRoom");
      checkOutModal.forEach((item) => {
        item.querySelector(
          "#check-rm"
        ).innerHTML = `Confirm Check out From Room ${rmNumber.toUpperCase()}`;
        item.querySelector("#check-out-rm").value = `${rmNumber}`;
      });
    };
  } else {
    button.onclick = () => {
      const bookModal = document.querySelectorAll("#bookRoom");
      bookModal.forEach((item) => {
        const phoneInputField = document.querySelector("#customer-phone");
        phone = window.intlTelInput(phoneInputField, {
          utilsScript:
            "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
        });

        phoneInputField.value = phone.getNumber();

        item.querySelector("#bk-rm-number").value = rmNumber;
        item.querySelector("#bk-rm-rate").value = rate;
        item.querySelector("#bk-rm-type").value = rmType.trim().split(" ")[0];

        item.querySelector(
          ".bk-lbl-number"
        ).innerHTML = `Book Room  ${rmNumber.toUpperCase()}  for Ksh.${rate} Nightly`;
        item.querySelector("#check-in").setAttribute("min", today);
        item.querySelector("#check-out-date").setAttribute("min", today);
      });
    };
  }
});

//Staff Management
const employees = document.querySelectorAll(".employee");
employees.forEach((employee) => {
  const button = employee.querySelector("button");

  button.onclick = () => {
    const id = employee.querySelector(".employee-id").textContent;
    const name = employee.querySelector(".name").textContent.trim();
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    const email = employee.querySelector(".email").textContent.trim();
    const role = employee.querySelector(".role").textContent.trim();

    const editModal = document.querySelectorAll("#updateEmployee");
    editModal.forEach((item) => {
      item.querySelector("#employee-id").value = id;
      item.querySelector("#first-name").value = firstName;
      item.querySelector("#second-name").value = lastName;
      item.querySelector("#role").value = role.toLocaleLowerCase();
      item.querySelector("#email").value = email;
    });
  };
});

//Add Room Rates
function updateRate(e) {
  room = e.target.value;
  rate = document.getElementById("add-rm-rate");
  if (room === "single") {
    rate.value = 1000;
  } else if (room === "double") {
    rate.value = "1500";
  } else if (room === "queen") {
    rate.value = "3000";
  } else if (room === "king") {
    rate.value = "5000";
  }
}

//Print Receipt
const printer = document.querySelector("#receiptPrint");
printer.onclick = () => {
  const originalContent = document.body.innerHTML;
  const printContent = document.querySelector("#receipt").innerHTML;

  document.body.innerHTML = printContent;

  window.print();

  document.body.innerHTML = originalContent;
  location.reload();
};
