import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../layouts/Modal";
import { Back, Edit, Filter } from "../icons/icon";
import AssignMusic from "./AssignMusic";
import axios from "axios";

type Music = {
  _id: string;
  licensorId: string;
  musicId: string;
  licensorName: string;
  musicName: string;
  musicEmail: string;
  licensor: string;
  commission: string;
  musicLogo: string;
};

function UnassignedMusic() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;
  const [selectedMusic, setSelectedMusic] = useState<Music>({
    _id: "",
    licensorId: "",
    musicId: "",
    licensorName: "",
    musicName: "",
    musicEmail: "",
    licensor: "",
    commission: "",
    musicLogo: "",
  });
  const [musics, setMusics] = useState<Music[]>([
    {
      _id: "",
      licensorId: "",
      musicId: "",
      licensorName: "",
      musicName: "",
      musicEmail: "",
      licensor: "",
      commission: "",
      musicLogo: "",
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get-rawmusic");
      setMusics(response.data);
      console.log(currentMusicData);
    } catch (error) {
      console.error("Error fetching music data:", error);
    }
  };
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate the current music data for the active page
  const indexOfLastMusic = currentPage * rowsPerPage;
  const indexOfFirstMusic = indexOfLastMusic - rowsPerPage;
  const currentMusicData = musics.slice(indexOfFirstMusic, indexOfLastMusic);

  return (
    <div className="bg-gray-100 pl-[34px] pt-[20px] h-[90svh]">
      <div className="flex justify-between items-center pl-[34px]">
        <div>
          <Link
            to="/home/music"
            className="flex gap-1 border font-medium border-gray-600 items-center rounded-lg px-3 py-2 text-sm"
          >
            <Back />
            Back
          </Link>
        </div>
        <Link
          to="/home/create-music"
          className="flex bg-black text-white rounded-lg w-[197px] h-[48px] justify-center mr-[34px] gap-2 items-center font-bold"
        >
          Create Music
        </Link>
      </div>
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
        <div className="px-9 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-1 text-left text-sm">Music ID</th>
                <th className="px-4 py-1 text-left text-sm">Music Name</th>
                <th className="px-4 py-1 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMusicData.map((music, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-1  border-gray-200 text-sm">
                    {music.musicId}
                  </td>
                  <td className="px-4 py-1  border-gray-200 text-sm">
                    {music.musicName}
                  </td>
                  <td className="px-4 py-1  border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setSelectedMusic(music);
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
            {/* Map through each page number and render a button */}

            <li>
              <button
                className="px-3 py-1 ml-1 border border-gray-300 rounded-md hover:bg-gray-200"
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(musics.length / rowsPerPage)
                }
              >
                {"Next >"}
              </button>
            </li>
          </ul>
        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
          <AssignMusic
            music={selectedMusic}
            onClose={() => {
              setOpen(false);
              fetchData();
            }}
          />
        </Modal>
      </div>
    </div>
  );
}

export default UnassignedMusic;
