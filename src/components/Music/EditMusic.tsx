import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Close } from "../icons/icon";
import API_ENDPOINTS from "../../config/apiConfig";
import { authInstance } from "../../hooks/axiosInstances";

type Music = {
  _id: string;
  licensorId: string;
  musicId: string;
  licensorName: string;
  musicName: string;
  musicEmail: string;
  commission: string;
  musicLogo: string;
};

type Props = {
  onClose: () => void;
  music: Music;
};

type Licensor = {
  _id: string;
  licensorName: string;
};

const EditMusic = ({ onClose, music }: Props) => {
  const [licensors, setLicensors] = useState<Licensor[]>([]);
  const [formData, setFormData] = useState<Music>(music);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Update formData with the new value
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        API_ENDPOINTS.UPDATE_MUSIC(formData._id), // Ensure the API endpoint is correct
        formData,
        { headers: authInstance() }
      );
      console.log(response.data); // Log the response if needed
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error updating music data:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        musicLogo: reader.result ? reader.result.toString() : "",
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLicensorChange = (licensorName: string, licensorId: string) => {
    setFormData((prevData) => ({
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
              <div>Logo</div>
              <div className="text-sm font-medium">
                Select your logo here,{" "}
                <label className="cursor-pointer text-blue-500">
                  browse
                  <input
                    type="file"
                    accept="image/jpg, image/png"
                    name="musicLogo" // Correct the name attribute
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="text-xs">Supports, JPG, PNG</div>{" "}
              {formData.musicLogo && (
                <div className="w-16 h-16">
                  <img
                    src={formData.musicLogo}
                    alt="Company Logo"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" py-6 flex justify-between">
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
            />
            {isDropdownOpen && (
              <ul className="absolute top-24 z-10 border border-gray-200 rounded-lg mt-1 max-h-40 overflow-y-auto bg-white w-[358px]">
                {filteredLicensors.map((licensor) => (
                  <li
                    key={licensor._id}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      handleLicensorChange(licensor.licensorName, licensor._id)
                    }
                  >
                    {licensor.licensorName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Music ID */}
          <div className="flex flex-col gap-4">
            <label htmlFor="musicId">Music ID</label>
            <input
              type="text"
              id="musicId" // Correct the id attribute
              name="musicId" // Correct the name attribute
              onChange={handleChange}
              placeholder={music.musicId}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
              required
            />
          </div>
          {/* Music name */}
        </div>
        {/* Email and Commission */}
        <div className="flex justify-between">
          {/* Email */}
          <div className="flex flex-col gap-4">
            <label htmlFor="musicName">Music name</label>
            <input
              type="text"
              id="musicName" // Correct the id attribute
              name="musicName" // Correct the name attribute
              onChange={handleChange}
              placeholder={`${music.musicName}`}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
              required
            />
          </div>
          {/* Commission */}
          <div className="flex flex-col gap-4">
            <label htmlFor="commission">GV Commission (%)</label>
            <input
              type="number"
              id="commission" // Correct the id attribute
              name="commission" // Correct the name attribute
              onChange={handleChange}
              placeholder={formData.commission}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
              required
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
