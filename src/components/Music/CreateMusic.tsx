import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Back } from "../icons/icon";
import API_ENDPOINTS from "../../config/apiConfig";

type Props = {};
type Licensor = {
  _id: string;
  licensorName: string;
};

const CreateMusic: React.FC<Props> = () => {
  const [licensors, setLicensors] = useState<Licensor[]>([]);
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [musicData, setMusicData] = useState({
    _id: "",
    licensorId: "",
    musicId: "",
    licensorName: "",
    musicName: "",
    musicEmail: "",
    commission: "",
    musicLogo: "",
  });

  useEffect(() => {
    const getLicensorName = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GET_LICENSOR);
        setLicensors(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getLicensorName();
  }, []);

  const history = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMusicData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      if (name === "licensorName") {
        const selectedLicensor = licensors.find(
          (licensor) => licensor.licensorName === value
        );
        updatedFormData.licensorId = selectedLicensor
          ? selectedLicensor._id
          : "";
      }

      return updatedFormData;
    });

    // Clear error for the field being edited
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: { [key: string]: string } = {};

    if (!musicData.licensorName) {
      newErrors.licensorName = "Licensor is required.";
      valid = false;
    }
    if (!musicData.musicId) {
      newErrors.musicId = "Music ID is required.";
      valid = false;
    }
    if (!musicData.musicName) {
      newErrors.musicName = "Music Name is required.";
      valid = false;
    }
    if (!musicData.commission || isNaN(Number(musicData.commission))) {
      newErrors.commission = "Commission must be a number.";
      valid = false;
    } else if (
      Number(musicData.commission) < 0 ||
      Number(musicData.commission) > 100
    ) {
      newErrors.commission = "Commission must be between 0 and 100.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const createMusic = async () => {
    if (validateForm()) {
      try {
        console.log(musicData);

        const response = await axios.post(API_ENDPOINTS.ADD_MUSIC, musicData);
        setMessage(response.data.message);
        setMusicData({
          _id: "",
          licensorId: "",
          musicId: "",
          licensorName: "",
          musicName: "",
          musicEmail: "",
          commission: "",
          musicLogo: "",
        });
        setTimeout(() => {
          history("/home/music");
        }, 1000);
      } catch (error: any) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          console.error(error.message);
        }
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
      <div className="flex justify-between items-center pl-[34px]">
        <div>
          <Link
            to="/home/unassigned-musics"
            className="flex gap-1 border font-medium border-gray-600 items-center rounded-lg px-3 py-2 text-sm"
          >
            <Back />
            Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-xl ml-[34px] px-8 py-8 mt-[24px] mr-[34px] h-[75svh] pr-9">
        <div className="flex justify-between">
          <p className="text-2xl font-bold">Create Music</p>
        </div>
        <div className="mt-5">
          <div>
            <p className="text-xl font-bold mb-2">Add channel logo</p>
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
                      name="companyLogo"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="text-xs">Supports, JPG, PNG</div>
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
              <label htmlFor="">Select Licensor</label>
              <select
                name="licensorName"
                value={musicData.licensorName}
                onChange={handleChange}
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg"
                required
              >
                <option value="">Select Licensor</option>
                {licensors.map((licensor, index) => (
                  <option key={index} value={licensor.licensorName}>
                    {licensor.licensorName}
                  </option>
                ))}
              </select>
              {errors.licensorName && (
                <div className="text-red-500 text-sm">
                  {errors.licensorName}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Music ID</label>
              <input
                type="text"
                name="musicId"
                value={musicData.musicId}
                onChange={handleChange}
                placeholder={`Enter Music ID`}
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg"
                required
              />
              {errors.musicId && (
                <div className="text-red-500 text-sm">{errors.musicId}</div>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="">Music Name</label>
              <input
                type="text"
                name="musicName"
                value={musicData.musicName}
                onChange={handleChange}
                placeholder={`Enter Music Name`}
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg"
                required
              />
              {errors.musicName && (
                <div className="text-red-500 text-sm">{errors.musicName}</div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Commission (%)</label>
              <input
                type="number"
                name="commission"
                onChange={handleChange}
                value={musicData.commission}
                placeholder={`Enter Commission`}
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg"
                required
              />
              {errors.commission && (
                <div className="text-red-500 text-sm">{errors.commission}</div>
              )}
            </div>
          </div>
          <div className="flex justify-end pt-5">
            <button
              className="bg-black text-white font-bold px-3 py-3 rounded-lg"
              onClick={createMusic}
            >
              Create Music
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
