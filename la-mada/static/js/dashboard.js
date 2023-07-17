$(function () {
  // =====================================
  // Profit
  // =====================================
  var chart = {
    series: [
      {
        name: "Earnings this month:",
        data: [355, 390, 300, 350, 390, 180, 355, 390],
      },
      {
        name: "Expense this month:",
        data: [280, 250, 325, 215, 250, 310, 280, 250],
      },
    ],

    chart: {
      type: "bar",
      height: 345,
      offsetX: -15,
      toolbar: { show: true },
      foreColor: "#adb0bb",
      fontFamily: "inherit",
      sparkline: { enabled: false },
    },

    colors: ["#5D87FF", "#49BEFF"],

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    markers: { size: 0 },

    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },

    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },

    xaxis: {
      type: "category",
      categories: [
        "16/08",
        "17/08",
        "18/08",
        "19/08",
        "20/08",
        "21/08",
        "22/08",
        "23/08",
      ],
      labels: {
        style: { cssClass: "grey--text lighten-2--text fill-color" },
      },
    },

    yaxis: {
      show: true,
      min: 0,
      max: 400,
      tickAmount: 4,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 3,
      lineCap: "butt",
      colors: ["transparent"],
    },

    tooltip: { theme: "light" },

    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
            },
          },
        },
      },
    ],
  };

  var chart = new ApexCharts(document.querySelector("#chart"), chart);
  chart.render();

  // =====================================
  // Breakup
  // =====================================
  const occupied = parseInt(
    document.querySelector(".occupied").textContent.split()[0]
  );
  const vacant = parseInt(
    document.querySelector(".vacant").textContent.split()[0]
  );
  const total = occupied + vacant;
  let percentage = document.querySelector(".percentage");
  if (vacant == 0) {
    percentage.innerHTML = "100%";
  } else {
    percentage.innerHTML = `${Math.trunc((occupied / total) * 100)} %`;
  }
  var breakup = {
    color: "#adb5bd",
    series: [vacant, occupied],
    labels: ["Vacant", "Occupied"],
    chart: {
      width: 180,
      type: "donut",
      fontFamily: "Plus Jakarta Sans', sans-serif",
      foreColor: "#adb0bb",
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
        },
      },
    },
    stroke: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },
    colors: ["#5D87FF", "#ecf2ff", "#F9F9FD"],

    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 150,
          },
        },
      },
    ],
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };

  var chart = new ApexCharts(document.querySelector("#breakup"), breakup);
  chart.render();

  // =====================================
  // Earning
  // =====================================
  const data = JSON.parse(
    document.querySelector(".temporary-data").textContent
  );
  let amounts = [],
    sum = 0;
  for (const amount of data) {
    amounts.push(amount.amount_paid);
    sum += parseInt(amount.amount_paid);
  }
  document.querySelector(".earned").innerHTML = `Ksh. ${sum}`;
  var earning = {
    chart: {
      id: "sparkline3",
      type: "area",
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
      fontFamily: "Plus Jakarta Sans', sans-serif",
      foreColor: "#adb0bb",
    },
    series: [
      {
        name: "Earnings",
        color: "#49BEFF",
        data: amounts.reverse(),
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: ["#f3feff"],
      type: "solid",
      opacity: 0.05,
    },

    markers: {
      size: 0,
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: true,
        position: "right",
      },
      x: {
        show: false,
      },
    },
  };
  new ApexCharts(document.querySelector("#earning"), earning).render();
});

document.addEventListener("DOMContentLoaded", () => {
  const types = document.querySelectorAll("#room-type");

  types.forEach((type) => {
    typeContent = type.textContent.toLowerCase();
    if (typeContent === "queen") {
      type.classList.remove("bg-primary");
      type.classList.add("bg-success");
    } else if (typeContent === "double") {
      type.classList.remove("bg-primary");
      type.classList.add("bg-secondary");
    } else if (typeContent === "single") {
      type.classList.remove("bg-primary");
      type.classList.add("bg-warning");
    }
  });
});

const printReport = document.querySelector("#reportPrint");
printReport.onclick = () => {
  const originalContent = document.body.innerHTML;
  const printContent = document.querySelector("#report").innerHTML;

  document.body.innerHTML = printContent;

  window.print();

  document.body.innerHTML = originalContent;
};
