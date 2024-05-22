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

const CreateChannel = ({}: Props) => {
  const [licensors, setLicensors] = useState<Licensor[]>([]);
  const [message, setMessage] = useState("");
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

      return updatedFormData;
    });
  };

  const createChannel = async () => {
    try {
      // POST request using Axios
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

      // Redirect to "/channel" after 1 second
      setTimeout(() => {
        history("/home/channel");
      }, 1000);
    } catch (error: any) {
      // Handle error
      if (error.response) {
        console.error(error.response.data.message);
        setMessage(error.response.data.message);
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
      setFormData({
        ...formData,
        channelLogo: reader.result ? reader.result.toString() : "",
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
                className="px-3 py-3 w-[50svh] border border-gray-200 rounded-lg "
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
              <label htmlFor="">Channel ID</label>
              <input
                type="text"
                name="channelId"
                value={formData.channelId}
                onChange={handleChange}
                placeholder={`Enter Channel ID `}
                className="px-3 py-3 w-[50svh] border border-gray-200 rounded-lg "
                required
              />
            </div>{" "}
            <div className="flex flex-col gap-4">
              <label htmlFor="">Channel name</label>
              <input
                type="text"
                name="channelName"
                value={formData.channelName}
                onChange={handleChange}
                placeholder={`Enter Channel name `}
                className="px-3 py-3 w-[50svh] border border-gray-200 rounded-lg"
                required
              />
            </div>
          </div>{" "}
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="channelEmail"
                value={formData.channelEmail}
                onChange={handleChange}
                placeholder={`Enter email `}
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg "
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Commission (%)</label>
              <input
                type="number"
                name="commission"
                value={formData.commission}
                onChange={handleChange}
                placeholder={`Enter Commission `}
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg "
                required
              />
            </div>{" "}
          </div>
          <div className="flex justify-end pt-5">
            <button
              className=" bg-black text-white font-bold px-3 py-3 rounded-lg"
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
