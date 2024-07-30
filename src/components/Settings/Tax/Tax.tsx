//auth
import React, { useState, useEffect } from "react";
import MonthYearSelector from "../../../UI/MonthYear";
import { Arrow, USA } from "../../icons/icon";
import axios from "axios";
import API_ENDPOINTS from "../../../config/apiConfig";
import { authInstance } from "../../../hooks/axiosInstances";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  onSubmit: () => void;
};

interface Tax {
  date: string;
  taxPercentage: string;
}

const TaxComponent = ({ onSubmit }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleString("default", { month: "long", year: "numeric" })
  );
  const [taxPercentage, setTaxPercentage] = useState<string>("");
  const [data, setData] = useState<Tax>({
    date: "",
    taxPercentage: "",
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      date: selectedDate,
    }));
  }, [selectedDate]);

  const handleTaxPercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setTaxPercentage(value);
    setData((prevData) => ({
      ...prevData,
      taxPercentage: value,
    }));
  };

  const handleSubmit = async () => {
    if (!data.date || !data.taxPercentage || data.taxPercentage === "none") {
      alert("Please provide both the date and a valid tax percentage value.");
      return;
    }

    try {
      console.log("Sending payload:", data);
      const response = await axios.post(API_ENDPOINTS.ADD_TAX, data, {
        headers: authInstance(),
      });
      toast.success(response.data.message);
      onSubmit(); // Call onSubmit to refresh the table
    } catch (error) {
      console.error("Error adding or updating tax percentage:", error);
      toast.error("Error adding or updating tax percentage");
    }
  };

  const handleDateChange = async (newDate: string) => {
    setSelectedDate(newDate);
    console.log(newDate);
    try {
      const response = await axios.get(API_ENDPOINTS.GET_TAX, {
        params: { date: newDate },
        headers: authInstance()
      });
      setTaxPercentage(response.data.taxPercentage);
      console.log("Currency data:", response.data, taxPercentage);
    } catch (error) {
      console.error(error);
      setTaxPercentage("");
    }
  };

  useEffect(() => {
    handleDateChange(selectedDate);
  }, []);

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
            <span>US Tax %</span>
            <Arrow />
          </div>
          <div className="flex gap-1 items-center border p-2">
            <input
              type="text"
              className="px-2 h-full border-2"
              value={taxPercentage}
              onChange={handleTaxPercentageChange}
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

export default TaxComponent;
