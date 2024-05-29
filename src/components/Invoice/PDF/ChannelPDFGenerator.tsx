import { useEffect, useRef, useState } from "react";
import logo from "../../../assets/logo/gv-logo.png";
import { Download } from "../../icons/icon";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../../../config/apiConfig";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type Props = {
  onClose: () => void;
};

type InvoiceData = {
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
};

const ChannelPDFGenerator = ({ onClose }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

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

  const handleDownloadPdf = async () => {
    const element = invoiceRef.current;
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/jpeg", 0.75);
      console.log("Image data:", imgData);

      const pdf = new jsPDF("p", "mm", "a4", true);
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      pdf.save("invoice.pdf");
      onClose();
    }
  };

  return (
    <div className="flex bg-slate-700 w h-screen justify-between p-4">
      <div
        className="flex flex-col w-[60%] m-2 bg-gray-100 px-4 gap-8 py-8"
        ref={invoiceRef}
      >
        <div className="flex justify-between">
          <img src={logo} className="w-1/6" alt="" />
          <div>
            <p className="font-bold">Partner Revenue Report</p>
            <p className="text-sm">{invoiceData?.date}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between px-4 py-3 bg-white rounded-lg">
            <div>
              <p className="text-xs font-bold">Partner name:</p>
              <p className="text-xs font-bold">{invoiceData?.partnerName}</p>
            </div>
            <div>
              <p className="text-xs font-bold">Licensor contact:</p>
              <p className="text-xs font-bold">{invoiceData?.licensorName}</p>
            </div>
          </div>
          <div className="flex-col justify-between px-4 py-3 bg-white rounded-lg">
            <p className="my-1 font-medium">Total Revenue</p>
            <div className="flex flex-col gap-4 border-y py-4 ">
              <div className="flex justify-between">
                <p className="text-xs font-bold">Youtube Channel Revenue</p>
                <p className="text-xs font-bold">{invoiceData?.ptRevenue}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs font-bold">Partner name:</p>
                <p className="text-xs font-bold">{invoiceData?.licensorName}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs font-bold">
                  Youtube Channel Revenue (After tax)
                </p>
                <p className="text-xs font-bold">{invoiceData?.ptAfterTax}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 border-b py-4 ">
              <div className="flex justify-between">
                <p className="text-xs font-bold">Commission %</p>
                <p className="text-xs font-bold">%{invoiceData?.commission}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs font-bold">Commission amount</p>
                <p className="text-xs font-bold">
                  {invoiceData?.commissionAmount}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 py-4 ">
              <div className="flex justify-between">
                <p className="text-xs font-bold">Total Payout (in USD)</p>
                <p className="text-xs font-bold">{invoiceData?.totalPayout}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs font-bold">
                  Conversion rate (in {invoiceData?.currency})
                </p>
                <p className="text-xs font-bold">
                  {invoiceData?.conversionRate}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs font-bold">
                  Payout (Payout in {invoiceData?.currency})
                </p>
                <p className="text-xs font-bold">{invoiceData?.payout}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between px-4 py-3 bg-white rounded-lg">
            <p className="text-sm font-medium">Note :</p>
            <p className="text-xs py-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Asperiores, commodi distinctio. Suscipit, veritatis. Numquam at
              asperiores officia nulla autem cum placeat, tempora, commodi
              dicta, blanditiis a. Qui earum reiciendis recusandae!
            </p>
          </div>
          <div className="flex justify-between items-center px-4 py-3 bg-white rounded-lg">
            <img src={logo} alt="" className="w-[10%]" />
            <div className="flex gap-3">
              <p className="text-sm">+0 (000) 123-4567</p>
              <p className="text-sm">hello@email.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-end">
        <button
          onClick={handleDownloadPdf}
          className="flex bg-black px-3 py-1 text-white items-center gap-1 rounded-lg"
        >
          <Download /> Download
        </button>
        <button
          onClick={onClose}
          className="flex bg-black px-3 py-1 text-white items-center gap-1 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChannelPDFGenerator;
