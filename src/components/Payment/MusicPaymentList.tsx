import MonthYearSelector from "../../UI/MonthYear";

type Props = {};

interface Invoice {
  id: string;
  licensorName: string;
  channel: string;
  partnerRevenue: string;
  commission: string;
  status: string;
}

const invoices: Invoice[] = [
  {
    id: "INV001",
    licensorName: "Asianet",
    channel: "Asianet Movies",
    partnerRevenue: "$1,660,00,000",
    commission: "10%",
    status: "Paid",
  },
  {
    id: "INV002",
    licensorName: "Manorama",
    channel: "Mazhavill Manorama",
    partnerRevenue: "$1,460,00,000",
    commission: "10%",
    status: "Paid",
  },
  {
    id: "INV003",
    licensorName: "Disney",
    channel: "Disney + Hotstar",
    partnerRevenue: "$1,560,00,000",
    commission: "10%",
    status: "Paid",
  },
  {
    id: "INV004",
    licensorName: "Asianet",
    channel: "Asianet Movies",
    partnerRevenue: "$1,460,00,000",
    commission: "10%",
    status: "Paid",
  },
  {
    id: "INV005",
    licensorName: "Asianet",
    channel: "Asianet Movies",
    partnerRevenue: "$1,360,00,000",
    commission: "10%",
    status: "Paid",
  },
  {
    id: "INV006",
    licensorName: "Disney",
    channel: "Disney + Hotstar",
    partnerRevenue: "$1,660,00,000",
    commission: "10%",
    status: "Paid",
  },
  {
    id: "INV007",
    licensorName: "Jio",
    channel: "Jio Cinemas",
    partnerRevenue: "$1,660,00,000",
    commission: "10%",
    status: "Pending",
  },
  {
    id: "INV008",
    licensorName: "Asianet",
    channel: "Asianet Movies",
    partnerRevenue: "$1,760,00,000",
    commission: "10%",
    status: "Paid",
  },
  {
    id: "INV009",
    licensorName: "Asianet",
    channel: "Asianet Movies",
    partnerRevenue: "$1,860,00,000",
    commission: "10%",
    status: "Pending",
  },
  {
    id: "INV010",
    licensorName: "Jio",
    channel: "Jio Cinemas",
    partnerRevenue: "$1,660,00,000",
    commission: "10%",
    status: "Pending",
  },
];

const MusicPaymentList = ({}: Props) => {
  return (
    <div className="flex flex-col gap-5 bg-white py-4 rounded-lg">
      <div className="mx-8 flex items-center justify-between">
        <input
          type="text"
          className="border px-4 py-3 w-[50%] rounded-lg"
          placeholder={`Search`}
        />
        <div className="flex gap-2">
          <MonthYearSelector />
          <button className="px-2 border bg-slate-200 rounded-lg">sort</button>
        </div>
      </div>
      <table className="mx-8 bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left text-sm"></th>
            <th className="px-4 py-2 text-left text-sm">Invoice ID</th>
            <th className="px-4 py-2 text-left text-sm">Licensor name</th>
            <th className="px-4 py-2 text-left text-sm">Channel</th>
            <th className="px-4 py-2 text-left text-sm">Partner revenue</th>
            <th className="px-4 py-2 text-left text-sm">Commission</th>
            <th className="px-4 py-2 text-left text-sm">Status</th>
            <th className="px-4 py-2 text-left text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <InvoiceRow key={invoice.id} invoice={invoice} />
          ))}
        </tbody>
      </table>
      <div className="flex mx-8 justify-between items-center mt-4">
        <button className="p-2  rounded">Previous</button>
        <div className="flex space-x-2">
          <button className="p-2 border rounded">1</button>
          <button className="p-2 border rounded">2</button>
          <button className="p-2 border rounded">3</button>
          <button className="p-2 border rounded">4</button>
        </div>
        <button className="p-2 border rounded">Next</button>
      </div>
    </div>
  );
};

export default MusicPaymentList;

interface InvoiceRowProps {
  invoice: Invoice;
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({ invoice }) => {
  return (
    <tr>
      <td className="px-4 py-1 text-left text-sm">
        <input type="checkbox" />
      </td>
      <td className="px-4 py-1 text-left text-sm">{invoice.id}</td>
      <td className="px-4 py-1 text-left text-sm">{invoice.licensorName}</td>
      <td className="px-4 py-1 text-left text-sm">{invoice.channel}</td>
      <td className="px-4 py-1 text-left text-sm">{invoice.partnerRevenue}</td>
      <td className="px-4 py-1 text-left text-sm">{invoice.commission}</td>
      <td className={`status ${invoice.status.toLowerCase()}`}>
        {invoice.status}
      </td>
      <td className="flex space-x-2">
        <button className="p-2 bg-gray-200 rounded">🔒</button>
        <button className="p-2 bg-gray-200 rounded">👁</button>
        <button className="p-2 bg-gray-200 rounded">✏️</button>
        <button className="p-2 bg-gray-200 rounded">🗑</button>
      </td>
    </tr>
  );
};
