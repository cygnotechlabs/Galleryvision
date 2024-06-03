import { ToastContainer } from "react-toastify";

type Props = {};
// const [uploading, setUploading] = useState<boolean>(false);

const UploadPayment = ({}: Props) => {
  return (
    <div className="flex flex-col items-center m-8 rounded-2xl px-7 py-4 bg-report-bg bg-cover">
      <h2 className="text-sm font-bold mb-4 text-white">
        Upload Status Report
      </h2>
      <div className="relative bg-red-900 rounded-lg w-full px-8 border-2 border-dashed border-gray-300 flex flex-col items-center">
        <div className="flex flex-col items-center pt-4">
          <div className="text-red-500 rounded-full flex justify-center items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              className="w-[70px] h-[60px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <div className="flex">
            <p className="text-white font-medium text-sm mb-">
              Select your File here,
            </p>
            <a
              // onClick={}
              className="text-red-600 font-medium text-sm hover:underline pl-1"
            >
              Browse
            </a>
          </div>
        </div>
        <p className="text-white text-xs pb-4 mt-4">
          Supported formats: XLXS files
        </p>
        <input
          type="file"
          accept=".xlsx"
          // ref={fileInputRef}
          className="hidden"
        />
      </div>
      <button
        className="bg-black text-white w-[304px] py-2 px-8 rounded-md mt-4"
        //   onClick={handleSubmit}
        //   disabled={uploading}
      >
        Upload file
        {/* {uploading ? "Uploading..." : "Upload file"} */}
      </button>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default UploadPayment;
