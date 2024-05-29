import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_ENDPOINTS from "../../config/apiConfig";
import { Back, Block, Rupee } from "../icons/icon";

type Props = {};

const MusicView = ({}: Props) => {
  const { id } = useParams<{ id: string }>();
  const [musicData, setMusicData] = useState<any>(null);
  const [musicInvoice, setMusicInvoice] = useState<any[]>([]);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        if (id) {
          const response = await axios.get(API_ENDPOINTS.VIEW_MUSIC(id));
          setMusicData(response.data.musicDetails);
          setMusicInvoice(response.data.musicInvoice);
        }
      } catch (error) {
        console.error("Error fetching music data:", error);
      }
    };

    fetchMusicData();
  }, [id]);

  return (
    <div className="bg-gray-100 h-[90svh]">
      <div className="pl-[34px] pt-[45px]">
        <Link to="/home/music">
          <button className="flex gap-1 border font-medium border-gray-600 items-center rounded-lg px-3 py-2 text-sm">
            <Back />
            Back
          </button>
        </Link>
      </div>
      {musicData && (
        <div className="flex flex-col mx-[34px] px-[32px] pt-[32px] bg-white w-[95%] rounded-2xl h-[470px] mt-[24px]">
          <h2 className="text-xl font-bold mb-4 ">Music Details</h2>
          <div className="flex px-[24px] gap-8 py-[24px] rounded-lg h-[181px] bg-gray-100">
            <div className="flex items-center justify-center border px-[30px] w-[153px] h-[120px] py-[16px]">
              {musicData.musicLogo && (
                <img
                  src={musicData.musicLogo}
                  alt="Company Logo"
                  className="w-[150px] h-[150px] object-contain"
                />
              )}
            </div>
            <div>
              <p className="font-bold text-lg">{musicData.musicName}</p>
              <div className="flex py-5 ">
                <div className="pr-[52px] ">
                  <Block />
                  <p className="text-sm text-gray-400 py-1">Licensor</p>
                  <p className="text-sm font-bold">{musicData.licensorName}</p>
                </div>
                <div className="px-[52px]">
                  <Rupee />
                  <p className="text-sm text-gray-400 py-1">Commission %</p>
                  <p className="text-sm font-bold">{musicData.commission}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex px-6 mt-4 rounded-lg  bg-gray-100">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-1 font-normal">Date</th>
                  <th className="px-4 py-1 font-normal">Invoice Number</th>
                  <th className="px-4 py-1 font-normal">Payout</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {musicInvoice.map((invoice) => (
                  <tr key={invoice._id}>
                    <td>{invoice.date}</td>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.payout}</td>
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

export default MusicView;
