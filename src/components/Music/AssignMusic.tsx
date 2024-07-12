import { useEffect, useRef, useState } from "react";
import { Close } from "../icons/icon";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";
import { authInstance } from "../../hooks/axiosInstances";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  music: Music;
  onClose: () => void;
  onSave: () => void;
};

type Music = {
  _id: string;
  licensorId: string;
  musicId: string;
  licensorName: string;
  musicName: string;
  musicEmail: string;
  commission: string;
  musicLogo: string;
  licensor: string;
};
type Licensor = {
  _id: string;
  licensorName: string;
};

const AssignMusic = ({ music, onClose, onSave }: Props) => {
  const [licensors, setLicensors] = useState<Licensor[]>([]);
  const [musicData, setMusicData] = useState<Music>(music);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getLicensorName = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GET_LICENSOR, {
          headers: authInstance(),
        });
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
      const response = await axios.post(API_ENDPOINTS.ASSIGN_MUSIC, musicData, {
        headers: authInstance(),
      });
      setMusicData(response.data);
      onClose();
      onSave();
    } catch (error: any) {
      console.error(error.message);
      if (axios.isAxiosError(error)) {
        // Error is an AxiosError
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        // Error is not an AxiosError
        console.error("An unexpected error occurred");
      }
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

  const handleLicensorChange = (licensorName: string, licensorId: string) => {
    setMusicData((prevData) => ({
      ...prevData,
      licensorName: licensorName,
      licensorId: licensorId,
    }));
    setSearchTerm(licensorName);
    setIsDropdownOpen(false);
  };
  const handleSearchLicensors = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
    setIsDropdownOpen(true);
  };
  const filteredLicensors = licensors.filter((licensor) =>
    licensor.licensorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-8 py-8 w-[823px] h-[612px]">
      <Toaster />
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
                <div>Logo</div>
                <div className="text-sm font-medium">
                  Select your logo here,{" "}
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
            <div className="flex flex-col gap-4 relative" ref={dropdownRef}>
              <label htmlFor="licensorName">Select licensor</label>
              <input
                type="text"
                name="licensorName"
                placeholder="Search Licensor"
                onChange={handleSearchLicensors}
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
                value={searchTerm}
                onFocus={() => setIsDropdownOpen(true)}
                required
              />
              {isDropdownOpen && (
                <ul className="absolute top-24 z-10 border border-gray-200 rounded-lg mt-1 max-h-40 overflow-y-auto bg-white w-[358px]">
                  {filteredLicensors.map((licensor) => (
                    <li
                      key={licensor._id}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        handleLicensorChange(
                          licensor.licensorName,
                          licensor._id
                        )
                      }
                    >
                      {licensor.licensorName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="musicId">Music ID</label>
              <input
                type="text"
                name="musicId"
                onChange={handleChange}
                value={musicData.musicId}
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="musicName">Music name</label>
              <input
                type="text"
                placeholder="Music name"
                name="musicName"
                onChange={handleChange}
                value={musicData.musicName}
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="commission">GV Commission (%)</label>
              <input
                type="number"
                placeholder="Commission"
                name="commission"
                onChange={handleChange}
                value={musicData.commission}
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
                required
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
