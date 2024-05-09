import { useEffect, useState } from "react";

import ChannelTable from "../components/Channel/ChannelTable";
import { Plus } from "../components/icons/icon";
import UnassignedMusic from "../components/Music/UnassignedMusic";


function Music() {
  const [channels, setChannels] = useState([]);
  const [showUnassigned, setShowUnassigned] = useState(false); // State to control the display

  useEffect(() => {
    fetch("http://localhost:3000/get-channel") // Replace with your backend server's API endpoint
      .then((response) => response.json())
      .then((data) => setChannels(data))
      .catch((error) => console.error("Error fetching channels:", error));
  }, []);

  return (
    <>
      <div className="bg-gray-100 pl-[34px] pt-[20px] h-[90svh] ">
        <div className="flex justify-between items-center pl-[34px]">
          <div>
            <h1 className="text-xl font-bold">Music</h1>
            <h1 className="pt-2">List of channels created in the system</h1>
          </div>
          <button
            // to="/unassignedChannels"
            className="flex bg-black text-white rounded-lg w-[197px] h-[48px] justify-center mr-[34px] gap-2 items-center font-bold"
            onClick={() => setShowUnassigned(true)} // Set showUnassigned to true when the button is clicked
          >
            <Plus />
            Add Music
          </button>
        </div>
        {showUnassigned ? (
          <UnassignedMusic />
        ) : (
          <ChannelTable channels={channels} />
        )}
      </div>
    </>
  );
}

export default Music;
