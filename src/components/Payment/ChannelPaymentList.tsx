import axios from "axios";
import { useEffect, useState } from "react";
import MonthYearSelector from "../../UI/MonthYear";
import API_ENDPOINTS from "../../config/apiConfig";
import { Arrow, Back, Eye, Search } from "../icons/icon";
import Modal from "../../layouts/Modal";
import PaymentModal from "../../UI/PaymentModal";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [allChecked, setAllChecked] = useState(false);
  const rowsPerPage = 12;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_CHANNEL_INVOICE);
      setInvoices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = () => {
    // Implement date change handling logic here
  };

  const handleToggleAll = () => {
    setAllChecked((prev) => !prev);
  };

  const indexOfLastInvoice = currentPage * rowsPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - rowsPerPage;
  const currentInvoices = invoices.slice(
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
        <input
          type="text"
          className="border px-4 py-3 w-[50%] rounded-lg"
          placeholder={`Search`}

        />
               <i className="m-3" style={{marginLeft:'-500px'}}><Search/></i> 


        <div className="flex gap-2">
          <MonthYearSelector date="" onDateChange={handleDateChange} />
          <button className="px-2 border bg-slate-200 rounded-lg">sort</button>
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
            <th className="px-4 py-2 text-left text-sm">Licensor name</th>
            <th className="px-4 py-2 text-left text-sm">Channel</th>
            <th className="px-4 py-2 text-left text-sm">Partner revenue</th>
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
        <button className="p-2 bg-gray-200 rounded">
          <Eye />
        </button>
      </td>
      <Modal open={open} onClose={() => setOpen(false)}>
        <PaymentModal
          onClose={() => {
            setOpen(false);
            handleStatusChange(invoice._id, "paid");
          }}
        />
      </Modal>
    </tr>
  );
};
