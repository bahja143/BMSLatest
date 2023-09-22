const subtractOneYear = (date, year) => {
  date.setFullYear(date.getFullYear() - year);

  return date;
};

const chartData = {
  height: 350,
  type: "area",
  options: {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#FFB64D"],
    annotations: {
      yaxis: [
        {
          y: 30,
          borderColor: "#999",
          label: {
            show: true,
            text: "Support",
            style: {
              color: "#fff",
              background: "#00E396",
            },
          },
        },
      ],
    },
    markers: {
      size: 0,
      style: "hollow",
    },
    xaxis: {
      type: "datetime",
      min: new Date(
        subtractOneYear(new Date(), 1).toLocaleDateString()
      ).getTime(),
      tickAmount: 6,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
  },
};

export default chartData;
