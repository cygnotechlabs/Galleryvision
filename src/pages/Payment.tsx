import React, { useState } from "react";
import INRPaymentList from "../components/Payment/INRPayment";
import USDPaymentlist from "../components/Payment/USDPayment";

const Payment: React.FC = () => {
  const [isClicked, setIsClicked] = useState<string>("INR");

  const handleClick = (button: string) => {
    setIsClicked(button);
  };

  return (
    <div className="flex flex-col m-6 bg-gray-100">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">Payment</p>
          <p className="text-sm font-normal text-gray-400">
            List of Invoices generated in the system
          </p>
        </div>
      </div>
      <div className="flex my-4 py-4 bg-white gap-4 rounded-lg px-4">
        <div
          className={`py-2 w-[50%] text-center font-bold rounded-lg hover:bg-red-100 cursor-pointer ${
            isClicked === "INR"
              ? "text-red-700 border-red-300 border bg-red-100"
              : "border text-black "
          }`}
          onClick={() => handleClick("INR")}
        >
          INR
        </div>
        <div
          className={`py-2 w-[50%] text-center font-bold rounded-lg hover:bg-red-100 cursor-pointer ${
            isClicked === "USD"
              ? "text-red-700 border-red-300 border bg-red-100"
              : "border text-black"
          }`}
          onClick={() => handleClick("USD")}
        >
          USD
        </div>
      </div>
      {isClicked === "INR" ? <INRPaymentList /> : <USDPaymentlist />}
    </div>
  );
};

export default Payment;
