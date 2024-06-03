import UploadChannelCSV from "../components/Upload/UploadChannel";
import UploadMusic from "../components/Upload/UploadMusic";
import UploadPayment from "../components/Upload/UploadPayment";

type Props = {};

function Upload({}: Props) {
  return (
    <div className="pl-8 pt-10 bg-gray-100 h-[90svh]">
      <div className="">
        <h1 className="text-xl font-bold">Upload files</h1>
        <h1 className="text-sm font-normal text-gray-400 pt-2">
          Upload your Youtube Channel CSV files & Music partner XLXS file &
          Payment report
        </h1>
      </div>
      <div className="flex">
        <UploadChannelCSV />
        <UploadMusic />
        <UploadPayment />
      </div>
    </div>
  );
}

export default Upload;
