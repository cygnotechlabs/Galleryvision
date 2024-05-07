import React, { useState } from "react";
import logo from "../../assets/logo/invoice.png";
import { Invoice } from "../../components/icons/icon";
import ProgressBar from "../../UI/ProgressBar";

type Props = {};

const GenerateMusicInvoice: React.FC<Props> = () => {
  const [isRunning, setIsRunning] = useState(false);

  const startProgress = () => {
    setIsRunning(true);
  };

  return (
    <div className="mt-5 bg-green-100 border-2 border-dashed rounded-2xl border-gray-400">
      <div className="flex justify-between gap-4 px-6 py-5 ">
        <div className="flex gap-4">
          <img className="w-12 rounded-full" src={logo} alt="" />
          <div>
            <p className="text-lg font-bold">Generate Music Invoices</p>
            <p className="text-gray-500 text-sm">
              Automated Invoicing for Music
            </p>
          </div>
        </div>
        <button
          className="flex items-center px-4 gap-2 text-base font-bold bg-black text-white rounded-lg"
          onClick={startProgress}
          disabled={isRunning}
        >
          <Invoice /> Generate invoice
        </button>
      </div>
      <div className="px-6">{isRunning && <ProgressBar />}</div>
    </div>
  );
};

export default GenerateMusicInvoice;
