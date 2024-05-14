import { UpArrow } from "../icons/icon";

type Props = {};

const Cards = ({}: Props) => {
  return (
    <div className="flex gap-10 mx-8">
      <TotalRevenue />
      <TotalAssets />
      <TotalCommission />
      <GenaratedInvoices />
    </div>
  );
};
const card = "flex flex-col gap-4 pl-10 pr-36 py-6 rounded-2xl bg-white";
export default Cards;

function TotalRevenue() {
  return (
    <div>
      <div className={`${card}`}>
        <p className="text-sm font-bold  text-gray-600">Total Revenue</p>
        <p className="text-2xl font-bold">$ 13,000,00</p>
        <div className="text-sm font-bold flex items-center gap-2">
          <div className="bg-green-500 text-white rounded-full p-1">
            <UpArrow />
          </div>
          3,6% this month
        </div>
      </div>
    </div>
  );
}
function TotalAssets() {
  return (
    <div>
      <div className={`${card}`}>
        <p className="text-sm font-bold text-gray-600">Total Assets</p>
        <p className="text-2xl font-bold"> 13,000</p>
        <div className="text-sm font-bold flex items-center gap-2">
          <div className="bg-green-500 text-white rounded-full p-1">
            <UpArrow />
          </div>
          3,6% this month
        </div>
      </div>
    </div>
  );
}
function TotalCommission() {
  return (
    <div>
      <div className={`${card}`}>
        <p className="text-sm font-bold text-gray-600">Total commission</p>
        <p className="text-2xl font-bold">$ 24,008</p>
        <div className="text-sm font-bold flex items-center gap-2">
          <div className="bg-green-500 text-white rounded-full p-1">
            <UpArrow />
          </div>
          3,6% this month
        </div>
      </div>
    </div>
  );
}
function GenaratedInvoices() {
  return (
    <div>
      <div className={`${card}`}>
        <p className="text-sm font-bold text-gray-600">Generated invoices</p>
        <p className="text-2xl font-bold">10000</p>
        <div className="text-sm font-bold flex items-center gap-2">
          <div className="bg-green-500 text-white rounded-full p-1">
            <UpArrow />
          </div>
          3,6% this month
        </div>
      </div>
    </div>
  );
}
