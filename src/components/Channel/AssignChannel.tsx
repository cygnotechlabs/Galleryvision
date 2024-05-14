import { useState } from "react";
import { Close } from "../icons/icon";
import axios from "axios";

type Props = {
  channelId: string;
  onClose: () => void;
};

const AssignChannel = ({ channelId, onClose }: Props) => {
  const [updatedData, setUpdatedData] = useState([
    {
      _id: "",
      channelId: "",
      channelName: "",
      commission: "",
      email: "",
      licensorName: "",
      logo: "",
      __v: 0,
    },
  ]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3000/update-channel/${channelId}`, updatedData)
      .then((res) => setUpdatedData(res.data))
      .catch((err) => console.log(err));
    onClose();
  };
  const handleUpdate = (event: { target: { name: any; value: any } }) => {
    setUpdatedData({ ...updatedData, [event.target.name]: event.target.value });
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
                onChange={handleUpdate}
                placeholder={`Select licensor `}
                className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg "
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Channel ID</label>
              <input
                type="text"
                onChange={handleUpdate}
                className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg "
              />
            </div>{" "}
            <div className="flex flex-col gap-4">
              <label htmlFor="">Channel name</label>
              <input
                type="text"
                placeholder={`Channel name `}
                onChange={handleUpdate}
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
                onChange={handleUpdate}
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg "
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Commission (%)</label>
              <input
                type="number"
                placeholder={`Commission `}
                onChange={handleUpdate}
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
