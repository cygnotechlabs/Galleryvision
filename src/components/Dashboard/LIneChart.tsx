// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   CategoryScale,
//   Chart as ChartJS,
//   Legend,
//   LineElement,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import API_ENDPOINTS from "../../config/apiConfig";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// type Count = {
//   channelCommissionArray: number[];
//   musicCommissionArray: number[];
//   dateArray: string[];
// };

// const LineChart = () => {
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
//         label: "Channel",
//         data: count ? count.channelCommissionArray : [],
//         fill: false,
//         borderColor: "rgb(75, 192, 192)",
//         tension: 0.1,
//       },
//       {
//         label: "Music",
//         data: count ? count.musicCommissionArray : [],
//         fill: false,
//         borderColor: "rgb(705, 192, 192)",
//         tension: 0.1,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//     // Add these options to control the canvas size
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   return (
//     <div>
//       <div>
//         <div style={{ height: "300px", width: "600px", padding: "10px" }}>
//           <p className="font-bold text-lg">Channels & Music</p>
//           <Line data={data} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LineChart;

import axios from "axios";
import { useEffect, useState } from "react";
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
import API_ENDPOINTS from "../../config/apiConfig";
import { authInstance } from "../../hooks/axiosInstances";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Count = {
  channelCommissionArray: number[];
  musicCommissionArray: number[];
  dateArray: string[];
};

const LineChart = () => {
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
        label: "Channel",
        data: count ? count.channelCommissionArray : [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Music",
        data: count ? count.musicCommissionArray : [],
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
      x: {
        type: "category" as const,
        labels: count ? count.dateArray : [],
        ticks: {
          autoSkip: false,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div><p className="font-bold text-lg">Channels & Music</p>
    <div style={{ overflowX: "auto", overflowY: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ width: "100%", maxWidth: "600px", padding: "10px" }}>
        
        <div style={{ width: `${count ? count.dateArray.length * 100 : 600}px`, height: "300px" }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default LineChart;

