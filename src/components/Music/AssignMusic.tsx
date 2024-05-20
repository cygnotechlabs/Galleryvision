import { useEffect, useState } from "react";
import { Close } from "../icons/icon";
import axios from "axios";

type Props = {
  music: Music;
  onClose: () => void;
};

type Music = {
  _id: string;
  licensorId: string;
  musicId: string;
  licensorName: string;
  musicName: string;
  musicEmail: string;
  commision: string;
  musicLogo: string;
  licensor: string;
};
type Licensor = {
  _id: string;
  licensorName: string;
};

const AssignMusic = ({ music, onClose }: Props) => {
  const [licensors, setLicensors] = useState<Licensor[]>([]);
  const [musicData, setMusicData] = useState<Music>(music);

  useEffect(() => {
    const getLicensorName = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-licensor");
        setLicensors(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getLicensorName();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMusicData({ ...musicData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/assignMusic/`,
        musicData
      );
      setMusicData(response.data);
      onClose();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setMusicData((prevData) => ({
        ...prevData,
        musicLogo: reader.result ? reader.result.toString() : "",
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLicensorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLicensor = licensors.find(
      (licensor) => licensor.licensorName === event.target.value
    );
    if (selectedLicensor) {
      setMusicData((prevData) => ({
        ...prevData,
        licensorName: selectedLicensor.licensorName,
        licensorId: selectedLicensor._id,
      }));
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
        <form onSubmit={handleSubmit}>
          <div>
            <p>Add music logo</p>
            <div className="bg-slate-100 px-4 py-6 w-[723px] h-[184px] rounded-2xl">
              <div className="flex flex-col gap-3 items-center justify-center bg-white w[100%] h-[100%] border-2 border-green-200 border-dashed rounded-2xl">
                <div>logo</div>
                <div className="text-sm font-medium">
                  Drop your logo here, or{" "}
                  <label className="cursor-pointer text-blue-500">
                    browse
                    <input
                      type="file"
                      accept="image/jpg, image/png"
                      name="musicLogo"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="text-xs">Supports, JPG, PNG</div>{" "}
                {musicData.musicLogo && (
                  <div className="w-16 h-16">
                    <img
                      src={musicData.musicLogo}
                      alt="Company Logo"
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="py-6 flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="licensorName">Select licensor</label>
              <select
                name="licensorName"
                onChange={handleLicensorChange}
                className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
                value={musicData.licensorName}
              >
                <option value="">Select Licensor</option>
                {licensors.map((licensor, index) => (
                  <option key={index} value={licensor.licensorName}>
                    {licensor.licensorName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="musicId">Music ID</label>
              <input
                type="text"
                name="musicId"
                onChange={handleChange}
                value={musicData.musicId}
                className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="musicName">Music name</label>
              <input
                type="text"
                placeholder="Music name"
                name="musicName"
                onChange={handleChange}
                value={musicData.licensor}
                className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="musicEmail">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="musicEmail"
                onChange={handleChange}
                value={musicData.musicEmail}
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="commision">Commission (%)</label>
              <input
                type="number"
                placeholder="Commission"
                name="commision"
                onChange={handleChange}
                value={musicData.commision}
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
