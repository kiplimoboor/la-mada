date = new Date();
const today = date.toISOString().split("T")[0];

document.addEventListener("DOMContentLoaded", function () {
  const rooms = document.querySelectorAll(".room");

  rooms.forEach((room) => {
    const status = room.querySelector(".status").textContent;
    const button = room.querySelector("button");
    const rmNumber = room.querySelector(".rm-number").textContent.toLowerCase();
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

          item.querySelector(
            ".bk-lbl-number"
          ).innerHTML = `Book Room  ${rmNumber.toUpperCase()}  for Ksh.${rate} Nightly`;
          item.querySelector("#check-in").setAttribute("min", today);
          item.querySelector("#check-out-date").setAttribute("min", today);
        });
      };
    }
  });
});
