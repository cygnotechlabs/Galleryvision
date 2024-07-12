import axios from "axios";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Brush,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import API_ENDPOINTS from "../../config/apiConfig";
import { authInstance } from "../../hooks/axiosInstances";

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
        const response = await axios.get<Count>(API_ENDPOINTS.VIEW_COUNT, {
          headers: authInstance(),
        });
        setCount(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!count) {
    return <div>Loading...</div>;
  }

  const data = count.dateArray.map((date, index) => ({
    date,
    channelCommission: count.channelCommissionArray[index],
    musicCommission: count.musicCommissionArray[index],
  }));

  return (
    <div className="p-5">
      <p className="font-bold text-lg ml-2 mb-3 mt-1">Revenue Over Time</p>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 30 }} // Adjust bottom margin
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2B7FFF" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#2B7FFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22dab2" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#22dab2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" strokeWidth={0} />
          <YAxis strokeWidth={0} />
          <Tooltip
            contentStyle={{
              fontSize: "12px",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            wrapperStyle={{
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            labelFormatter={(label) => `Date: ${label}`}
            formatter={(value, name) => {
              const formattedName =
                name === "channelCommission"
                  ? "Channel Commission"
                  : "Music Commission";
              return [`$ ${value}`, formattedName];
            }}
          />
          <Area
            type="monotone"
            dataKey="channelCommission"
            stroke="#2B7FFF"
            fillOpacity={1}
            fill="url(#colorUv)"
            strokeWidth={2.5}
          />
          <Area
            type="monotone"
            dataKey="musicCommission"
            stroke="#22dab2"
            fillOpacity={1}
            fill="url(#colorPv)"
            strokeWidth={2.5}
          />
          <Brush
            dataKey="date"
            height={30}
            stroke="#c9c9c9"
            startIndex={5}
            endIndex={10}
            y={310}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
