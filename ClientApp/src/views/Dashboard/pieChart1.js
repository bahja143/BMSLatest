const chartData = {
  height: 320,
  type: "pie",
  options: {
    labels: ["Payments", "Bills", "Expenses"],
    colors: ["#0e9e4a", "#00bcd4", "#FF5370", "#FFB64D"],
    legend: {
      show: true,
      position: "bottom",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        inverseColors: true,
      },
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};
export default chartData;
