import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";

type Props = {};

type Count = {
  channelCount: number;
  musicCount: number;
  licensorCount: number;
  totalCommission: number;
  totalchannelCommission: number;
  totalMusicCommission: number;
};

const card = "flex flex-col py-5 gap-3 px-5 w-[150%] rounded-2xl bg-white";

const Cards: React.FC<Props> = ({}: Props) => {
  const [count, setCount] = useState<Count>({
    channelCount: 0,
    musicCount: 0,
    licensorCount: 0,
    totalCommission: 0,
    totalchannelCommission: 0,
    totalMusicCommission: 0,
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
    <div className="flex gap-24 mx-8">
      <TotalRevenue totalCommision={count.totalCommission} />
      <TotalLicensor licensorCount={count.licensorCount} />
      <TotalChannel
        channelCount={count.channelCount}
        totalchannelCommission={count.totalchannelCommission}
      />
      <TotalMusic
        musicCount={count.musicCount}
        totalMusicCommission={count.totalMusicCommission}
      />
    </div>
  );
};

export default Cards;

function TotalRevenue({ totalCommision }: { totalCommision: number }) {
  return (
    <div className={`${card}`}>
      <p className="text-sm font-bold  text-gray-600">Total Revenue</p>
      <p className="text-2xl font-bold">$ {totalCommision}</p>
    </div>
  );
}

function TotalLicensor({ licensorCount }: { licensorCount: number }) {
  return (
    <div className={`${card}`}>
      <p className="text-sm font-bold text-gray-600">Total Licensor</p>
      <p className="text-2xl font-bold">{licensorCount}</p>
    </div>
  );
}

function TotalChannel({
  channelCount,
  totalchannelCommission,
}: {
  channelCount: number;
  totalchannelCommission: number;
}) {
  return (
    <div className={`${card}`}>
      <p className="text-sm font-bold text-gray-600">Total Channel</p>
      <p className="text-2xl font-bold">{channelCount}</p>
      <div className="text-sm font-bold flex items-center gap-2">
        <p className="text-sm font-bold text-gray-600">Total Commission</p>
        <p className="text-xl font-bold">$ {totalchannelCommission}</p>
      </div>
    </div>
  );
}

function TotalMusic({
  musicCount,
  totalMusicCommission,
}: {
  musicCount: number;
  totalMusicCommission: number;
}) {
  return (
    <div className={`${card}`}>
      <p className="text-sm font-bold text-gray-600">Total Music</p>
      <p className="text-2xl font-bold">{musicCount}</p>
      <div className="text-sm font-bold flex items-center gap-2">
        <p className="text-sm font-bold text-gray-600">Total Commission</p>
        <p className="text-xl font-bold">$ {totalMusicCommission}</p>
      </div>
    </div>
  );
}
