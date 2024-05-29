import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Back } from "../icons/icon";
import API_ENDPOINTS from "../../config/apiConfig";
import toast from "react-hot-toast";

type Props = {};
type Licensor = {
  _id: string;
  licensorName: string;
};

const CreateChannel = ({}: Props) => {
  const [licensors, setLicensors] = useState<Licensor[]>([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    channelId: "",
    channelName: "",
    commission: "",
    channelEmail: "",
    licensorName: "",
    channelLogo: "",
  });
  const [formData, setFormData] = useState({
    channelId: "",
    channelName: "",
    commission: "",
    channelEmail: "",
    licensorName: "",
    licensorId: "",
    channelLogo: "",
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

    if (
      name === "commission" &&
      (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100)
    ) {
      setErrors({
        ...errors,
        [name]: "Commission must be a number between 0 and 100.",
      });
      return;
    }

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      if (name === "licensorName") {
        const selectedLicensor = licensors.find(
          (licensor) => licensor.licensorName === value
        );
        updatedFormData.licensorId = selectedLicensor
          ? selectedLicensor._id
          : "";
      }

      // Reset the specific field's error message when user starts correcting input
      setErrors({ ...errors, [name]: "" });

      return updatedFormData;
    });
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.channelId) newErrors.channelId = "Channel ID is required.";
    if (!formData.channelName)
      newErrors.channelName = "Channel name is required.";
    if (!formData.channelEmail)
      newErrors.channelEmail = "Channel email is required.";
    if (!formData.licensorName)
      newErrors.licensorName = "Licensor name is required.";
    if (!formData.commission) {
      newErrors.commission = "Commission is required.";
    } else if (
      isNaN(Number(formData.commission)) ||
      Number(formData.commission) < 0 ||
      Number(formData.commission) > 100
    ) {
      newErrors.commission = "Commission must be a number between 0 and 100.";
    }
    if (!formData.channelLogo)
      newErrors.channelLogo = "Channel logo is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const createChannel = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(API_ENDPOINTS.ADD_CHANNEL, formData);

      // Handle success
      console.log(response.data.message);
      setMessage(response.data.message);

      // Clear form after successful creation
      setFormData({
        channelId: "",
        channelName: "",
        commission: "",
        channelEmail: "",
        licensorName: "",
        licensorId: "",
        channelLogo: "",
      });
      toast.success(response.data.message);

      // Redirect to "/channel" after 1 second
      setTimeout(() => {
        history("/home/channel");
      }, 1000);
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data.message);
        setMessage(error.response.data.message);
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
      setFormData({
        ...formData,
        channelLogo: reader.result ? reader.result.toString() : "",
      });
      setErrors({ ...errors, channelLogo: "" });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100 pl-[34px] pt-[20px] h-[90svh]">
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
                {errors.channelLogo && (
                  <div className="text-red-500 text-xs mt-2">
                    {errors.channelLogo}
                  </div>
                )}
                {formData.channelLogo && (
                  <div className="w-16 h-16">
                    <img
                      src={formData.channelLogo}
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
                value={formData.licensorName}
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
                name="channelId"
                value={formData.channelId}
                onChange={handleChange}
                placeholder="Enter Channel ID"
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg"
                required
              />
              {errors.channelId && (
                <div className="text-red-500 text-xs mt-2">
                  {errors.channelId}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="">Channel name</label>
              <input
                type="text"
                name="channelName"
                value={formData.channelName}
                onChange={handleChange}
                placeholder="Enter Channel name"
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg"
                required
              />
              {errors.channelName && (
                <div className="text-red-500 text-xs mt-2">
                  {errors.channelName}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Commission (%)</label>
              <input
                type="number"
                name="commission"
                value={formData.commission}
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
              onClick={createChannel}
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

export default CreateChannel;
