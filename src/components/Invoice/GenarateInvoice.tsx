import React, { useState } from "react";
import GernateChannelInvoice from "./genaratebuttons/GernateChannelInvoice";
import GenerateMusicInvoice from "./genaratebuttons/GernateMusicInvoice";
import MonthYearSelector from "../../UI/MonthYear";

const GenerateInvoice: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleString("default", { month: "long", year: "numeric" })
  );

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  return (
    <div className="flex flex-col px-8 py-5 bg-gray-100 h-[90vh] gap-5">
      <p className="text-lg font-bold">Generate Invoice</p>
      <div className="px-8 py-8 bg-white rounded-2xl">
        <div className="flex justify-between">
          <div>
            <p className="text-lg font-bold">Genarate Invoice</p>
            <p className="text-sm text-gray-700 mt-2">
              Current Month: <b>{selectedDate}</b>
            </p>
          </div>
          <div className="hidden">
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
