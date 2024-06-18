import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../UI/DeleteModal";
import API_ENDPOINTS from "../../config/apiConfig";
import Modal from "../../layouts/Modal";
import { Edit, Eye, Search, Trash } from "../icons/icon";
import EditMusic from "./EditMusic";
import toast, { Toaster } from "react-hot-toast";
import { authInstance } from "../../hooks/axiosInstances";


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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const rowsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_LINKEDMUSIC, {
        headers:authInstance()
      });
      setMusics(response.data);
    } catch (error) {
      console.error("Error fetching music data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(API_ENDPOINTS.DEL_MUSIC(deleteId),{headers:authInstance()});
      fetchData();
    } catch (error) {
      console.error("Error deleting music:", error);
    }
    fetchData();
    toast.success("Deleted Successfully");
  };

  const indexOfLastMusic = currentPage * rowsPerPage;
  const indexOfFirstMusic = indexOfLastMusic - rowsPerPage;
  const filteredMusics = musics.filter((music) =>
    music.musicName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentMusics = filteredMusics.slice(
    indexOfFirstMusic,
    indexOfLastMusic
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  return (
    <div className="bg-white py-2 shadow-md rounded-xl mx-8 my-8 ">
      <div className="relative pl-8 pb-5 pt-8 pr-8 ">
        <Toaster />
        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            className="border  border-gray-300 rounded-md px-4 w-1/3 py-2"
            value={searchTerm}
            onChange={handleSearch}
          />
          <i className="m-3" style={{ marginLeft: "-35px" }}>
            <Search />
          </i>
        </div>
      </div>
      <div className="overflow-x-auto px-9 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-1 text-left text-sm">Logo</th>
              <th className="px-4 py-1 text-left text-sm">Music Name</th>
              <th className="px-4 py-1 text-left text-sm">Licensor Name</th>
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
                className="px-3 py-1 border border-gray-400 bg-gray-100 rounded-lg mr-1 hover:bg-gray-200 cursor-pointer"
              >
                Previous
              </button>
            </li>
            <li>
              <button
                onClick={handleNextPage}
                disabled={indexOfLastMusic >= musics.length}
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
