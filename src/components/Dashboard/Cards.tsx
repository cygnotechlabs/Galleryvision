//auth

import axios from "axios";
import loss from "../../../public/Frame 1288 (1).png";
import profit from "../../../public/Frame 1288.png";
import API_ENDPOINTS from "../../config/apiConfig";
import { useEffect, useState } from "react";
import { authInstance } from "../../hooks/axiosInstances";

type Props = { selectedDate: string };

type DashboardData = {
  totalCommission: string;
  totalTaxDeducted: string;
  totalChannel: string;
  totalMusic: string;
  channelCommission: string;
  channelTaxDeducted: string;
  musicCommission: number;
};

type percentageChanges = {
  channelCommission: string;
  musicCommission: number;
  totalAsset: string;
  totalCommission: string;
};

function Cards({ selectedDate }: Props) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [assets, setAssets] = useState<string | null>(null);
  const [percentage, setpercentage] = useState<percentageChanges | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        API_ENDPOINTS.GET_ONE_DASHBOARD(selectedDate),{
          headers: authInstance(),
        }
      );
      setData(response.data.currentDashboardData);
      setAssets(response.data.currentAsset);
      setpercentage(response.data.percentageChanges);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-flow-col gap-6">
      <div className="bg-white px-8 py-6 rounded-2xl border">
        <p className="font-medium text-sm text-gray-600 pb-1">
          Total revenue of {selectedDate}
        </p>
        <p className="font-bold text-2xl">
          ${parseFloat(data.totalCommission).toFixed(2)}
        </p>
        <div className="flex gap-2 mt-3 items-center m-1">
          <img
            src={
              percentage && parseFloat(percentage.totalCommission) > 1
                ? profit
                : loss
            }
            alt="arrow"
            className="w-8 h-8"
          />
          <p className="font-medium text-sm text-gray-600">
            {percentage?.totalCommission} % this month
          </p>
        </div>
      </div>
      <div className="bg-white px-8 py-6 rounded-2xl border">
        <p className="font-medium text-sm text-gray-600 pb-1">Total Assets</p>
        <p className="font-bold text-2xl">{assets}</p>
        <div className="flex gap-2 mt-3 items-center m-1">
          <img
            src={
              percentage && parseFloat(percentage.totalAsset) > 1
                ? profit
                : loss
            }
            alt="arrow"
            className="w-8 h-8"
          />
          <p className="font-medium text-sm text-gray-600">
            {percentage?.totalAsset} % this month
          </p>
        </div>
      </div>
      <div className="bg-white px-8 py-6 rounded-2xl border">
        <p className="font-medium text-sm text-gray-600 pb-1">
          Channel revenue
        </p>
        <p className="font-bold text-2xl">
          ${parseFloat(data.channelCommission).toFixed(2)}
        </p>
        <div className="flex gap-2 mt-3 items-center m-1">
          <img
            src={
              percentage && parseFloat(percentage.channelCommission) > 1
                ? profit
                : loss
            }
            alt="arrow"
            className="w-8 h-8"
          />
          <p className="font-medium text-sm text-gray-600">
            {percentage?.channelCommission} % this month
          </p>
        </div>
      </div>
      <div className="bg-white px-8 py-6 rounded-2xl border">
        <p className="font-medium text-sm text-gray-600 pb-1">Music revenue</p>
        <p className="font-bold text-2xl">
          ${(data.musicCommission) ??= 0}
        </p>
        <div className="flex gap-2 mt-3 items-center m-1">
          <img
            src={
              percentage && (percentage.musicCommission) > 1
                ? profit
                : loss
            }
            alt="arrow"
            className="w-8 h-8"
          />
          <p className="font-medium text-sm text-gray-600">
            {percentage?.musicCommission} % this month
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cards;
