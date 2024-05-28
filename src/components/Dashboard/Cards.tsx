import { useEffect, useState } from "react";
import { UpArrow } from "../icons/icon";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";

type Props = {};

type Count = {
  channelCount: number;
  musicCount: number;
  licensorCount: number;
};

const card = "flex flex-col gap-4 pl-10 pr-36 py-6 rounded-2xl bg-white";

const Cards: React.FC<Props> = ({}: Props) => {
  const [count, setCount] = useState<Count>({
    channelCount: 0,
    musicCount: 0,
    licensorCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Count>(API_ENDPOINTS.VIEW_COUNT);
        setCount(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex gap-10 mx-8">
      <TotalRevenue />
      <TotalLicensor licensorCount={count.licensorCount} />
      <TotalChannel channelCount={count.channelCount} />
      <TotalMusic musicCount={count.musicCount} />
    </div>
  );
};

export default Cards;

function TotalRevenue() {
  return (
    <div>
      <div className={`${card}`}>
        <p className="text-sm font-bold  text-gray-600">Total Revenue</p>
        <p className="text-2xl font-bold">$ 13,000,00</p>
        <div className="text-sm font-bold flex items-center gap-2">
          <div className="bg-green-500 text-white rounded-full p-1">
            <UpArrow />
          </div>
          3,6% this month
        </div>
      </div>
    </div>
  );
}

function TotalLicensor({ licensorCount }: { licensorCount: number }) {
  return (
    <div>
      <div className={`${card}`}>
        <p className="text-sm font-bold text-gray-600">Total Licensor</p>
        <p className="text-2xl font-bold">{licensorCount}</p>
        <div className="text-sm font-bold flex items-center gap-2">
          <div className="bg-green-500 text-white rounded-full p-1">
            <UpArrow />
          </div>
          3,6% this month
        </div>
      </div>
    </div>
  );
}

function TotalChannel({ channelCount }: { channelCount: number }) {
  return (
    <div>
      <div className={`${card}`}>
        <p className="text-sm font-bold text-gray-600">Total Channel</p>
        <p className="text-2xl font-bold">{channelCount}</p>
        <div className="text-sm font-bold flex items-center gap-2">
          <div className="bg-green-500 text-white rounded-full p-1">
            <UpArrow />
          </div>
          3,6% this month
        </div>
      </div>
    </div>
  );
}

function TotalMusic({ musicCount }: { musicCount: number }) {
  return (
    <div>
      <div className={`${card}`}>
        <p className="text-sm font-bold text-gray-600">Total Music</p>
        <p className="text-2xl font-bold">{musicCount}</p>
        <div className="text-sm font-bold flex items-center gap-2">
          <div className="bg-green-500 text-white rounded-full p-1">
            <UpArrow />
          </div>
          3,6% this month
        </div>
      </div>
    </div>
  );
}
