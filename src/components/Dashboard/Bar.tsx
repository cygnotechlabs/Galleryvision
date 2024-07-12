import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";
import { authInstance } from "../../hooks/axiosInstances";

type ChannelData = {
  channelId: string;
  channelName: string;
  totalRevenue: string;
};

const MyBarChart: React.FC = () => {
  const [channelData, setChannelData] = useState<ChannelData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ChannelData[]>(
          API_ENDPOINTS.CHANNEL_STAT,
          {
            headers: authInstance(),
          }
        );
        setChannelData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const data = channelData.slice(0, 6).map((item) => ({
    channelName: item.channelName.slice(0, 10),
    totalRevenue: parseFloat(item.totalRevenue),
  }));

  const colors = ["#F6B0B0", "#BBF4E7", "#23DAB2", "#448DFF", "#E7E7ED","#7DC7FF"];
  const sliceMusicName = (name: string, length: number): string => {
    return name.length > length ? name.slice(0, length) + "..." : name;
  };
  return (
    <div className="bg-white rounded-2xl border p-5 w-[50%]">
      <p className="font-bold text-lg mb-3">Top revenue generated Music</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="channelName"
            strokeWidth={0}
            tickFormatter={(name) => sliceMusicName(name, 5)}
          />
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
            labelFormatter={(channelName) => `Name: ${channelName}`}
            formatter={(value, name) => {
              const formattedName =
                name === "channelCommission"
                  ? "Music Commission"
                  : "Channel Commission";
              return [`$ ${value}`, formattedName];
            }}
          />
          {/* <Bar dataKey="totalRevenue" fill="#8884d8" /> */}
          <Bar
            width={20}
            dataKey="totalRevenue"
            fill="#8884d8"
            label={{ position: "top" }}
            radius={8}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyBarChart;
