import MonthYearSelector from "../UI/MonthYear";
import Cards from "../components/Dashboard/Cards";
import LIneChart from "../components/Dashboard/LIneChart";

type Props = {};

const Dashboard = ({}: Props) => {
  return (
    <>
      <div className="flex px-8 py-8 justify-between">
        <div>
          <p className="text-xl font-bold">Dashboard</p>
          <p className="text-sm text-gray-400">
            Upload your youtube channel files & Music partner file in CSV format
          </p>
        </div>
        <MonthYearSelector />
      </div>
      <div>
        <Cards />
        <LIneChart />
      </div>
    </>
  );
};

export default Dashboard;
