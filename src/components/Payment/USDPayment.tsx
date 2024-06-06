import axios from "axios";
import { useEffect, useState } from "react";
import MonthYearSelector from "../../UI/MonthYear";
import API_ENDPOINTS from "../../config/apiConfig";
import { Arrow, Back, Eye, Search } from "../icons/icon";
import Modal from "../../layouts/Modal";
import PaymentModal from "../../UI/PaymentModal";
import { Link } from "react-router-dom";
import { authInstance } from "../../hooks/axiosInstances";

interface Props {}

interface UsdPayment {
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
  channelName?: string; // Channel Name is optional
  musicName?: string; // Music Name is optional
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

const USDPaymentList: React.FC<Props> = () => {
  const [invoices, setInvoices] = useState<UsdPayment[]>([]);
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
      const response = await axios.get(API_ENDPOINTS.GET_PAYMENT, {
        params: {
          date: selectedDate,
        },
        headers:authInstance()
      });
      setInvoices(response.data.usdPayments);
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
      await axios.put(API_ENDPOINTS.CHANGE_MUSIC_STATUS(invoiceId), {
        status: newStatus,
        
      },
    {headers:authInstance()});
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

export default USDPaymentList;

interface InvoiceRowProps {
  payment: UsdPayment;
  allChecked: boolean;
  handleStatusChange: (invoiceId: string, newStatus: string) => Promise<void>;
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({
  payment,
  allChecked,
  handleStatusChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleConfirmPayment = () => {
    handleStatusChange(payment._id, "paid");
    setOpen(false);
  };

  return (
    <tr>
      <td className="px-4 py-1 text-left text-sm">
        <input type="checkbox" checked={allChecked} />
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
          onClick={() => setOpen(true)}
        >
          {payment.status}
        </button>
      </td>
      <td className="flex space-x-2">
        <Link to={`/home/view-invoices/${payment._id}`}>
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
