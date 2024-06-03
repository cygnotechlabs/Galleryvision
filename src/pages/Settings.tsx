import React, { useState } from "react";
import Currency from "../components/Settings/Currency/Currency";

const Settings = () => {
  const [activeComponent, setActiveComponent] = useState("currency");

  const handleComponentClick = (component: React.SetStateAction<string>) => {
    setActiveComponent(component);
  };

  return (
    <div className="bg-gray-100 pl-[34px] pt-[20px]">
      <p className="text-2xl font-bold">Settings</p>
      <div className="flex w-[70%]  bg-white mt-6 rounded-2xl px-8 py-8">
        <div className="flex flex-col gap-2 border-r border-gray-300 px-2">
          <div
            className={`flex text-sm font-bold items-center p-6 w-[330px] h-[56px] rounded-2xl cursor-pointer ${
              activeComponent === "currency" ? "bg-red-100" : "hover:bg-red-100"
            }`}
            onClick={() => handleComponentClick("currency")}
          >
            Currency Rate
          </div>
        </div>
        <div>
          {activeComponent === "currency" && <Currency />}
          {/* {activeComponent === "tax" && <Tax />} */}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Settings;
