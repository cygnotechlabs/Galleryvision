import { useEffect, useState } from "react";
import { Close } from "../icons/icon";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";

type ChannelData = {
  _id: string;
  channelId: string;
  channelName: string;
  commission: string;
  channelEmail: string;
  licensorName: string;
  licensorId: string;
  channelLogo: string;
};

type Props = {
  onClose: () => void;
  onSave: () => void;
  channel: ChannelData;
};

type Licensor = {
  _id: string;
  licensorName: string;
};

const EditChannel = ({ onClose, channel, onSave }: Props) => {
  const [licensors, setLicensors] = useState<Licensor[]>([]);
  const [formData, setFormData] = useState<ChannelData>(channel);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        API_ENDPOINTS.UPDATE_CHANNEL(formData._id),
        formData
      );
      console.log(response.data); // Log the response if needed
      onClose(); // Close the modal after successful submission
      onSave();
    } catch (error) {
      console.error("Error updating channel data:", error);
    }
  };

  const handleLicensorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLicensor = licensors.find(
      (licensor) => licensor.licensorName === event.target.value
    );
    if (selectedLicensor) {
      setFormData((prevData) => ({
        ...prevData,
        licensorName: selectedLicensor.licensorName,
        licensorId: selectedLicensor._id,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        channelLogo: reader.result ? reader.result.toString() : "",
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-8 py-8 w-[823px] h-[612px]">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Edit channel details</p>
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className="mt-5">
        <div>
          <p>Edit channel logo</p>
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
                    name="channelLogo"
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
                    alt="Channel Logo"
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
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
              value={formData.licensorName}
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
            <label htmlFor="channelId">Channel ID</label>
            <input
              id="channelId"
              name="channelId"
              type="text"
              onChange={handleChange}
              placeholder={formData.channelId}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <label htmlFor="channelName">Channel name</label>
            <input
              id="channelName"
              name="channelName"
              type="text"
              onChange={handleChange}
              placeholder={formData.channelName}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="commission">Commission (%)</label>
            <input
              type="number"
              onChange={handleChange}
              placeholder={formData.commission}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
              name="commission"
              id="commission"
            />
          </div>
        </div>
        <div className="flex justify-end pt-5">
          <button
            onClick={handleSubmit}
            className="bg-black text-white font-bold px-2 py-2 rounded-lg"
          >
            Add & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditChannel;
