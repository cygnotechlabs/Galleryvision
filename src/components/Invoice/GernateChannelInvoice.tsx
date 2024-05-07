import logo from "../../assets/logo/invoice.png";
import { Invoice } from "../../components/icons/icon";

type Props = {};

const GernateChannelInvoice = ({}: Props) => {
  return (
    <div className="mt-5">
      <div className="flex justify-between bg-red-100 gap-4 px-6 py-5 rounded-2xl border-2 border-dashed border-gray-400">
        <div className="flex gap-4">
          <img className="w-12 rounded-full" src={logo} alt="" />
          <div>
            <p className="text-lg font-bold">Generate Channel Invoices</p>
            <p className="text-gray-500 text-sm">
              Automated Invoicing for Channels{" "}
            </p>
          </div>
        </div>

        <button className="flex items-center px-4 gap-2 text-base font-bold bg-black text-white rounded-lg">
          <Invoice />
          Generate invoice
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default GernateChannelInvoice;
