import { useState } from "react";
import { Close } from "../icons/icon";

type Props = {
  channelId: string;
  onClose: () => void;
  onChannelAdded: (newChannel: any) => void;
};

const AssignChannel = ({ channelId, onClose, onChannelAdded }: Props) => {
  const [channelName, setChannelName] = useState("");
  const [email, setEmail] = useState("");
  const [commission, setCommission] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/update-channel/${channelId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channelName,
            email,
            commission,
          }),
        }
      );
      const data = await response.json();
      onChannelAdded(data);
      onClose();
    } catch (error) {
      console.error("Error adding channel:", error);
    }
  };

  return (
    <div className="px-8 py-8 w-[823px] h-[612px]">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Add Channel</p>
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <div>
            <p>Add Channel logo</p>
            <div className="bg-slate-100 px-4 py-6 w-[723px] h-[184px] rounded-2xl">
              <div className="flex flex-col gap-3 items-center justify-center bg-white w[100%] h-[100%] border-2 border-green-200 border-dashed rounded-2xl">
                <div>logo</div>
                <div className="text-sm font-medium">
                  Drop your logo here, or browse
                </div>
                <div className="text-xs">Supports, JPG, PNG</div>
              </div>
            </div>
          </div>
          <div className=" py-6 flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="">Select licensor</label>
              <input
                type="text"
                placeholder={`Select licensor `}
                className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg "
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Channel ID</label>
              <input
                type="text"
                value={channelId}
                readOnly
                className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg "
              />
            </div>{" "}
            <div className="flex flex-col gap-4">
              <label htmlFor="">Channel name</label>
              <input
                type="text"
                placeholder={`Channel name `}
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
              />
            </div>
          </div>{" "}
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder={`Email `}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg "
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Commission (%)</label>
              <input
                type="number"
                placeholder={`Commission `}
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg "
              />
            </div>{" "}
          </div>
          <div className="flex justify-end pt-5">
            <button
              type="submit"
              className=" bg-black text-white font-bold px-2 py-2 rounded-lg"
            >
              Add & Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignChannel;
