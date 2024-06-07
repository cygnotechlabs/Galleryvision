import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Back } from "../icons/icon";
import API_ENDPOINTS from "../../config/apiConfig";
import { authInstance } from "../../hooks/axiosInstances";
import toast, { Toaster } from "react-hot-toast";

type Props = {};
type Licensor = {
  _id: string;
  licensorName: string;
};

const CreateMusic: React.FC<Props> = () => {
  const [licensors, setLicensors] = useState<Licensor[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");
  const [musicData, setMusicData] = useState({
    musicId: "",
    licensorId: "",
    licensorName: "",
    musicName: "",
    commission: "",
    musicLogo: "",
  });

  useEffect(() => {
    const getLicensorName = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GET_LICENSOR, {
          headers: authInstance(),
        });
        setLicensors(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching licensors");
      }
    };

    getLicensorName();
  }, []);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMusicData((prevmusicData) => {
      const updatedmusicData = { ...prevmusicData, [name]: value };

      if (name === "licensorName") {
        const selectedLicensor = licensors.find(
          (licensor) => licensor.licensorName === value
        );
        updatedmusicData.licensorId = selectedLicensor
          ? selectedLicensor._id
          : "";
      }

      return updatedmusicData;
    });

    // Clear error for the field being edited
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!musicData.musicId) newErrors.musicId = "Channel ID is required.";
    if (!musicData.musicName) newErrors.musicName = "Channel name is required.";
    if (!musicData.licensorName)
      newErrors.licensorName = "Licensor name is required.";
    if (!musicData.commission) {
      newErrors.commission = "Commission is required.";
    } else if (
      isNaN(Number(musicData.commission)) ||
      Number(musicData.commission) < 0 ||
      Number(musicData.commission) > 100
    ) {
      newErrors.commission = "Commission must be a number between 0 and 100.";
    }

    setErrors(newErrors);
    console.log(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const createMusic = async () => {
    if (!validateForm()) return;
    console.log(musicData);

    try {
      const response = await axios.post(API_ENDPOINTS.ADD_MUSIC, musicData, {
        headers: authInstance(),
      });

      // Handle success
      console.log(response.data.message);
      setMessage(response.data.message);

      // Clear form after successful creation
      setMusicData({
        musicId: "",
        musicName: "",
        commission: "",
        licensorName: "",
        licensorId: "",
        musicLogo: "",
      });
      toast.success(response.data.message);

      // Redirect to "/channel" after 1 second
      setTimeout(() => {
        navigate("/home/channel");
      }, 1000);
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error(error.message);
      }
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // After reading the file, set the base64 data to state
      setMusicData({
        ...musicData,
        musicLogo: reader.result ? reader.result.toString() : "",
      });
    };

    if (file) {
      // Read the file as data URL (base64)
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100 pl-[34px] pt-[20px] h-[90svh]">
      <Toaster />
      <div className="flex justify-between items-center pl-[34px]">
        <div>
          <Link
            to="/home/unassigned-channels"
            className="flex gap-1 border font-medium border-gray-600 items-center rounded-lg px-3 py-2 text-sm"
          >
            <Back />
            Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-xl ml-[34px] px-8 py-8 mt-[24px] mr-[34px] h-[75svh] pr-9">
        <div className="flex justify-between">
          <p className="text-2xl font-bold">Create Channel</p>
        </div>
        <div className="mt-5">
          <div>
            <p className="text-xl font-bold mb-2">Add channel logo</p>
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
                      name="companyLogo"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="text-xs">Supports, JPG, PNG</div>
                {errors.musicLogo && (
                  <div className="text-red-500 text-xs mt-2">
                    {errors.musicLogo}
                  </div>
                )}
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
          <div className=" py-6 flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="">Select licensor</label>
              <select
                name="licensorName"
                value={musicData.licensorName}
                onChange={handleChange}
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg "
              >
                <option value="">Select Licensor</option>
                {licensors.map((licensor, index) => (
                  <option key={index} value={licensor.licensorName}>
                    {licensor.licensorName}
                  </option>
                ))}
              </select>
              {errors.licensorName && (
                <div className="text-red-500 text-xs mt-2">
                  {errors.licensorName}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Channel ID</label>
              <input
                type="text"
                name="musicId"
                value={musicData.musicId}
                onChange={handleChange}
                placeholder="Enter Channel ID"
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg"
                required
              />
              {errors.musicId && (
                <div className="text-red-500 text-xs mt-2">
                  {errors.musicId}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="">Channel name</label>
              <input
                type="text"
                name="musicName"
                value={musicData.musicName}
                onChange={handleChange}
                placeholder="Enter Channel name"
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg"
                required
              />
              {errors.musicName && (
                <div className="text-red-500 text-xs mt-2">
                  {errors.musicName}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Commission (%)</label>
              <input
                type="number"
                name="commission"
                value={musicData.commission}
                onChange={handleChange}
                placeholder="Enter Commission"
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg"
                min="0"
                max="100"
                required
              />
              {errors.commission && (
                <div className="text-red-500 text-xs mt-2">
                  {errors.commission}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end pt-5">
            <button
              className="bg-black text-white font-bold px-3 py-3 rounded-lg"
              onClick={createMusic}
            >
              Create channel
            </button>
          </div>
        </div>
        {/* message of success or error */}
        <div className="px-3 py-3">{message}</div>
      </div>
    </div>
  );
};

export default CreateMusic;
