import { Link, useParams } from "react-router-dom";
import { Block, Email, Flag, Rupee } from "../icons/icon";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {};

const MusicView = ({}: Props) => {
  const { id } = useParams<{ id: string }>();
  const [musicData, setMusicData] = useState<any>(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/mchannel-details/${id}`
        );
        setMusicData(response.data);
      } catch (error) {
        console.error("Error fetching music data:", error);
      }
    };

    fetchChannelData();
  }, [id]);

  return (
    <div className="bg-gray-100 h-[90svh]">
      <div className="pl-[34px] pt-[45px]">
        <Link to="/music">
          <button className="flex gap-1 border font-medium border-gray-600 items-center rounded-lg px-3 py-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </button>
        </Link>
      </div>
      {musicData && (
        <div className="flex flex-col mx-[34px] px-[32px] pt-[32px] bg-white w-[95%] rounded-2xl h-[470px] mt-[24px]">
          <h2 className="text-xl font-bold mb-4 ">Music Details</h2>
          <div className="flex px-[24px] gap-8 py-[24px] rounded-lg h-[181px] bg-gray-100">
            <div className="flex items-center justify-center border px-[30px] w-[153px] h-[120px] py-[16px]">
              logo
            </div>
            <div>
              <p className="font-bold text-lg">{musicData.licensorName}</p>
              <div className="flex py-5 ">
                <div className="pr-[52px] ">
                  <Block />
                  <p className="text-sm text-gray-400 py-1">Licensor</p>
                  <p className="text-sm font-bold">{musicData.licensor}</p>
                </div>
                <div className="px-[52px] border-x border-gray-400">
                  <Email />
                  <p className="text-sm text-gray-400 py-1">Email</p>
                  <p className="text-sm font-bold">{musicData.licensorEmail}</p>
                </div>
                <div className="px-[52px] border-r border-gray-400">
                  <Flag />
                  <p className="text-sm text-gray-400 py-1">Country</p>
                  <p className="text-sm font-bold">India</p>
                </div>
                <div className="px-[52px]">
                  <Rupee />
                  <p className="text-sm text-gray-400 py-1">Commission %</p>
                  <p className="text-sm font-bold">{musicData.commision}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex px-[24px] gap-8 py-[24px] mt-4 rounded-lg h-[151px] bg-gray-100"></div>
        </div>
      )}
    </div>
  );
};

export default MusicView;
