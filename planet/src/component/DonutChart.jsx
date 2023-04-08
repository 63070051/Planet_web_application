import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
    //   label: "My First Dataset",
      data: [10, 5, 10],
      backgroundColor: [
          "#FFAA9B",
          "#CFCFAB",
          "#75C9A8",
      ],
      hoverOffset: 4,
      borderWidth : 2,
    },
  ],
};
function DonutChart() {
  return <Doughnut data={data} />;
}
export default DonutChart;
