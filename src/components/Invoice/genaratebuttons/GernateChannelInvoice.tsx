import axios from "axios";
import logo from "../../../assets/logo/invoice.png";
import { Invoice } from "../../icons/icon";
import API_ENDPOINTS from "../../../config/apiConfig";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  selectedDate: string;
};

const GenerateChannelInvoice = ({ selectedDate }: Props) => {
  const [buttonText, setButtonText] = useState("Generate invoice");
  const notify = () => toast("Genarated Success");

  const generateChannelInvoice = async () => {
    setButtonText("Generating...");
    try {
      await axios.post(API_ENDPOINTS.GENERATE_CHANNEL_INVOICE, {
        date: selectedDate,
      });
      // Simulate a delay for demonstration purposes
      setTimeout(() => {
        setButtonText("Generate invoice");
      }, 2000); // Change text back after 2 seconds
    } catch (error) {
      console.error("Error generating Channel invoice:", error);
      setButtonText("Generate invoice");
    } finally {
      notify();
    }
  };

  return (
    <div className="mt-5 bg-red-100 border-2 border-dashed rounded-2xl border-gray-400">
      <div className="flex justify-between gap-4 px-6 py-5">
        <div className="flex gap-4">
          <img className="w-12 rounded-full" src={logo} alt="Invoice Logo" />
          <div>
            <p className="text-lg font-bold">Generate Channel Invoices</p>
            <p className="text-gray-500 text-sm">
              Automated Invoicing for Channel
            </p>
          </div>
        </div>
        <button
          className="flex items-center px-4 gap-2 text-base font-bold bg-black text-white rounded-lg"
          onClick={generateChannelInvoice}
        >
          <Invoice /> {buttonText}
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default GenerateChannelInvoice;
