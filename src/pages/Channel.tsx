

import ChannelTable from "../components/Channel/ChannelTable";
import { Plus } from "../components/icons/icon";
import { Link } from "react-router-dom";


function Channel() {
 

  return (
    <>
      <div className="bg-gray-100 pl-[34px] pt-[20px] h-[90svh]">
        <div className="flex justify-between items-center pl-[34px]">
          <div>
            <h1 className="text-xl font-bold">Channel</h1>
            <h1 className="pt-2">List of channels created in the system</h1>
          </div>
          <Link
            to="/unassigned-channels"
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
