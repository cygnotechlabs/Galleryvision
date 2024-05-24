import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {};

const LineChart = ({}: Props) => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Channel",
        data: [
          6500, 5900, 8000, 8100, 5600, 5500, 4000, 6500, 5900, 8000, 8100,
          5600,
        ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Music                       ",
        data: [
          6500, 8900, 8000, 1060, 7600, 5670, 4000, 6500, 8900, 8000, 3100,
          7600,
        ],
        fill: false,
        borderColor: "rgb(705, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    // Add these options to control the canvas size
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <div className="mx-6 mt-6 rounded-2xl p-6 bg-white">
        <p className="font-bold text-lg">Revenue Over Time</p>
        <div style={{ height: "300px", width: "600px" }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
