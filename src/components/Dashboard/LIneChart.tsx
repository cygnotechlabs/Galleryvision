import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import API_ENDPOINTS from "../../config/apiConfig";
import { authInstance } from "../../hooks/axiosInstances";

type Count = {
  channelCommissionArray: number[];
  musicCommissionArray: number[];
  dateArray: string[];
};

const customLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul
      style={{ display: "flex", justifyContent: "center" }}
      className="recharts-default-legend"
    >
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          style={{ color: entry.color, margin: "0 10px" }}
        >
          {entry.dataKey === "channelCommission"
            ? "Channel Commission"
            : "Music Commission"}
        </li>
      ))}
    </ul>
  );
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
    <div className="p-3">
      <p className="font-bold text-lg ml-2 mb-3 mt-1">Revenue Over Time</p>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="date"
            textAnchor="end"
            fontSize={12}
            strokeWidth={3}
          />
          <YAxis strokeWidth={3} />
          <Tooltip />
          <Legend
            content={customLegend}
            verticalAlign="top"
            align="center"
            height={36}
          />
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Line
            type="monotone"
            dataKey="channelCommission"
            stroke="#82ca9d"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="musicCommission"
            stroke="#ED1C24"
            strokeWidth={5}
          />
          <Brush dataKey="date" height={30} stroke="#8884d8" />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
