// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import API_ENDPOINTS from "../../config/apiConfig";
// import axios from "axios";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// type Count = {
//   totalCommissionArray: number[];
//   dateArray: string[];
// };

// const BarChart: React.FC = () => {
//   const [count, setCount] = useState<Count | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get<Count>(API_ENDPOINTS.VIEW_COUNT);
//         setCount(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const data = {
//     labels: count ? count.dateArray : [],
//     datasets: [
//       {
//         label: "Sales",
//         data: count ? count.totalCommissionArray : [],
//         backgroundColor: "rgba(75,192,192,0.4)",
//         borderColor: "rgba(75,192,192,1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top" as const,
//       },
//     },
//   };

//   return (
//     <div style={{ height: "300px", width: "600px", padding: "10px" }}>
//       <p className="font-bold text-lg">Revenue Over Time</p>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default BarChart;




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
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";
import { authInstance } from "../../hooks/axiosInstances";

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
        const response = await axios.get<Count>(API_ENDPOINTS.VIEW_COUNT,{headers:authInstance()});
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
        borderWidth: 2,
        barPercentage: 0.9, // Adjust the bar width as needed
        categoryPercentage: 0.7, // Adjust the gap between bars as needed
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
    scales: {
      x: {
        type: "category" as const,
        labels: count ? count.dateArray : [],
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    
  };

  return (
    <div>
      <p className="font-bold text-lg">Revenue Over Time</p>
      <div style={{ overflowX: "auto", overflowY: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ width: "100%", maxWidth: "600px", padding: "10px" }}>
          <div style={{ width: `${count ? count.dateArray.length * 100 : 600}px`, height: "300px" }}>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
