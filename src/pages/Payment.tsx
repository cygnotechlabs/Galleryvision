import React, { useState } from "react";
import ChannelPaymentList from "../components/Payment/ChannelPaymentList";
import MusicPaymentList from "../components/Payment/MusicPaymentList";

const Payment: React.FC = () => {
  const [isClicked, setIsClicked] = useState<string>("channels");

  const handleClick = (button: string) => {
    setIsClicked(button);
  };

  return (
    <div className="flex flex-col px-8 py-5 bg-gray-100">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold">Payment</p>
          <p className="text-sm font-normal text-gray-400">
            List of Invoices generated in the system
          </p>
        </div>
      </div>
      <div className="flex my-4 py-4 bg-white gap-4 rounded-lg px-4">
        <div
          className={`py-2 w-[50%] text-center font-bold rounded-lg hover:bg-red-100 cursor-pointer ${
            isClicked === "channels"
              ? "text-red-700 border-red-300 border bg-red-100"
              : "border text-black "
          }`}
          onClick={() => handleClick("channels")}
        >
          Channels
        </div>
        <div
          className={`py-2 w-[50%] text-center font-bold rounded-lg hover:bg-red-100 cursor-pointer ${
            isClicked === "music"
              ? "text-red-700 border-red-300 border bg-red-100"
              : "border text-black"
          }`}
          onClick={() => handleClick("music")}
        >
          Music Partner
        </div>
      </div>
      {isClicked === "channels" ? <ChannelPaymentList /> : <MusicPaymentList />}
    </div>
  );
};

export default Payment;
