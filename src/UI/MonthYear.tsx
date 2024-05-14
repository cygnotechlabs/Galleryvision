import React, { useState } from "react";

const MonthYearSelector: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7));

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="month"
        value={date}
        onChange={handleDateChange}
        className="border-2 border-gray-300 p-2 px-5 rounded-lg text-lg"
        min="1900-01"
        max="2100-12"
      />
    </div>
  );
};

export default MonthYearSelector;
