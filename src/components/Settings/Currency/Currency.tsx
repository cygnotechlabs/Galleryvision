//auth
import React, { useState, useEffect } from "react";
import MonthYearSelector from "../../../UI/MonthYear";
import { Arrow, India, USA } from "../../icons/icon";
import axios from "axios";
import API_ENDPOINTS from "../../../config/apiConfig";
import { authInstance } from "../../../hooks/axiosInstances";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  onSubmit: () => void;
};

interface Currency {
  date: string;
  INR: string;
}

const CurrencyComponent = ({ onSubmit }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleString("default", { month: "long", year: "numeric" })
  );
  const [INRValue, setINRValue] = useState<string>("");
  const [data, setData] = useState<Currency>({
    date: "",
    INR: "",
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
      INR: value,
    }));
  };

  useEffect(() => {
    handleDateChange(selectedDate);
  }, []);

  const handleSubmit = async () => {
    if (!data.date || !data.INR) {
      alert("Please provide both the date and INR value.");
      return;
    }

    try {
      console.log("Sending payload:", data);
      const response = await axios.post(
        API_ENDPOINTS.CURRENCY_CONVERSION,
        data,
        { headers: authInstance() }
      );
      console.log("Response:", response.data);
      toast.success(response.data.message);
      onSubmit(); // Call onSubmit to refresh the table
    } catch (error) {
      toast.error("Error adding or updating conversion rate");
      alert("Failed to add conversion rate. Please try again.");
    }
  };

  const handleDateChange = async (newDate: string) => {
    setSelectedDate(newDate);
    console.log(newDate);
    try {
      const response = await axios.get(API_ENDPOINTS.GET_CURRENCY, {
        params: { date: newDate },
        headers: authInstance(),
      });
      setINRValue(response.data.INR);
      console.log("Currency data:", response.data.INR);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pl-11">
      <div className="flex items-center justify-between my-2">
        <Toaster />
        <div>
          <p className="text-lg font-bold">Conversion rate</p>
          <p className="text-sm">Choose the month for the conversion</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="">
          Current Month: <b>{selectedDate}</b>
        </label>
        <div className="hidden flex-col items-start gap-2">
          <MonthYearSelector
            date={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
        <div className="flex gap-3">
          <div className="flex gap-1 items-center">
            <USA />
            <span>USD (Dollars) - 1 Dollar</span>
            <Arrow />
          </div>
          <div className="flex gap-1 items-center border p-2">
            <India />
            <span>INR - Indian rupees</span>
            <input
              type="text"
              className="px-2  h-full border-2"
              value={INRValue}
              onChange={handleINRChange}
            />
            <button
              onClick={handleSubmit}
              className="font-bold bg-black text-white p-2 rounded-lg"
            >
              {INRValue ? "UPDATE" : "ADD"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyComponent;
