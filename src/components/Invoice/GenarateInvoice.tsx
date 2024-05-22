import React, { useState } from "react";
import GernateChannelInvoice from "./genaratebuttons/GernateChannelInvoice";
import GenerateMusicInvoice from "./genaratebuttons/GernateMusicInvoice";
import MonthYearSelector from "../../UI/MonthYear";

const GenerateInvoice: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  return (
    <div className="flex flex-col px-8 py-5 bg-gray-100 h-[90vh] gap-5">
      <p className="text-lg font-bold">Generate invoice</p>
      <div className="px-8 py-8 bg-white rounded-2xl">
        <div className="flex justify-between">
          <div>
            <p className="text-lg font-bold">Select Month</p>
            <p className="text-sm text-gray-500">
              Select the month for the invoice you want to generate
            </p>
            <p className="text-sm text-gray-700 mt-2">
              Currently selected date: {selectedDate || "None"}
            </p>
          </div>
          <div>
            <MonthYearSelector
              date={selectedDate}
              onDateChange={handleDateChange}
            />
          </div>
        </div>
        <GernateChannelInvoice selectedDate={selectedDate} />
        <GenerateMusicInvoice selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default GenerateInvoice;
