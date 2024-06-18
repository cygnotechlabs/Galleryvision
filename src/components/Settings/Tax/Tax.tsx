import axios from "axios";
import { useEffect, useState } from "react";
import MonthYearSelector from "../../../UI/MonthYear";
import API_ENDPOINTS from "../../../config/apiConfig";
import { authInstance } from "../../../hooks/axiosInstances";
import { Arrow, USA } from "../../icons/icon";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

interface Currency {
  date: string;
  taxPercentage: string;
}

const CurrencyComponent = ({}: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleString("default", { month: "long", year: "numeric" })
  );
  const [INRValue, setINRValue] = useState<string>("");
  const [data, setData] = useState<Currency>({
    date: "",
    taxPercentage: "",
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      date: selectedDate,
    }));
  }, [selectedDate]);

  const handleINRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setINRValue(value);
    setData((prevData) => ({
      ...prevData,
      taxPercentage: value,
    }));
  };

  const handleSubmit = async () => {
    if (!data.date || !data.taxPercentage) {
      alert("Please provide both the date and Percentage value.");
      return;
    }

    try {
      console.log("Sending payload:", data);
      const response = await axios.post(API_ENDPOINTS.ADD_TAX, data, {
        headers: authInstance(),
      });
      // console.log("Response:", response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding conversion rate:", error);
      toast.error("Adding or Updating Tax");
    }
  };

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  return (
    <div className="pl-11">
      <Toaster />
      <div className="flex items-center justify-between my-2">
        <div>
          <p className="text-lg font-bold">US Tax</p>
          <p className="text-sm">Choose the month</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="">Select Month: {selectedDate}</label>
          <MonthYearSelector
            date={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
        <div className="flex gap-3">
          <div className="flex gap-1 items-center">
            <USA />
            <span>US Tax %</span>
            <Arrow />
          </div>
          <div className="flex gap-1 items-center border p-2">
            <input
              type="text"
              className="px-2 w-14 h-full border-2"
              value={INRValue}
              onChange={handleINRChange}
            />
            <button
              onClick={handleSubmit}
              className="font-bold bg-black text-white p-2 rounded-lg"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyComponent;
