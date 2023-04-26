import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ todo, inprogress, done }) {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: ["TODO", "INPROGRESS", "DONE"],
    datasets: [
      {
        data: [todo, inprogress, done],
        backgroundColor: ["#FFAA9B", "#CFCFAB", "#75C9A8"],
        hoverOffset: 4,
        borderWidth: 2,
        cutout: "80%",
      },
    ],
  };
  return <Doughnut data={data} options={options} />;
}
export default DonutChart;
