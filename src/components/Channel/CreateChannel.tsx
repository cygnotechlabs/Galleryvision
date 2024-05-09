import { Link } from "react-router-dom";

type Props = {};

const CreateChannel = ({}: Props) => {
  return (
    <div className="bg-gray-100 pl-[34px] pt-[20px] h-[90svh]">
      <div className="flex justify-between items-center pl-[34px]">
        <div>
          <Link
            to="/unassigned-channels"
            className="flex gap-1 border font-medium border-gray-600 items-center rounded-lg px-3 py-2 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-xl ml-[34px] px-8 py-8 mt-[24px] mr-[34px] h-[75svh] pr-9">
        <div className="flex justify-between">
          <p className="text-2xl font-bold">Create Channel</p>
        </div>
        <div className="mt-5">
          <div>
            <p className="text-xl font-bold mb-2">Add channel logo</p>
            <div className="bg-slate-100 px-4 py-6 w-[723px] h-[184px] rounded-2xl">
              <div className="flex flex-col gap-3 items-center justify-center bg-white w[100%] h-[100%] border-2 border-green-200 border-dashed rounded-2xl">
                <div>logo</div>
                <div className="text-sm font-medium">
                  Drop your logo here, or browse
                </div>
                <div className="text-xs">Supports, JPG, PNG</div>
              </div>
            </div>
          </div>
          <div className=" py-6 flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="">Select licensor</label>
              <input
                type="text"
                placeholder={`Select licensor `}
                className="px-3 py-3 w-[50svh] border border-gray-200 rounded-lg "
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Channel ID</label>
              <input
                type="text"
                placeholder={`Enter Channel ID `}
                className="px-3 py-3 w-[50svh] border border-gray-200 rounded-lg "
              />
            </div>{" "}
            <div className="flex flex-col gap-4">
              <label htmlFor="">Channel name</label>
              <input
                type="text"
                placeholder={`Enter Channel name `}
                className="px-3 py-3 w-[50svh] border border-gray-200 rounded-lg"
              />
            </div>
          </div>{" "}
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder={`Enter email `}
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg "
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Commission (%)</label>
              <input
                type="number"
                placeholder={`Enter Commission `}
                className="px-3 py-3 w-[75svh] border border-gray-200 rounded-lg "
              />
            </div>{" "}
          </div>
          <div className="flex justify-end pt-5">
            <button className=" bg-black text-white font-bold px-3 py-3 rounded-lg">
              Create channel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
