import MonthYearSelector from "../../UI/MonthYear";
import empty from "../../../public/empty.png";
import { Link } from "react-router-dom";
type Props = {};

const GenataredMusicInvoice = ({}: Props) => {
  return (
    <div className="bg-white rounded-lg">
      <div className="m-8 flex items-center justify-between">
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
      <div className="flex gap-2 flex-col m-3">
        <img src={empty} alt="" className="w-[25%] mx-auto" />
        <p className="text-center text-lg text-gray-600">
          Sorry no invoice generated for this month
        </p>
        <Link to={"/generate-invoice"}>
          <div className=" px-3 py-3 w-[12.5%] mx-auto rounded-lg bg-black text-white">
            Generate new Invoice
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GenataredMusicInvoice;
