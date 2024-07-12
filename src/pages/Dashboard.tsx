import { useState } from "react";
import BarChart from "../components/Dashboard/Bar";
import Cards from "../components/Dashboard/Cards";
import LineChart from "../components/Dashboard/LIneChart";
import MonthYearSelector from "../UI/MonthYear";
import PicChart from "../components/Dashboard/PicChart";

type Props = {};

const Dashboard = ({}: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleString("default", { month: "long", year: "numeric" })
  );
  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };
  return (
    <div className="mx-6 mt-6">
      <div className="flex justify-between">
        <p className="text-xl font-bold">Dashboard</p>
        <MonthYearSelector
          date={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>
      <div className="mt-4">
        <Cards selectedDate={selectedDate} />
        <div className="bg-white mt-3 rounded-2xl border">
          <LineChart />
        </div>
        <div className="gap-6 mt-3 rounded-2xl flex items-center justify-around">
          <BarChart />
          <PicChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
