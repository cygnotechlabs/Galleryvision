import React, { useState, useCallback } from "react";
import Currency from "../components/Settings/Currency/Currency";
import Tax from "../components/Settings/Tax/Tax";
import Table from "../components/Settings/Table";

const Settings = () => {
  const [activeComponent, setActiveComponent] = useState("currency");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleComponentClick = (component: React.SetStateAction<string>) => {
    setActiveComponent(component);
  };

  const handleRefresh = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <div className="bg-gray-100 m-6">
      <p className="text-xl font-bold">Settings</p>
      <div className="flex bg-white mt-6 rounded-2xl px-8 py-8 border">
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
          {activeComponent === "currency" && (
            <Currency onSubmit={handleRefresh} />
          )}
          {activeComponent === "tax" && <Tax onSubmit={handleRefresh} />}
        </div>
      </div>
      <Table key={refreshKey} />
    </div>
  );
};

export default Settings;
