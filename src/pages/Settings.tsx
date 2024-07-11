import React, { useState } from "react";
import Currency from "../components/Settings/Currency/Currency";
import Tax from "../components/Settings/Tax/Tax";
import Table from "../components/Settings/Table";

const Settings = () => {
  const [activeComponent, setActiveComponent] = useState("currency");

  const handleComponentClick = (component: React.SetStateAction<string>) => {
    setActiveComponent(component);
  };

  return (
    <div className="bg-gray-100 px-[34px] pt-[20px]">
      <p className="text-xl font-bold">Settings</p>
      <div className="flex w-[95%]  bg-white mt-6 rounded-2xl px-8 py-8">
        <div className="flex flex-col w-60 gap-2 border-r border-gray-300 px-2">
          <div
            className={`flex text-sm font-bold items-center p-6 h-[56px] rounded-2xl cursor-pointer ${
              activeComponent === "currency" ? "bg-red-100" : "hover:bg-red-100"
            }`}
            onClick={() => handleComponentClick("currency")}
          >
            Currency Rate
          </div>

          <div
            onClick={() => handleComponentClick("tax")}
            className={`flex text-sm font-bold items-center p-6 h-[56px] rounded-2xl cursor-pointer ${
              activeComponent === "tax" ? "bg-red-100" : "hover:bg-red-100"
            }`}
          >
            Tax
          </div>
        </div>
        <div>
          {activeComponent === "currency" && <Currency />}
          {activeComponent === "tax" && <Tax />}
        </div>
      </div>
      <Table />
    </div>
  );
};

export default Settings;
