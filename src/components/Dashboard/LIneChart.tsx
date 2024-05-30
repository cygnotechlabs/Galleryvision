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
        data: [2000,2500],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Music",
        data: [
           3100,
          3600,
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
      <div>
        <div style={{ height: "300px", width: "600px", padding: "10px" }}>
          <p className="font-bold text-lg">Channels & Music</p>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
