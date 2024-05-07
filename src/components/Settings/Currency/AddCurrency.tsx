import { Close } from "../../icons/icon";

type Props = {
  onClose: () => void;
};

const AddCurrency = ({ onClose }: Props) => {
  return (
    <div className="w-[554px] h-[370px] px-8 pt-8 rounded-2xl bg-white">
      <div className="flex justify-between">
        <p className="font-bold text-base">Add Currency</p>
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className="pt-6">
        <div className="flex flex-col gap-5">
          <label className="text-base" htmlFor="">
            Currency type
          </label>
          <input
            className="border rounded py-2 px-1"
            type="text"
            placeholder="Enter type"
          />
        </div>
        <div className="flex flex-col gap-5 pt-5">
          <label className="text-base" htmlFor="">
            Enter currency rate
          </label>
          <input
            className="border rounded py-2 px-1"
            type="number"
            placeholder="Enter rate"
          />
        </div>
        <div className="flex justify-end pt-5">
          <button
            onClick={onClose}
            className=" bg-black text-white font-bold px-2 py-2 rounded-lg"
          >
            Add & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCurrency;
