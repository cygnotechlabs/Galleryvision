import { useState, useEffect } from "react";
import { Close } from "../icons/icon";
import axios from "axios";

type Music = {
  _id: string;
  licensorId: string;
  licensorName: string;
  licensorEmail: string;
  commision: string;
  ytRevenue: string;
  licensor: string;
};

type Props = {
  onClose: () => void;
  music: Music;
};

const EditMusic = ({ onClose, music }: Props) => {
  const [formData, setFormData] = useState<Music>(music);

  useEffect(() => {
    // This useEffect is empty since we don't want it to run on every re-render
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(music);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/update-music/${formData._id}`,
        formData
      );
      console.log(response.data); // Log the response if needed
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error updating music data:", error);
    }
  };

  return (
    <div className="px-8 py-8 w-[823px] h-[612px]">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Edit music details</p>
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
          {/* Your input fields */}
          {/* Select licensor */}
          <div className="flex flex-col gap-4">
            <label htmlFor="licensor">Select licensor</label>
            <input
              type="text"
              id="licensor"
              name="licensor"
              onChange={handleChange}
              placeholder={`${music.licensor}`}
              className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
            />
          </div>
          {/* Music ID */}
          <div className="flex flex-col gap-4">
            <label htmlFor="musicId">Music ID</label>
            <input
              type="text"
              id="licensorId"
              name="licensorId"
              onChange={handleChange}
              placeholder={`${music.licensorId}`}
              className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
            />
          </div>
          {/* Music name */}
          <div className="flex flex-col gap-4">
            <label htmlFor="musicName">Music name</label>
            <input
              type="text"
              id="licensorName"
              name="licensorName"
              onChange={handleChange}
              placeholder={`${music.licensorName}`}
              className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
            />
          </div>
        </div>
        {/* Email and Commission */}
        <div className="flex justify-between">
          {/* Email */}
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="licensorEmail"
              name="licensorEmail"
              onChange={handleChange}
              placeholder={`${music.licensorEmail}`}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
            />
          </div>
          {/* Commission */}
          <div className="flex flex-col gap-4">
            <label htmlFor="commission">Commission (%)</label>
            <input
              type="number"
              id="commision"
              name="commision"
              onChange={handleChange}
              placeholder={`${music.commision}`}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
            />
          </div>
        </div>
        {/* Save Button */}
        <div className="flex justify-end pt-5">
          <button
            onClick={handleSubmit}
            className=" bg-black text-white font-bold px-2 py-2 rounded-lg"
          >
            Add & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMusic;
