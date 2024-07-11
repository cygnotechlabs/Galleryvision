import ChannelTable from "../components/Channel/ChannelTable";
import { Plus } from "../components/icons/icon";
import { Link } from "react-router-dom";

function Channel() {
  return (
    <>
      <div className="bg-gray-100 m-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Channel</h1>
            <h1 className="text-sm font-normal text-gray-400">
              List of channels created in the system
            </h1>
          </div>
          <Link
            to="/home/unassigned-channels"
            className="flex gap-1 border font-bold text-white items-center rounded-lg px-5 py-3 mr-8 text-lg bg-black"
          >
            <Plus />
            Add Channel
          </Link>
        </div>

        <ChannelTable />
      </div>
    </>
  );
}

export default Channel;
