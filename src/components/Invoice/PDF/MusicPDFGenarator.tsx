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
  invoiceNumber: string;
  licensorName: string;
  accNum: string;
  ifsc: string;
  iban: string;
  currency: string;
  musicId: string;
  ptRevenue: string;
  tax: string;
  ptAfterTax: string;
  commission: string;
  totalPayout: string;
  conversionRate: string;
  payout: string;
  status: string;
  commissionAmount: string;
  musicName: string;
  licensorAddress: string;
  date: string;
};

const MusicPDFGenarator = ({ onClose }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            API_ENDPOINTS.VIEW_MUSIC_INVOICE(id)
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
    console.log("Download PDF button clicked");
    const element = invoiceRef.current;
    console.log("Element to convert:", element);
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 });
      console.log("Canvas generated:", canvas);
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
        className="flex flex-col w-[210mm] h-[297mm] m-2 bg-gray-100 px-4 gap-14 py-8"
        ref={invoiceRef}
      >
        <div className="flex justify-between">
          <img src={logo} className="w-1/6" alt="" />
          <div>
            <p className="font-bold">Partner Revenue Report</p>
            <p className="text-sm">{invoiceData?.date}</p>
          </div>
          <div></div>
        </div>
        <p
          className={`absolute right-[40rem] font-bold rotate-[30deg] w-[240px] pb-3  text-center ${
            invoiceData?.status === "paid" ? "bg-green-400" : "bg-red-400"
          }`}
        >
          {invoiceData?.status}
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between pb-8 px-6 mb-3 py-5 bg-white rounded-lg">
            <div>
              <p className="text-sm font-bold">Partner name:</p>
              <p className="text-sm font-bold">{invoiceData?.partnerName}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Licensor contact:</p>
              <p className="text-sm font-bold">{invoiceData?.licensorName}</p>
            </div>
          </div>
          <div className="flex-col mt-3 justify-between px-6 py-3  pb-8 pt-8  bg-white rounded-lg">
            <p className="my-1 font-medium">Total Revenue</p>
            <div className="flex flex-col gap-4 border-y py-4 mt-4 mb-3">
              <div className="flex justify-between">
                <p className="text-sm font-bold">Music Partner Revenue</p>
                <p className="text-sm font-bold">{invoiceData?.ptRevenue}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-bold">Partner name:</p>
                <p className="text-sm font-bold">{invoiceData?.licensorName}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-bold">
                  Music Partner Revenue (After tax)
                </p>
                <p className="text-sm font-bold">{invoiceData?.ptAfterTax}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 border-b py-4 mb-3 mt-4">
              <div className="flex justify-between">
                <p className="text-sm font-bold">Commission %</p>
                <p className="text-sm font-bold">%{invoiceData?.commission}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-bold">Commission amount</p>
                <p className="text-sm font-bold">
                  {invoiceData?.commissionAmount}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 py-4 mb-3 mt-4">
              <div className="flex justify-between">
                <p className="text-sm font-bold">
                  Total Payout (in {invoiceData?.currency} )
                </p>
                <p className="text-sm font-bold">{invoiceData?.totalPayout}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-bold">
                  Conversion rate (in {invoiceData?.currency})
                </p>
                <p className="text-sm font-bold">
                  {invoiceData?.conversionRate}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-bold">
                  Payout (Payout in {invoiceData?.currency})
                </p>
                <p className="text-sm font-bold">{invoiceData?.payout}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-3 justify-between px-4 py-3 pt-5 pb-6  bg-white rounded-lg">
            <p className="text-sm font-medium">Note :</p>
            <p className="text-sm py-3">
              This is a system-generated report. Any discrepancy in the report
              must be notified in writing within 60 days from the date of the
              statement. Otherwise, this report will be considered correct!
            </p>
          </div>
          <div className="flex justify-between items-center pt-4 pb-5 px-5 mt-28 py-3 bg-white rounded-lg">
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

export default MusicPDFGenarator;
