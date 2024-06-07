import React, { useState } from "react";

import { Email, Invoice } from "../components/icons/icon";
import GenataredChannelInvoice from "../components/Invoice/GenataredChannelInvoice";
import { Link } from "react-router-dom";
import GenataredMusicInvoice from "../components/Invoice/GenaratedInvoiceMusic";
import Modal from "../layouts/Modal";
import { MailModal } from "../components/Invoice/MailModal/MailModal";
import toast, { Toaster } from "react-hot-toast";

const InvoicePage: React.FC = () => {
  const [isClicked, setIsClicked] = useState<string>("channels");
  const [open, setOpen] = useState(false);

  const handleClick = (button: string) => {
    setIsClicked(button);
  };
  const handleToast = () => {
    toast.success("Mail sented successfully");
  };
  return (
    <div className="flex flex-col px-8 py-5 bg-gray-100">
      <Toaster />
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold">Invoices</p>
          <p className="text-sm font-normal text-gray-400">
            List of Invoices generated in the system
          </p>
        </div>
        <div className="flex gap-2">
          <Link to={"/home/generate-invoice"}>
            <div className="flex gap-1 px-4 py-3 rounded-lg bg-black text-white">
              Generate new Invoice
              <Invoice />
            </div>
          </Link>
          <div
            onClick={() => setOpen(true)}
            className="flex gap-1 px-4 py-3 rounded-lg bg-black text-white cursor-pointer"
          >
            Send Mail
            <Email />
          </div>
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
        <Modal onClose={() => setOpen(false)} open={open}>
          <MailModal onClose={() => setOpen(false)} toast={() => handleToast()} />
        </Modal>
      </div>
      {isClicked === "channels" ? (
        <GenataredChannelInvoice />
      ) : (
        <GenataredMusicInvoice />
      )}
    </div>
  );
};

export default InvoicePage;
