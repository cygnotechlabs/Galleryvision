import { useState } from "react";
import MonthYearSelector from "../UI/MonthYear";
import Cards from "../components/Dashboard/Cards";
import LIneChart from "../components/Dashboard/LIneChart";

type Props = {};

const Dashboard = ({}: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  return (
    <>
      <div className="flex px-8 py-8 justify-between">
        <div>
          <p className="text-xl font-bold">Dashboard</p>
          <p className="text-sm text-gray-400">
            Upload your youtube channel files & Music partner file in CSV format
          </p>
        </div>
        <MonthYearSelector
              date={selectedDate}
              onDateChange={handleDateChange}
            />
      </div>
      <div>
        <Cards />
        <LIneChart />
      </div>
    </>
  );
};

export default Dashboard;
