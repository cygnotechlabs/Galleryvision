import { useEffect, useState } from "react";
import { Close } from "../icons/icon";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";
import { authInstance } from "../../hooks/axiosInstances";


type Props = {
  channel: Channel;
  onClose: () => void;
  onSave: () => void;
};

type Channel = {
  _id: string;
  channelId: string;
  channelName: string;
  commission: string;
  channelEmail: string;
  licensorName: string;
  licensorId: string;
  channelLogo: string;
};

type Licensor = {
  _id: string;
  licensorName: string;
};

const AssignChannel = ({ channel, onClose, onSave }: Props) => {
  const [licensors, setLicensors] = useState<Licensor[]>([]);
  const [updatedData, setUpdatedData] = useState<Channel>(channel);

  useEffect(() => {
    const getLicensorName = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GET_LICENSOR,{headers:authInstance()});
        setLicensors(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getLicensorName();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        API_ENDPOINTS.ASSIGN_CHANNEL,
        updatedData,
        {
          headers:authInstance()
        }
      );
      setUpdatedData(response.data);
      onClose();
      onSave();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLicensorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLicensor = licensors.find(
      (licensor) => licensor.licensorName === event.target.value
    );
    if (selectedLicensor) {
      setUpdatedData((prevData) => ({
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
      setUpdatedData((prevData) => ({
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
        <p className="text-2xl font-bold">Add Channel</p>
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <div>
            <p>Add Channel logo</p>
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
                <div className="text-xs">Supports, JPG, PNG</div>{" "}
                {updatedData.channelLogo && (
                  <div className="w-16 h-16">
                    <img
                      src={updatedData.channelLogo}
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
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
                value={updatedData.licensorName}
                required
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
                type="text"
                name="channelId"
                placeholder="Channel ID"
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
                value={updatedData.channelId}
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="channelName">Channel name</label>
              <input
                type="text"
                name="channelName"
                placeholder="Channel name"
                onChange={handleUpdate}
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
                value={updatedData.channelName}
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="commission">Commission (%)</label>
              <input
                type="number"
                name="commission"
                placeholder="Commission"
                onChange={handleUpdate}
                className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
                value={updatedData.commission}
                required
              />
            </div>
          </div>
          <div className="flex justify-end pt-5">
            <button
              type="submit"
              className="bg-black text-white font-bold px-2 py-2 rounded-lg"
            >
              Add & Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignChannel;
