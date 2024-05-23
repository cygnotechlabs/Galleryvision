import { useEffect, useState } from "react";
import Modal from "../../layouts/Modal";
import { Edit, Eye, Filter, Trash } from "../icons/icon";
import EditMusic from "./EditMusic";
import axios from "axios";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../UI/DeleteModal";
import API_ENDPOINTS from "../../config/apiConfig";

type Props = {};

type Music = {
  _id: string;
  licensorId: string;
  musicId: string;
  licensorName: string;
  musicName: string;
  musicEmail: string;
  commission: string;
  musicLogo: string;
};

function MusicTable({}: Props) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [music, setMusic] = useState<Music>({
    _id: "",
    licensorId: "",
    musicId: "",
    licensorName: "",
    musicName: "",
    musicEmail: "",
    commission: "",
    musicLogo: "",
  });
  const [musics, setMusics] = useState<Music[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_LINKEDMUSIC);
      setMusics(response.data);
    } catch (error) {
      console.error("Error fetching music data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(API_ENDPOINTS.DEL_MUSIC(deleteId));
      fetchData();
    } catch (error) {
      console.error("Error deleting music:", error);
    }
  };

  const indexOfLastMusic = currentPage * rowsPerPage;
  const indexOfFirstMusic = indexOfLastMusic - rowsPerPage;
  const currentMusics = musics.slice(indexOfFirstMusic, indexOfLastMusic);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div className="bg-white shadow-md rounded-xl ml-[34px] mt-[24px] mr-[34px] h-[75svh] pr-9">
      <div className="relative pl-8 pb-5 pt-8 pr-8 ">
        <div className="flex justify-between text-sm">
          <input
            type="text"
            placeholder="             Search"
            className="border border-gray-300 rounded-md w-[566px] h-[42px] pr-[40px]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute left-12 top-[53px] transform -translate-y-1/2 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
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
              <th className="px-4 py-1 text-left text-sm">Music name</th>
              <th className="px-4 py-1 text-left text-sm">Licensor name</th>
              <th className="px-4 py-1 text-left text-sm">Email</th>
              <th className="px-4 py-1 text-left text-sm">Commission</th>
              <th className="px-4 py-1 text-left text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMusics.map((music, index) => (
              <tr key={index} className="bg-white">
                <td className="px-4 py-1  border-gray-200 text-sm">
                  {music.musicLogo && (
                    <img
                      src={music.musicLogo}
                      alt="Company Logo"
                      className="mx-auto w-12 object-contain rounded-full"
                    />
                  )}
                </td>
                <td className="px-4 py-1  border-gray-200 text-sm">
                  {music.musicName}
                </td>
                <td className="px-4 py-1  border-gray-200 text-sm">
                  {music.licensorName}
                </td>
                <td className="px-4 py-1  border-gray-200 text-sm">
                  {music.musicEmail}
                </td>
                <td className="px-4 py-1  border-gray-200 text-sm">
                  {music.commission}
                </td>
                <td className="px-4 py-1  border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Link to={`/home/music-view/${music._id}`}>
                      <button className="flex gap-2 bg-red-100 hover:bg-gray-400 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg">
                        <Eye />
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setOpenEdit(true);
                        setMusic(music);
                      }}
                      className="flex gap-2 bg-gray-100 hover:bg-gray-400 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg"
                    >
                      <Edit />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setOpenDelete(true);
                        setDeleteId(music._id);
                      }}
                      className="flex gap-2 bg-red-400 hover:bg-gray-400 text-white hover:text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg"
                    >
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-4 flex justify-center">
        <nav className="flex items-center gap-96" aria-label="Pagination">
          <div>
            Showing {indexOfFirstMusic + 1} to{" "}
            {Math.min(indexOfLastMusic, musics.length)} of {musics.length}{" "}
            entries
          </div>
          <ul className="flex list-style-none">
            <li>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-400 bg-gray-100 rounded-lg mr-1"
              >
                Previous
              </button>
            </li>
            <li>
              <button
                onClick={handleNextPage}
                disabled={indexOfLastMusic >= musics.length}
                className="px-3 py-1 border border-gray-400 bg-gray-100 rounded-lg"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Modal
        onClose={() => {
          setOpenDelete(false);
        }}
        open={openDelete}
      >
        <DeleteModal
          onClose={() => setOpenDelete(false)}
          handleDelete={() => {
            handleDelete();
            fetchData();
          }}
        />
      </Modal>
      <Modal
        onClose={() => {
          setOpenEdit(false);
        }}
        open={openEdit}
      >
        <EditMusic
          music={music}
          onClose={() => {
            setOpenEdit(false);
            fetchData();
          }}
        />
      </Modal>
    </div>
  );
}

export default MusicTable;
