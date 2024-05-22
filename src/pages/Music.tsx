import MusicTable from "../components/Music/MusicTable";
import { Plus } from "../components/icons/icon";
import { Link } from "react-router-dom";

function Music() {
  return (
    <>
      <div className="bg-gray-100 pl-[34px] pt-[20px] h-[90svh]">
        <div className="flex justify-between items-center pl-[34px]">
          <div>
            <h1 className="text-xl font-bold">Music</h1>
            <h1 className="pt-2">List of musics created in the system</h1>
          </div>
          <Link
            to="/home/unassigned-musics"
            className="flex gap-1 border font-bold text-white items-center rounded-lg px-5 py-3 mr-8 text-lg bg-black"
          >
            <Plus /> Add Music
          </Link>
        </div>
        <MusicTable />
      </div>
    </>
  );
}

export default Music;
