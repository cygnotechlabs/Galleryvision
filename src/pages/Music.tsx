import MusicTable from "../components/Music/MusicTable";
import { Plus } from "../components/icons/icon";
import { Link } from "react-router-dom";

function Music() {
  return (
    <>
      <div className="bg-gray-100 m-6 ">
        <div className="flex justify-between mb-3 items-center">
          <div>
            <h1 className="text-xl font-bold">Music</h1>
            <h1 className="text-sm font-normal text-gray-400">
              List of musics created in the system
            </h1>
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
