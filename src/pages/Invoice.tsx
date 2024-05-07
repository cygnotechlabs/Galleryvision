import React, { useState } from "react";
import GernateChannelInvoice from "../components/Invoice/GernateChannelInvoice";
import GernateMusicInvoice from "../components/Invoice/GernateMusicInvoice";

const MonthYearDropdown: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const months: string[] = [
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

  const currentYear: number = new Date().getFullYear();
  const years: number[] = Array.from(
    { length: 1 },
    (_, index) => currentYear + index
  );

  const options: string[] = months.flatMap((month) => {
    return years.map((year) => `${month} ${year}`);
  });

  return (
    <div className="flex flex-col px-8 py-5 bg-gray-100 h-[90vh] gap-5">
      <p className="text-lg font-bold">Generate invoice</p>
      <div className="px-8 py-8 bg-white rounded-2xl w-[1372px]">
        <div className=" flex justify-between">
          <div>
            <p className="text-lg font-bold">Select Month</p>
            <p className="text-sm text-gray-500">
              Select the month for the invoice you want to generate
            </p>
          </div>
          <div className="w-1/4">
            <select
              value={selectedValue}
              onChange={handleSelectChange}
              className="w-full border px-3 py-3 rounded-lg"
            >
              <option value="">Select Month and Year</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <GernateChannelInvoice />
        <GernateMusicInvoice />
      </div>
    </div>
  );
};

export default MonthYearDropdown;
