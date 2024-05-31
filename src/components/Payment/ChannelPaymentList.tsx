import axios from "axios";
import { useEffect, useState } from "react";
import MonthYearSelector from "../../UI/MonthYear";
import API_ENDPOINTS from "../../config/apiConfig";
import { Arrow, Back, Eye, Search } from "../icons/icon";
import Modal from "../../layouts/Modal";
import PaymentModal from "../../UI/PaymentModal";
import { Link } from "react-router-dom";

interface Props {}

interface Invoice {
  _id: string;
  partnerName: string;
  licensorId: string;
  invoiceNumber: string;
  licensorName: string;
  accNum: string;
  ifsc: string;
  iban: string;
  currency: string;
  date: string; // Added date property
  ChannelId: string;
  ptRevenue: string;
  tax: string;
  ptAfterTax: string;
  commission: string;
  totalPayout: string;
  conversionRate: string;
  payout: string;
  status: string;
  commissionAmount: string;
}

const ChannelPaymentList: React.FC<Props> = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleString("default", { month: "long", year: "numeric" })
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allChecked, setAllChecked] = useState(false);
  const rowsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, [selectedDate]); // Fetch data whenever selectedDate changes

  const fetchData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_CHANNEL_INVOICE, {
        params: {
          date: selectedDate,
        },
      });
      setInvoices(response.data);
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

  const handleToggleAll = () => {
    setAllChecked((prev) => !prev);
  };

  const filteredInvoices = invoices.filter(
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

  const handleStatusChange = async (invoiceId: string, newStatus: string) => {
    try {
      await axios.put(API_ENDPOINTS.CHANGE_CHANNEL_STATUS(invoiceId), {
        status: newStatus,
      });
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice._id === invoiceId
            ? { ...invoice, status: newStatus }
            : invoice
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
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
        <div className="flex gap-2">
          <MonthYearSelector
            date={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
      </div>
      <table className="mx-8 bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left text-sm">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={handleToggleAll}
                className="bg-red-100"
              />
            </th>
            <th className="px-4 py-2 text-left text-sm">Invoice ID</th>
            <th className="px-4 py-2 text-left text-sm">Licensor Name</th>
            <th className="px-4 py-2 text-left text-sm">Channel</th>
            <th className="px-4 py-2 text-left text-sm">Partner Revenue</th>
            <th className="px-4 py-2 text-left text-sm">Currency</th>
            <th className="px-4 py-2 text-left text-sm">Commission</th>
            <th className="px-4 py-2 text-left text-sm">Status</th>
            <th className="px-4 py-2 text-left text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentInvoices.map((invoice) => (
            <InvoiceRow
              key={invoice._id}
              invoice={invoice}
              allChecked={allChecked}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </tbody>
      </table>
      <div className="flex mx-auto gap-1 items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1 p-2 border rounded-lg font-semibold"
        >
          <Back />
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastInvoice >= invoices.length}
          className="flex items-center gap-1 p-2 border rounded-lg font-semibold"
        >
          Next
          <Arrow />
        </button>
      </div>
    </div>
  );
};

export default ChannelPaymentList;

interface InvoiceRowProps {
  invoice: Invoice;
  allChecked: boolean;
  handleStatusChange: (invoiceId: string, newStatus: string) => Promise<void>;
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({
  invoice,
  allChecked,
  handleStatusChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleConfirmPayment = () => {
    handleStatusChange(invoice._id, "paid");
    setOpen(false);
  };

  return (
    <tr>
      <td className="px-4 py-1 text-left text-sm">
        <input type="checkbox" checked={allChecked} />
      </td>
      <td className="px-4 py-1 text-left text-sm">{invoice.invoiceNumber}</td>
      <td className="px-4 py-1 text-left text-sm">{invoice.licensorName}</td>
      <td className="px-4 py-1 text-left text-sm">{invoice.partnerName}</td>
      <td className="px-4 py-1 text-left text-sm">{invoice.ptAfterTax}</td>
      <td className="px-4 py-1 text-left text-sm">{invoice.currency}</td>
      <td className="px-4 py-1 text-left text-sm">{invoice.commission}</td>
      <td className="px-4 py-1 text-left text-sm">
        <button
          className={
            invoice.status === "paid"
              ? "bg-green-200 py-1 rounded-lg px-2"
              : "bg-red-200 px-2 rounded-lg py-1"
          }
          onClick={() => setOpen(true)}
        >
          {invoice.status}
        </button>
      </td>
      <td className="flex space-x-2">
        <Link to={`/home/view-invoices/${invoice._id}`}>
          <button className="flex gap-2 bg-red-100 hover:bg-gray-400 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg">
            <Eye />
          </button>
        </Link>
      </td>
      <Modal open={open} onClose={() => setOpen(false)}>
        <PaymentModal
          onClose={() => setOpen(false)}
          onConfirm={handleConfirmPayment}
        />
      </Modal>
    </tr>
  );
};
