import axios from "axios";
import API_ENDPOINTS from "../../../config/apiConfig";
import { useState, useEffect } from "react";
import { authInstance } from "../../../hooks/axiosInstances";

type Props = {
  onClose: () => void;
  toast: () => void;
};

const MonthYearSelector = ({
  date,
  onDateChange,
}: {
  date: string;
  onDateChange: (date: string) => void;
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    const [month, year] = date.split(" ");
    setSelectedMonth(month);
    setSelectedYear(year);
  }, [date]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
    onDateChange(`${newMonth} ${selectedYear}`);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);
    onDateChange(`${selectedMonth} ${newYear}`);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(new Array(20), (_, index) =>
    (new Date().getFullYear() - 10 + index).toString()
  );

  return (
    <div className="flex gap-2">
      <select
        value={selectedMonth}
        onChange={handleMonthChange}
        className="px-2 py-1 border rounded"
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select
        value={selectedYear}
        onChange={handleYearChange}
        className="px-2 py-1 border rounded"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export const MailModal = ({ onClose, toast }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleString("default", { month: "long", year: "numeric" })
  );

  const handleConfirm = async () => {
    try {
      console.log("Sending date to backend:", selectedDate);

      const response = await axios.post(
        API_ENDPOINTS.MAIL_INVOICE,
        {
          date: selectedDate,
        },
        {
          headers: authInstance(),
        }
      );

      console.log("Response from backend:", response.data);

      toast();
    } catch (error) {
      console.error("Error sending mail invoices:", error);
      toast();
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
          onClick={async () => {
            await handleConfirm();
            onClose();
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-red-600"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
