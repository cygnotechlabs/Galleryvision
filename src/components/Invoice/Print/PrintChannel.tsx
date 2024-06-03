import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { InvoiceData } from '../ChannelVeiwInvoice'; 
import { Invoice } from '../../icons/icon';
import logo from "../../../assets/logo/gv-logo.png";

type PrintProps = {
  invoiceData: InvoiceData;
};

const PrintChannel: React.FC<PrintProps> = ({ invoiceData }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <>
  <style>
        {`
          .print-section {
            display: none;
          }
          
          @media print {
            .print-section {
              display: block;
            }
          }
        `}
      </style>
      <button
        className="flex items-center gap-1 rounded-lg border border-black text-sm font-bold px-3 py-2 bg-gray-100"
        onClick={handlePrint}
      >
        <Invoice />
        Print
      </button>
      <div
        className="print-section flex flex-col w-[210mm] h-[297mm] m-2 bg-gray-100 px-4 gap-14 py-8"
        ref={printRef}
      >
        <div className="flex justify-between">
          <img src={logo} className="w-1/6" alt="" />
          <div>
            <p className="font-bold">Partner Revenue Report</p>
            <p className="text-sm">{invoiceData?.date}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-5">
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
          <div className="flex-col mt-3 justify-between px-6 py-3 pb-8 pt-8 bg-white rounded-lg">
            <p className="my-1 font-medium mb-3">Total Revenue</p>
            <div className="flex flex-col gap-4 border-y py-4 mt-4 mb-3">
              <div className="flex justify-between">
                <p className="text-sm font-bold">Youtube Channel Revenue</p>
                <p className="text-sm font-bold">{invoiceData?.ptRevenue}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-bold">Partner name:</p>
                <p className="text-sm font-bold">{invoiceData?.licensorName}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-bold">
                  Youtube Channel Revenue (After tax)
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
                <p className="text-sm font-bold">Total Payout (in USD)</p>
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
          <div className="flex flex-col mt-3 justify-between px-4 py-3 pt-5 pb-6 bg-white rounded-lg">
            <p className="text-sm font-medium">Note :</p>
            <p className="text-sm py-3">
            This is a system-generated report. Any discrepancy in the report must be notified in writing within 60 days from the date of the statement. Otherwise, this report will be considered correct
            </p>
          </div>
          <div className="flex justify-between items-center pt-4 pb-5 px-5 mt-36 py-3 bg-white rounded-lg">
            <img src={logo} alt="" className="w-[10%]" />
            <div className="flex gap-3">
              <p className="text-sm">+0 (000) 123-4567</p>
              <p className="text-sm">hello@email.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintChannel;
