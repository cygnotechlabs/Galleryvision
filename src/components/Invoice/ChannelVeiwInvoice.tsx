// ChannelViewInvoice.tsx
import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Back, Download, Emailsm } from "../icons/icon";
import API_ENDPOINTS from "../../config/apiConfig";
import Modal from "../../layouts/Modal";
import ChannelPDFGenerator from "./PDF/ChannelPDFGenerator";
import PrintChannel from "./Print/PrintChannel";

type Props = {};

export type InvoiceData = {
  _id: string;
  partnerName: string;
  licensorId: string;
  licensorName: string;
  accNum: string;
  ifsc: string;
  iban: string;
  currency: string;
  date: string;
  channelId: string;
  channelName: string;
  invoiceNumber: string;
  ptRevenue: string;
  tax: string;
  ptAfterTax: string;
  commission: string;
  totalPayout: string;
  conversionRate: string;
  payout: string;
  status: string;
  commissionAmount: string;
  licensorAddress: string;
  channelEmail: string;
  licensorEmail: string;
};

const ChannelViewInvoice: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const subject = `Invoice for ${invoiceData?.date} - ${invoiceData?.channelName}`;
  const body = `Dear ${invoiceData?.licensorName},\n
  Please find attached the invoice for the month of ${invoiceData?.date} for the channel ${invoiceData?.channelName}.\n
  If you have any questions or require further clarification regarding the invoice, please do not hesitate to reach out. We are here to assist you and ensure all your queries are addressed promptly.\n
  Thank you for your continued partnership and prompt payment. We look forward to continuing to work with you.\n
  Best regards,\n
  Gallery Vision`;
  const encodedBody = encodeURIComponent(body);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            API_ENDPOINTS.VIEW_CHANNEL_INVOICE(id)
          );
          setInvoiceData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to="/home/invoice">
        <div className="flex gap-1 justify-center items-center border-2 px-1 py-2 rounded-lg text-sm font-medium w-[5%]  hover:bg-gray-200 cursor-pointer">
          <Back />
          Back
        </div>
      </Link>

      <div
        className="flex flex-col gap-6 bg-white w-[75%] p-8"
        ref={invoiceRef}
      >
        <p className="text-lg font-bold">Preview</p>
        <div className="flex flex-col gap-6 w-[94%] border-2 p-8 mx-8">
          <p className="text-lg font-bold">{invoiceData.invoiceNumber}</p>
          <div className="flex border-b-2 pb-6">
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Licensor</p>
              <p className="font-bold text-sm">{invoiceData.licensorName}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Partner Name</p>
              <p className="font-bold text-sm">{invoiceData.partnerName}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Preferred currency</p>
              <p className="font-bold text-sm">{invoiceData.currency}</p>
            </div>
          </div>
          <div className="flex border-b-2 pb-6">
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Account Number</p>
              <p className="font-bold text-sm">{invoiceData.accNum}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">IFSC</p>
              <p className="font-bold text-sm">{invoiceData.ifsc}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">IBAN</p>
              <p className="font-bold text-sm">{invoiceData.iban}</p>
            </div>
          </div>
          <div className="flex border-b-2 pb-6">
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Channel ID</p>
              <p className="font-bold text-sm">{invoiceData.channelId}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Partner Revenue</p>
              <p className="font-bold text-sm">{invoiceData.ptRevenue}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Tax</p>
              <p className="font-bold text-sm">{invoiceData.tax}</p>
            </div>
          </div>
          <div className="flex border-b-2 pb-6">
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Partner Revenue After Tax</p>
              <p className="font-bold text-sm">{invoiceData.ptAfterTax}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Commission(%)</p>
              <p className="font-bold text-sm">{invoiceData.commission}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Total Payout</p>
              <p className="font-bold text-sm">{invoiceData.totalPayout}</p>
            </div>
          </div>
          <div className="flex border-b-2 pb-6">
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Conversion Rate</p>
              <p className="font-bold text-sm">{invoiceData.conversionRate}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Payout</p>
              <p className="font-bold text-sm">{invoiceData.payout}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Status</p>
              <p className="font-bold text-sm">{invoiceData.status}</p>
            </div>
          </div>
          <div className="flex border-b-2 justify-between pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold">Payment to</p>
              <div className="flex gap-2">
                <div className="flex-col">
                  <p className="text-sm font-bold">
                    Channel Name: {invoiceData.licensorName}
                  </p>
                  <p className="text-sm">
                    Licensor Name: {invoiceData.licensorName}
                  </p>
                  <p className="text-sm">
                    Licensor Address: {invoiceData.licensorAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-b-2 pb-6">
            <div className="flex justify-between gap-2">
              <p className="text-sm">Total Payout(USD)</p>
              <p className="font-bold text-sm">${invoiceData.totalPayout}</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-sm">Commission {invoiceData.commission}%</p>
              <p className="font-bold text-sm">
                ${invoiceData.commissionAmount}
              </p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-sm">Total Amount({invoiceData.currency})</p>
              <p className="font-bold text-sm">
                {invoiceData.currency == "USD" ? "$ " : "₹ "}
                {invoiceData.payout}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mx-8">
          <PrintChannel invoiceData={invoiceData} />
          <a
            href={`mailto:${
              invoiceData.licensorEmail
            }?subject=${encodeURIComponent(subject)}&body=${encodedBody}`}
            className="flex items-center gap-1 rounded-lg border border-red-500 text-sm font-bold px-3 py-2 bg-red-100"
          >
            <Emailsm /> Email
          </a>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center text-white gap-1 rounded-lg border border-black text-sm font-bold px-3 py-2 bg-black"
          >
            <Download /> Download Pdf
          </button>
        </div>
      </div>
      <Modal onClose={() => setOpen(false)} open={open}>
        <ChannelPDFGenerator onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default ChannelViewInvoice;