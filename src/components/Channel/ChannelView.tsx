import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_ENDPOINTS from "../../config/apiConfig";
import { Back, Block, Rupee } from "../icons/icon";
import { authInstance } from "../../hooks/axiosInstances";


type Props = {};

const ChannelView = ({}: Props) => {
  const { id } = useParams<{ id?: string }>();
  const [channelData, setChannelData] = useState<any>(null);
  const [channelInvoice, setChannelInvoice] = useState<any[]>([]);

  useEffect(() => {
    fetchChannelData();
  }, [id]);

  const fetchChannelData = async () => {
    try {
      if (id) {
        const response = await axios.get(API_ENDPOINTS.VIEW_CHANNEL(id),{
          headers:authInstance()
        });
        setChannelData(response.data.channelDetails);
        setChannelInvoice(response.data.channelInvoice);
      }
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  return (
    <div className="bg-gray-100 h-[90svh]">
      <div className="pl-[34px] pt-[45px]">
        <Link to="/home/channel">
          <button className="flex gap-1 border font-medium border-gray-600 items-center rounded-lg px-3 py-2 text-sm">
            <Back />
            Back
          </button>
        </Link>
      </div>
      {channelData && (
        <div className="flex flex-col mx-[34px] px-[32px] pt-[32px] bg-white w-[95%] rounded-2xl h-[470px] mt-[24px]">
          <h2 className="text-xl font-bold mb-4 ">Channel Details</h2>
          <div className="flex px-[24px] gap-8 py-[24px] rounded-lg h-[181px] bg-gray-100">
            <div className="flex items-center justify-center border px-[30px] w-[153px] h-[120px] py-[16px]">
              {channelData.channelLogo && (
                <img
                  src={channelData.channelLogo}
                  alt="Company Logo"
                  className="mx-auto object-contain"
                />
              )}
            </div>
            <div>
              <p className="font-bold text-lg">{channelData.channelName}</p>
              <div className="flex py-5 ">
                <div className="pr-[52px] border-r-2">
                  <Block />
                  <p className="text-sm text-gray-400  py-1">Licensor</p>
                  <p className="text-sm font-bold">
                    {channelData.licensorName}
                  </p>
                </div>
                <div className="px-[52px]">
                  <Rupee />
                  <p className="text-sm text-gray-400 py-1">GV Commission %</p>
                  <p className="text-sm font-bold">{channelData.commission}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex px-6 py-6 mt-4 rounded-lg  bg-gray-100">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-1 font-normal">Date</th>
                  <th className="px-4 py-1 font-normal">Invoice Number</th>
                  <th className="px-4 py-1 font-normal">Payout</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {channelInvoice.map((invoice) => (
                  <tr key={invoice._id}>
                    <td className="px-4 py-1 font-normal">{invoice.date}</td>
                    <td className="px-4 py-1 font-normal">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-4 py-1 font-normal">{invoice.payout}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelView;
