import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import MonthYearSelector from "../../UI/MonthYear";
import API_ENDPOINTS from "../../config/apiConfig";
import { Arrow, Back, Download, Eye, Search } from "../icons/icon";

interface Props {}

interface InrPayment {
  _id: string;
  partnerName: string;
  licensorId: string;
  invoiceNumber: string;
  licensorName: string;
  accNum: string;
  ifsc: string;
  iban: string;
  currency: string;
  date: string;
  channelName?: string;
  musicName?: string;
  ptRevenue: string;
  tax: string;
  ptAfterTax: string;
  commission: string;
  totalPayout: string;
  conversionRate: string;
  payout: string;
  status: string;
  commissionAmount: string;
  payMode: string; // Add payMode property
}

const INRPaymentList: React.FC<Props> = () => {
  const [invoices, setInvoices] = useState<InrPayment[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleString("default", { month: "long", year: "numeric" })
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const rowsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_PAYMENT, {
        params: {
          date: selectedDate,
        },
      });
      const inrPayments = response.data.inrPayments.map(
        (payment: InrPayment) => ({
          ...payment,
          payMode: "NEFT", // Initialize payMode to NEFT
        })
      );
      setInvoices(inrPayments);
      setCurrentPage(1);
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

  const filteredInvoices = invoices.filter(
    (payment) =>
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.partnerName.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleStatusChange = async (invoiceId: string, newStatus: string) => {
    try {
      await axios.put(API_ENDPOINTS.CHANGE_CHANNEL_STATUS(invoiceId), {
        status: newStatus,
      });
      setInvoices((prevInvoices) =>
        prevInvoices.map((payment) =>
          payment._id === invoiceId
            ? { ...payment, status: newStatus }
            : payment
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleCheckboxChange = (invoiceId: string) => {
    setSelectedInvoices((prevSelected) =>
      prevSelected.includes(invoiceId)
        ? prevSelected.filter((id) => id !== invoiceId)
        : [...prevSelected, invoiceId]
    );
  };

  const handleExportSelected = () => {
    const selectedData = invoices.filter((invoice) =>
      selectedInvoices.includes(invoice._id)
    );

    const formattedData = selectedData.map((invoice) => ({
      PYMT_PROD_TYPE_CODE: "PAB_VENDOR",
      PYMT_MODE: invoice.payMode, // Use individual payMode
      DEBIT_ACC_NO: "777705031300",
      BNF_NAME: invoice.licensorName,
      BENE_ACC_NO: invoice.accNum,
      BENE_IFSC: invoice.ifsc,
      AMOUNT: invoice.payout,
      PYMT_DATE: new Date().toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Selected Data");

    XLSX.writeFile(wb, "selected_data.xlsx");
  };

  const handlePayModeChange = (invoiceId: string, newPayMode: string) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((payment) =>
        payment._id === invoiceId
          ? { ...payment, payMode: newPayMode }
          : payment
      )
    );
  };

  return (
    <div className="flex flex-col gap-5 bg-white py-4 rounded-lg">
      <div className="mx-8 flex items-center justify-between">
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
        <div className="flex gap-3">
          <button
            onClick={handleExportSelected}
            className="flex items-center gap-3 p-2 border rounded-lg font-semibold hover:bg-gray-200 cursor-pointer"
          >
            <Download />
            Export
          </button>
          <div className="flex gap-2">
            <MonthYearSelector
              date={selectedDate}
              onDateChange={handleDateChange}
            />
          </div>
        </div>
      </div>
      <table className="mx-8 bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left text-sm"></th>
            <th className="px-4 py-2 text-left text-sm">Invoice ID</th>
            <th className="px-4 py-2 text-left text-sm">Licensor Name</th>
            <th className="px-4 py-2 text-left text-sm">Channel/Music</th>
            <th className="px-4 py-2 text-left text-sm">Partner Revenue</th>
            <th className="px-4 py-2 text-left text-sm">Commission</th>
            <th className="px-4 py-2 text-left text-sm">Status</th>
            <th className="px-4 py-2 text-left text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentInvoices.map((payment) => (
            <InvoiceRow
              key={payment._id}
              payment={payment}
              handleStatusChange={handleStatusChange}
              handleCheckboxChange={handleCheckboxChange}
              isChecked={selectedInvoices.includes(payment._id)}
              handlePayModeChange={handlePayModeChange} // Pass handlePayModeChange
            />
          ))}
        </tbody>
      </table>
      <div className="flex mx-auto gap-1 items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1 p-2 border rounded-lg font-semibold hover:bg-gray-200 cursor-pointer"
        >
          <Back />
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastInvoice >= invoices.length}
          className="flex items-center gap-1 p-2 border rounded-lg font-semibold hover:bg-gray-200 cursor-pointer"
        >
          Next
          <Arrow />
        </button>
      </div>
    </div>
  );
};

export default INRPaymentList;

interface InvoiceRowProps {
  payment: InrPayment;
  handleStatusChange: (invoiceId: string, newStatus: string) => Promise<void>;
  handleCheckboxChange: (invoiceId: string) => void;
  isChecked: boolean;
  handlePayModeChange: (invoiceId: string, newPayMode: string) => void; // Add handlePayModeChange prop
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({
  payment,
  handleCheckboxChange,
  isChecked,
  handlePayModeChange,
}) => {
  return (
    <tr>
      <td className="px-4 py-1 text-left text-sm">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleCheckboxChange(payment._id)}
        />
      </td>
      <td className="px-4 py-1 text-left text-sm">{payment.invoiceNumber}</td>
      <td className="px-4 py-1 text-left text-sm">{payment.licensorName}</td>
      <td className="px-4 py-1 text-left text-sm">
        {payment.channelName ? payment.channelName : payment.musicName}
      </td>
      <td className="px-4 py-1 text-left text-sm">{payment.ptAfterTax}</td>
      <td className="px-4 py-1 text-left text-sm">{payment.commission}</td>
      <td className="px-4 py-1 text-left text-sm">
        <button
          className={
            payment.status === "paid"
              ? "bg-green-200 py-1 rounded-lg px-2"
              : "bg-red-200 px-2 rounded-lg py-1"
          }
        >
          {payment.status}
        </button>
      </td>
      <td className="flex space-x-2">
        <select
          name="payMode"
          value={payment.payMode}
          onChange={(e) => handlePayModeChange(payment._id, e.target.value)}
        >
          <option value="NEFT">NEFT</option>
          <option value="IMPS">IMPS</option>
        </select>
        <Link to={`/home/view-invoices/${payment._id}`}>
          <button className="flex gap-2 bg-red-100 hover:bg-gray-400 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg">
            <Eye />
          </button>
        </Link>
      </td>
    </tr>
  );
};
