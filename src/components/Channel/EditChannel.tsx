import { useEffect, useState } from "react";
import { Close } from "../icons/icon";
import axios from "axios";
import { Link } from "react-router-dom";

type ChannelData = {
  channelId: string;
  channelName: string;
  commission: string;
  email: string;
  licensorName: string;
  logo: string;
};

type Props = {
  onClose: () => void;
  channelId?: string;
};

const EditChannel = ({ onClose, channelId }: Props) => {
  const [channelData, setChannelData] = useState<ChannelData>({
    channelId: "",
    channelName: "",
    commission: "",
    email: "",
    licensorName: "",
    logo: "",
  });
  const [updatedData, setUpdatedData] = useState<ChannelData>({
    channelId: "",
    channelName: "",
    commission: "",
    email: "",
    licensorName: "",
    logo: "",
  });

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/view-channel/${channelId}`
        );
        setChannelData(response.data);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    fetchChannelData();
  }, [channelId]);

  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/update-channel/${channelId}`,
        updatedData
      );
      onClose();
    } catch (error) {
      console.error("Error updating channel data:", error);
    }
  };

  return (
    <div className="px-8 py-8 w-[823px] h-[612px]">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Edit channel details</p>
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className="mt-5">
        <div>
          <p>Edit music logo</p>
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
              onChange={handleUpdate}
              placeholder={channelData.licensorName}
              className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
              name="licensorName"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="">Channel ID</label>
            <input
              type="text"
              onChange={handleUpdate}
              placeholder={channelData.channelId}
              className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
              name="channelId"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="">Channel name</label>
            <input
              type="text"
              onChange={handleUpdate}
              placeholder={channelData.channelName}
              className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
              name="channelName"
            />
          </div>
        </div>{" "}
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <label htmlFor="">Email</label>
            <input
              type="email"
              onChange={handleUpdate}
              placeholder={channelData.email}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
              name="email"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="">Commission (%)</label>
            <input
              type="number"
              onChange={handleUpdate}
              placeholder={channelData.commission}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
              name="commission"
            />
          </div>{" "}
        </div>
        <div className="flex justify-end pt-5">
          <button
            onClick={(event) => {
              onClose();
              handleSubmit(event);
            }}
            className="bg-black text-white font-bold px-2 py-2 rounded-lg"
          >
            Add & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditChannel;
