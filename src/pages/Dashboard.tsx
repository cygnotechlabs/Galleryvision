import BarChart from "../components/Dashboard/Bar";
import Cards from "../components/Dashboard/Cards";
import LineChart from "../components/Dashboard/LIneChart";

type Props = {};

const Dashboard = ({}: Props) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row px-4 lg:px-4 py-2 lg:py-4 justify-between items-start lg:items-center">
        <div className="mb-4 lg:mb-0">
          <p className="text-xl font-bold">Dashboard</p>
        </div>
      </div>
      <div>
        <Cards />
        <div className="bg-white py-6 flex gap-1 items-center rounded-xl justify-around mx-8 mt-8">
          <LineChart />
          <BarChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
