import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [10, 5, 10],
      backgroundColor: ["#FFAA9B", "#CFCFAB", "#75C9A8"],
      hoverOffset: 4,
      borderWidth: 2,
      cutout: "80%",
    },
  ],
};
function DonutChart() {
  return <Doughnut data={data} options={options}/>;
}
export default DonutChart;
