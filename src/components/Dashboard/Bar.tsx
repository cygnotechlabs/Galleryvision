import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import API_ENDPOINTS from "../../config/apiConfig";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Count = {
  totalCommissionArray: number[];
  dateArray: string[];
};

const BarChart: React.FC = () => {
  const [count, setCount] = useState<Count | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Count>(API_ENDPOINTS.VIEW_COUNT);
        setCount(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: count ? count.dateArray : [],
    datasets: [
      {
        label: "Sales",
        data: count ? count.totalCommissionArray : [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div style={{ height: "300px", width: "600px", padding: "10px" }}>
      <p className="font-bold text-lg">Revenue Over Time</p>
      <Bar data={data} options={options} />;
    </div>
  );
};

export default BarChart;
