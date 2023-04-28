import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChartTodo({ todo, done, cutout }) {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: ["INCOMPLETE", "COMPLETE"],
    datasets: [
      {
        data: [todo, todo-done],
        backgroundColor: ["#FFAA9B", "#75C9A8"],
        hoverOffset: 4,
        borderWidth: 2,
        cutout: cutout,
      },
    ],
  };
  return <Doughnut data={data} options={options} />;
}
export default DonutChartTodo;
