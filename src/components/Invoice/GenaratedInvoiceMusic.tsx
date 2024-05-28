import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import empty from "../../../public/empty.png";
import MonthYearSelector from "../../UI/MonthYear";
import API_ENDPOINTS from "../../config/apiConfig";
import { Eye, Search } from "../icons/icon";

type Props = {};

type Invoice = {
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
};

const GenataredMusicInvoice = ({}: Props) => {
  const [invoiceData, setInvoiceData] = useState<Invoice[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedDate]); // Fetch data whenever the page or selectedDate changes

  const fetchData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_MUSIC_INVOICE, {
        params: {
          page: currentPage,
          date: selectedDate,
          // You can add other parameters for filtering, sorting, etc.
        },
      });
      setInvoiceData(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  const indexOfLastInvoice = currentPage * rowsPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - rowsPerPage;
  const currentInvoices = invoiceData.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div className="flex flex-col gap-4 p-8 bg-white rounded-lg">
      <div className="flex items-center justify-between">
        <input
          type="text"
          className="border px-4 py-3 w-[50%] rounded-lg"
          placeholder={`Search`}
        />
        <i className="m-3" style={{ marginLeft: "-500px" }}>
          <Search />
        </i>

        <div className="flex gap-2">
          <MonthYearSelector
            date={selectedDate}
            onDateChange={handleDateChange}
          />
          <button className="px-2 border bg-slate-200 rounded-lg">sort</button>
        </div>
      </div>
      {invoiceData.length === 0 ? (
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
        <>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-sm">Invoice ID</th>
                <th className="px-4 py-2 text-left text-sm">Licensor name</th>
                <th className="px-4 py-2 text-left text-sm">Music</th>
                <th className="px-4 py-2 text-left text-sm">Partner revenue</th>
                <th className="px-4 py-2 text-left text-sm">Commission</th>
                <th className="px-4 py-2 text-left text-sm">Status</th>
                <th className="px-4 py-2 text-left text-sm"></th>
                <th className="px-4 py-2 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((invoice, index) => (
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pt-4 flex justify-center">
            <nav className="flex items-center gap-96" aria-label="Pagination">
              <div>
                Showing {indexOfFirstInvoice + 1} to{" "}
                {Math.min(indexOfLastInvoice, invoiceData.length)} of{" "}
                {invoiceData.length} entries
              </div>
              <ul className="flex list-style-none">
                <li>
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-400 bg-gray-100 rounded-lg mr-1"
                  >
                    Previous
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleNextPage}
                    disabled={indexOfLastInvoice >= invoiceData.length}
                    className="px-3 py-1 border border-gray-400 bg-gray-100 rounded-lg"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default GenataredMusicInvoice;
