import axios from "axios";
import API_ENDPOINTS from "../../../config/apiConfig";
import MonthYearSelector from "../../../UI/MonthYear";
import { useState } from "react";
// import { authInstance } from "../../../hooks/axiosInstances";

type Props = {
  onClose: () => void;
  toast: () => void;
};

export const MailModal = ({ onClose, toast }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleString("default", { month: "long", year: "numeric" })
  );
  const handleConfim = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.MAIL_INVOICE, {
        // params: {
        //   date: selectedDate,
        // },
        // headers: authInstance(),
      }); // Reset to first page after fetching new data
      response;
      toast
    } catch (error) {
      console.error("Error senting mail invoices:", error);
    }
  };
  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Confirm Mail</h2>
      <p className="text-gray-600 mb-4 px-3 py-3 font-semibold">
        By confirming this, the email will be sent to all paid customers.
      </p>
      <div className="flex gap-2">
        <MonthYearSelector
          date={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleConfim();
            onClose();
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-red-600" // Handle the delete action
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
