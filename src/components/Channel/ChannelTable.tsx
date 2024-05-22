import axios from "axios";
import { Key, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../layouts/Modal";
import { Edit, Eye, Filter, Search, Trash } from "../icons/icon";
import EditChannel from "./EditChannel";
import { DeleteModal } from "../../UI/DeleteModal";
import API_ENDPOINTS from "../../config/apiConfig";

type Props = {};
interface ChannelType {
  _id: string;
  channelId: string;
  channelName: string;
  commission: string;
  channelEmail: string;
  licensorName: string;
  channelLogo: string;
}

function ChannelTable({}: Props) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editChannelId, setEditChannelId] = useState<string | undefined>();
  const [channelDeleteId, setChannelDeleteId] = useState<string | undefined>();
  const [channels, setChannels] = useState<ChannelType[]>([]);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_LINKED_CHANNEL);
      setChannels(response.data);
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };

  const handleDelete = async () => {
    if (!channelDeleteId) return;

    try {
      await axios.delete(
        API_ENDPOINTS.REMOVE_CHANNEL(channelDeleteId)
      );
      setOpenDelete(false);
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
    fetchChannels();
  };

  function handleSearch(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="bg-white shadow-md rounded-xl ml-[34px] mt-[24px] mr-[34px] h-[75svh] pr-9">
      <div className="relative pl-8 pb-5 pt-8 pr-8 ">
        <div className="flex justify-between text-sm">
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-s-md px-4 w-[566px] h-[42px] pr-[40px]"
            />
            <button
              onClick={handleSearch}
              className="bg-black text-white px-2 rounded-e-2xl"
            >
              <Search />
            </button>
          </div>
          <button className="flex items-center px-4 gap-2 w-[93px] h-[34px] border border-gray-400 text-black font-medium bg-gray-100 rounded-lg">
            Filter
            <span>
              <Filter />
            </span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto px-9 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-1 text-left text-sm">Logo</th>
              <th className="px-4 py-1 text-left text-sm">Channel name</th>
              <th className="px-4 py-1 text-left text-sm">Licensor name</th>
              <th className="px-4 py-1 text-left text-sm">Email</th>
              <th className="px-4 py-1 text-left text-sm">Commission</th>
              <th className="px-4 py-1 text-left text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {channels.map(
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
                    {channel.channelEmail}
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
                          setEditChannelId(channel._id);
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

      <div className="pt-4 flex justify-center">
        <nav className="flex items-center gap-96" aria-label="Pagination">
          <div>Showing 1 of 5 of 20 entries</div>
          <ul className="flex list-style-none">
            <li>
              <a
                href="#"
                className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight bg-red-500 text-white border border-gray-300 hover:bg-red-600 hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </a>
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
          channelId={editChannelId}
          onClose={() => {
            setOpenEdit(false);
            fetchChannels();
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
