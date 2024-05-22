import MonthYearSelector from "../../UI/MonthYear";
import empty from "../../../public/empty.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import API_ENDPOINTS from "../../config/apiConfig";
import { Edit, Eye, Trash } from "../icons/icon";
type Props = {
  selectedDate: string;
};

type Invoice = {
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
};

const GenataredChannelInvoice = ({ selectedDate }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [invoiceData, setInvoiceData] = useState<Invoice[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_CHANNEL_INVOICE);
      setInvoiceData(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };
  const handleDateChange = (newDate: string) => {
    // setSelectedDate(newDate);
  };

  return (
    <div className="flex flex-col gap-4 p-8 bg-white rounded-lg">
      <div className="flex items-center justify-between">
        <input
          type="text"
          className="border px-4 py-3 w-[50%] rounded-lg"
          placeholder={`Search`}
        />
        <div className="flex gap-2">
          <MonthYearSelector
            date={selectedDate}
            onDateChange={handleDateChange}
          />
          <button className="px-2 border bg-slate-200 rounded-lg">sort</button>
        </div>
      </div>
      {invoiceData.length === 0 ? ( // Conditionally render based on invoiceData length
        <div className="flex gap-2 flex-col m-3">
          <img src={empty} alt="" className="w-[25%] mx-auto" />
          <p className="text-center text-lg text-gray-600">
            Sorry no invoice generated for this month
          </p>
          <Link to={"/home/generate-invoice"}>
            <div className=" px-3 py-3 w-[12.5%] mx-auto rounded-lg bg-black text-white">
              Generate new Invoice
            </div>
          </Link>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-sm">Invoice ID</th>
              <th className="px-4 py-2 text-left text-sm">Licensor name</th>
              <th className="px-4 py-2 text-left text-sm">Music</th>
              <th className="px-4 py-2 text-left text-sm">Partner revenue</th>
              <th className="px-4 py-2 text-left text-sm">Commission</th>
              <th className="px-4 py-2 text-left text-sm">status</th>
              <th className="px-4 py-2 text-left text-sm"></th>
              <th className="px-4 py-2 text-left text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((invoice, index) => (
              <tr key={index} className="bg-white">
                <td className="px-4 py-1 border-gray-200 text-sm">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-4 py-1 border-gray-200 text-sm">
                  {invoice.licensorName}
                </td>
                <td className="px-4 py-1 border-gray-200 text-sm">
                  {invoice.partnerName}
                </td>
                <td className="px-4 py-1 border-gray-200 text-sm">
                  {invoice.ptRevenue}
                </td>
                <td className="px-4 py-1 border-gray-200 text-sm">
                  {invoice.commission}
                </td>
                <td className="px-4 py-1 border-gray-200 text-sm">
                  {invoice.status}
                </td>
                <td className="px-4 py-1 border-gray-200 text-sm"></td>
                <td className="px-4 py-1 border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Link to={`/home/view-invoice/${invoice._id}`}>
                      <button className="flex gap-2 bg-red-100 hover:bg-gray-400 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg">
                        <Eye />
                      </button>
                    </Link>
                    <button
                      onClick={() => {}}
                      className="flex gap-2 bg-gray-100 hover:bg-gray-400 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg"
                    >
                      <Edit />
                    </button>
                    <button
                      onClick={() => {
                        setOpenDelete(true);
                      }}
                      className="flex gap-2 bg-red-400 hover:bg-gray-400 text-white hover:text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg"
                    >
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GenataredChannelInvoice;
