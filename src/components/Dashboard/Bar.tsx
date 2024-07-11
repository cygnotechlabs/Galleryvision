import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";
import { authInstance } from "../../hooks/axiosInstances";

type Count = {
  totalCommissionArray: number[];
  dateArray: string[];
};

const MyBarChart: React.FC = () => {
  const [count, setCount] = useState<Count | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Count>(API_ENDPOINTS.VIEW_COUNT, {
          headers: authInstance(),
        });
        setCount(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p className="font-bold text-lg">Revenue Over Time</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={
            count?.dateArray.map((date, index) => ({
              date,
              totalCommission: count.totalCommissionArray[index],
            })) || []
          }
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalCommission" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyBarChart;
