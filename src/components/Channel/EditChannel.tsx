import { useEffect, useState } from "react";
import { Close } from "../icons/icon";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";

type ChannelData = {
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
  channelId?: string;
};

type Licensor = {
  _id: string;
  licensorName: string;
};

const EditChannel = ({ onClose, channelId }: Props) => {
  const [licensors, setLicensors] = useState<Licensor[]>([]);
  const [channelData, setChannelData] = useState<ChannelData>({
    channelId: "",
    channelName: "",
    commission: "",
    channelEmail: "",
    licensorName: "",
    licensorId: "",
    channelLogo: "",
  });
  const [updatedData, setUpdatedData] = useState<Partial<ChannelData>>({});

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

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.VIEW_CHANNEL(channelId));
        setChannelData(response.data);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    if (channelId) {
      fetchChannelData();
    }
  }, [channelId]);

  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await axios.put(API_ENDPOINTS.UPDATE_CHANNEL(channelId), {
        ...channelData,
        ...updatedData,
      });
      onClose();
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
        <p className="text-2xl font-bold">Edit channel details</p>
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
                Drop your logo here, or{" "}
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
        <div className=" py-6 flex justify-between">
          <div className="flex flex-col gap-4">
            <label htmlFor="licensorName">Select licensor</label>
            <select
              name="licensorName"
              onChange={handleLicensorChange}
              className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
              value={updatedData.licensorName || channelData.licensorName}
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
              onChange={handleUpdate}
              placeholder={channelData.channelId}
              className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
              name="channelId"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="channelName">Channel name</label>
            <input
              type="text"
              onChange={handleUpdate}
              placeholder={channelData.channelName}
              className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
              name="channelName"
            />
          </div>
        </div>{" "}
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <label htmlFor="channelEmail">Email</label>
            <input
              type="email"
              onChange={handleUpdate}
              placeholder={channelData.channelEmail}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
              name="channelEmail"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="commission">Commission (%)</label>
            <input
              type="number"
              onChange={handleUpdate}
              placeholder={channelData.commission}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg"
              name="commission"
            />
          </div>{" "}
        </div>
        <div className="flex justify-end pt-5">
          <button
            onClick={(event) => {
              handleSubmit(event);
            }}
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
