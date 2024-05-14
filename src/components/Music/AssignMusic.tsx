import { useState } from "react";
import { Close } from "../icons/icon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  music: Music; // Add music prop here
  onClose: () => void;
};

type Music = {
  _id: string;
  licensorId: string;
  licensor: string;
  licensorName: string;
  licensorEmail: string;
  commision: string;
  ytRevenue: string;
};

const AssignMusic = ({ music, onClose }: Props) => {
  const [musicData, setMusicData] = useState<Music>({
    _id: "",
    licensorId: "",
    licensor: "",
    licensorName: "",
    licensorEmail: "",
    commision: "",
    ytRevenue: "",
  });

  const history = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMusicData({ ...musicData, [name]: value });
  };

  const createMusic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/assignMusic/${music?._id || ""}`,
        musicData
      );
      console.log(response.data);
      setTimeout(() => {
        history("/music");
      }, 1000);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="px-8 py-8 w-[823px] h-[612px]">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">Add Music</p>
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className="mt-5">
        <form onSubmit={createMusic}>
          <div>
            <p>Add Music logo</p>
            <div className="bg-slate-100 px-4 py-6 w-[723px] h-[184px] rounded-2xl">
              <div className="flex flex-col gap-3 items-center justify-center bg-white w-full h-full border-2 border-green-200 border-dashed rounded-2xl">
                <div>logo</div>
                <div className="text-sm font-medium">
                  Drop your logo here, or browse
                </div>
                <div className="text-xs">Supports, JPG, PNG</div>
              </div>
            </div>
          </div>
          <div className="py-6 flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="">Select licensor</label>
              <input
                type="text"
                name="licensor"
                onChange={handleChange}
                placeholder="Select licensor"
                className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Music ID</label>
              <input
                type="text"
                name="licensorId"
                onChange={handleChange}
                value={music?.licensorId}
                className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Music name</label>
              <input
                type="text"
                placeholder="Music name"
                name="licensorName"
                onChange={handleChange}
                value={music?.licensorName}
                className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="licensorEmail"
                onChange={handleChange}
                value={music?.licensorEmail}
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Commission (%)</label>
              <input
                type="number"
                placeholder="Commission"
                name="commision"
                onChange={handleChange}
                value={music?.commision}
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="flex justify-end pt-5">
            <button
              type="submit"
              className="bg-black text-white font-bold px-4 py-2 rounded-lg"
            >
              Add & Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignMusic;
