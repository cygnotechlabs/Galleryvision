import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import API_ENDPOINTS from "../../config/apiConfig";
import Modal from "../../layouts/Modal";
import { Back, Edit } from "../icons/icon";
import AssignChannel from "./AssignChannel";
import { authInstance } from "../../hooks/axiosInstances";
authInstance

type Channel = {
  _id: string;
  channelId: string;
  channelName: string;
  partnerRevenue: string;
  commission: string;
  channelEmail: string;
  licensorName: string;
  licensorId: string;
  channelLogo: string;
};

function UnassignedChannel() {
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedChannel, setSelectedChannel] = useState<Channel>({
    _id: "",
    channelId: "",
    channelName: "",
    partnerRevenue: "",
    commission: "",
    channelEmail: "",
    licensorName: "",
    licensorId: "",
    channelLogo: "",
  });

  useEffect(() => {
    fetchData();
  }, []);


const fetchData = async () => {
  try {
    // Make the GET request with the token included in the headers
    const response = await axios.get(API_ENDPOINTS.GET_UNLINKED_CHANNEL, {
      headers: authInstance(),
    });

    // Set the channels state with the response data
    setChannels(response.data);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error fetching data:", error);
  }
};


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredChannels = channels.filter(
    (channel) =>
      (channel.channelName &&
        channel.channelName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (channel.channelId &&
        channel.channelId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredChannels.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="bg-gray-100 pl-[34px] pt-[20px] h-[90svh]">
      <Toaster />
      <div className="flex justify-between items-center pl-[34px]">
        <div>
          <Link
            to="/home/channel"
            className="flex gap-1 border font-medium border-gray-600 items-center rounded-lg px-3 py-2 text-sm"
          >
            <Back />
            Back
          </Link>
        </div>
        <Link
          to="/home/create-channel"
          className="flex bg-black text-white rounded-lg w-[197px] h-[48px] justify-center mr-[34px] gap-2 items-center font-bold"
        >
          Create Channel
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-xl ml-[34px] mt-[24px] mr-[34px] pr-9">
        <div className="relative pl-8 pb-5 pt-8 pr-8 ">
          <div className="flex justify-between text-sm">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md w-[40%] h-[42px] px-10"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute left-12 top-[53px] transform -translate-y-1/2 w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
        <div className="overflow-x-auto px-9 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-1 text-left text-sm">Channel ID</th>
                <th className="px-4 py-1 text-left text-sm">Partner Revenue</th>
                <th className="px-4 py-1 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((channel, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-1  border-gray-200 text-sm">
                    {channel.channelId}
                  </td>
                  <td className="px-4 py-1  border-gray-200 text-sm">
                    {channel.partnerRevenue}
                  </td>
                  <td className="px-4 py-1  border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setSelectedChannel(channel);
                        }}
                        className="flex bg-black gap-2 hover:bg-gray-600 text-white font-medium py-2 px-2  border text-sm items-center border-black rounded-lg"
                      >
                        <Edit />
                        Assign licensor
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pt-4 flex justify-center">
          <ul className="flex">
            <li>
              <button
                className="px-3 py-1 mr-1 border border-gray-300 rounded-md hover:bg-gray-200"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"< Prev"}
              </button>
            </li>
            <li>
              <button
                className="px-3 py-1 ml-1 border border-gray-300 rounded-md hover:bg-gray-200"
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredChannels.length / rowsPerPage)
                }
              >
                {"Next >"}
              </button>
            </li>
          </ul>
        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
          <AssignChannel
            channel={selectedChannel}
            onClose={() => {
              setOpen(false);
            }}
            onSave={() => {
              fetchData();
              toast.success("Channel Assigned Successfully");
            }}
          />
        </Modal>
      </div>
    </div>
  );
}

export default UnassignedChannel;
