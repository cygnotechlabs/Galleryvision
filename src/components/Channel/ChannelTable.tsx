import axios from "axios";
import { Key, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../UI/DeleteModal";
import API_ENDPOINTS from "../../config/apiConfig";
import Modal from "../../layouts/Modal";
import { Edit, Eye, Search, Trash } from "../icons/icon";
import EditChannel from "./EditChannel";
import { authInstance } from "../../hooks/axiosInstances";

type Props = {};
interface ChannelType {
  _id: string;
  channelId: string;
  channelName: string;
  commission: string;
  channelEmail: string;
  licensorName: string;
  channelLogo: string;
  licensorId: string;
}

function ChannelTable({}: Props) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [channel, setChannel] = useState<ChannelType>({
    _id: "",
    licensorId: "",
    channelId: "",
    licensorName: "",
    channelName: "",
    channelEmail: "",
    commission: "",
    channelLogo: "",
  });
  const [channelDeleteId, setChannelDeleteId] = useState<string | undefined>();
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChannels, setFilteredChannels] = useState<ChannelType[]>([]);
  const rowsPerPage = 12;

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_LINKED_CHANNEL,{
        headers:authInstance()
      });
      setChannels(response.data);
      setFilteredChannels(response.data);
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };

  const handleDelete = async () => {
    if (!channelDeleteId) return;

    try {
      await axios.delete(API_ENDPOINTS.REMOVE_CHANNEL(channelDeleteId),{
        headers:authInstance()
      });
      setOpenDelete(false);
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
    fetchChannels();
    toast.success("Deleted Successfully");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredChannels(channels);
    } else {
      const filtered = channels.filter((channel) =>
        channel.channelName.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredChannels(filtered);
    }
  };

  const indexOfLastChannel = currentPage * rowsPerPage;
  const indexOfFirstChannel = indexOfLastChannel - rowsPerPage;
  const currentChannels = filteredChannels.slice(
    indexOfFirstChannel,
    indexOfLastChannel
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div className="bg-white shadow-md rounded-xl mx-[34px] my-6  pr-9">
      <Toaster />
      <div className="relative pb-5 pt-8 px-8 ">
        <div className="flex justify-between text-sm">
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-s-md px-4 w-[566px] h-[42px] pr-[40px] w-25"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <i className="m-3" style={{ marginLeft: "-35px" }}>
              <Search />
            </i>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto px-9 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-1 text-left text-sm">Logo</th>
              <th className="px-4 py-1 text-left text-sm">Channel Name</th>
              <th className="px-4 py-1 text-left text-sm">Licensor Name</th>
              <th className="px-4 py-1 text-left text-sm">GV Commission</th>
              <th className="px-4 py-1 text-left text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentChannels.map(
              (channel: ChannelType, index: Key | null | undefined) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-1 border-gray-200 text-sm">
                    {channel.channelLogo && (
                      <img
                        src={channel.channelLogo}
                        alt="Company Logo"
                        className="mx-auto w-12 object-contain rounded-full"
                      />
                    )}
                  </td>
                  <td className="px-4 py-1 border-gray-200 text-sm">
                    {channel.channelName}
                  </td>
                  <td className="px-4 py-1 border-gray-200 text-sm">
                    {channel.licensorName}
                  </td>
                  <td className="px-4 py-1 border-gray-200 text-sm">
                    {channel.commission}
                  </td>
                  <td className="px-4 py-1 border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Link to={`/home/channel-view/${channel._id}`}>
                        <button className="flex gap-2 bg-red-100 hover:bg-gray-400 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg">
                          <Eye />
                          View
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setOpenEdit(true);
                          setChannel(channel);
                        }}
                        className="flex gap-2 bg-gray-100 hover:bg-gray-400 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg"
                      >
                        <Edit />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setOpenDelete(true);
                          setChannelDeleteId(channel._id);
                        }}
                        className="flex gap-2 bg-red-400 hover:bg-gray-400 text-white hover:text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg"
                      >
                        <Trash />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="py-4 flex justify-center">
        <nav className="flex items-center gap-96" aria-label="Pagination">
          <div>
            Showing {indexOfFirstChannel + 1} to{" "}
            {Math.min(indexOfLastChannel, filteredChannels.length)} of{" "}
            {filteredChannels.length} entries
          </div>
          <ul className="flex list-style-none">
            <li>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-400 bg-gray-100 rounded-lg mr-1 hover:bg-gray-200 cursor-pointer"
              >
                Previous
              </button>
            </li>
            <li>
              <button
                onClick={handleNextPage}
                disabled={indexOfLastChannel >= channels.length}
                className="px-3 py-1 border border-gray-400 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <Modal
        onClose={() => {
          setOpenEdit(false);
        }}
        open={openEdit}
      >
        <EditChannel
          onSave={() => {
            fetchChannels();
            toast.success("Edited Successfully");
          }}
          channel={channel}
          onClose={() => {
            setOpenEdit(false);
          }}
        />
      </Modal>
      <Modal
        onClose={() => {
          setOpenDelete(false);
          fetchChannels();
        }}
        open={openDelete}
      >
        <DeleteModal
          onClose={() => setOpenDelete(false)}
          handleDelete={handleDelete}
        />
      </Modal>
    </div>
  );
}

export default ChannelTable;
