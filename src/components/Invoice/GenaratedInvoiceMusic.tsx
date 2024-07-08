import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import empty from "../../../public/empty.png";
import MonthYearSelector from "../../UI/MonthYear";
import API_ENDPOINTS from "../../config/apiConfig";
import { Eye, Search } from "../icons/icon";
import { authInstance } from "../../hooks/axiosInstances";

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
  date: string;
};

const GenataredMusicInvoice = ({}: Props) => {
  const [invoiceData, setInvoiceData] = useState<Invoice[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleString("default", { month: "long", year: "numeric" })
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, [selectedDate]); // Fetch data whenever selectedDate changes

  const fetchData = async () => {
    try {
        const response = await axios.get(
            API_ENDPOINTS.GET_MUSIC_INVOICE,
            {
                params: {
                    date: selectedDate,
                },
                headers: authInstance(),
            }
        );
        setInvoiceData(response.data);
        setCurrentPage(1); // Reset to first page after fetching new data
    } catch (error) {
        console.error("Error fetching invoices:", error);
    }
};

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  // Filter invoices based on selected date and search term
  const filteredInvoices = invoiceData.filter(
    (invoice) =>
      invoice.date === selectedDate &&
      (invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.partnerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastInvoice = currentPage * rowsPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - rowsPerPage;
  const currentInvoices = filteredInvoices.slice(
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
        <div className="relative w-[50%]">
          <input
            type="text"
            className="border px-4 py-3 w-full rounded-lg"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <i className="absolute right-3 top-3">
            <Search />
          </i>
        </div>
        <div className="flex gap-2">
          <MonthYearSelector
            date={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
      </div>
      {filteredInvoices.length === 0 ? (
        <div className="flex gap-2 flex-col m-3">
          <img src={empty} alt="" className="w-[25%] mx-auto" />
          <p className="text-center text-lg text-gray-600">
            Sorry no invoice generated for this month
          </p>
          <Link to={"/home/generate-invoice"}>
            <div className=" px-3 py-3 w-[12.5%] mx-auto rounded-lg bg-black text-white">
              Generate Invoice
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
                <th className="px-4 py-2 text-left text-sm">GV Commission</th>
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
                {Math.min(indexOfLastInvoice, filteredInvoices.length)} of{" "}
                {filteredInvoices.length} entries
              </div>
              <ul className="flex list-style-none">
                <li>
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-400 bg-gray-100 rounded-lg mr-1  hover:bg-gray-200 cursor-pointer"
                  >
                    Previous
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleNextPage}
                    disabled={indexOfLastInvoice >= filteredInvoices.length}
                    className="px-3 py-1 border border-gray-400 bg-gray-100 rounded-lg  hover:bg-gray-200 cursor-pointer"
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
