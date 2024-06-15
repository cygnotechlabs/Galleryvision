import UploadChannelCSV from "../components/Upload/UploadChannel";
import UploadMusic from "../components/Upload/UploadMusic";
import UploadPayment from "../components/Upload/UploadPayment";

type Props = {};

function Upload({}: Props) {
  return (
    <div>
      <div className="flex flex-col lg:flex-row px-4 lg:px-4 py-2 lg:py-4 justify-between items-start lg:items-center">
        <div className="mb-4 lg:mb-0">
          <p className="text-xl font-bold">Upload</p>
          <h1 className="text-sm font-normal text-gray-400 pt-2">
            Upload your Youtube Channel CSV files & Music partner XLXS file &
            Payment report
          </h1>
        </div>
      </div>
      <div className="flex w-full">
        <UploadChannelCSV />
        <UploadMusic />
        <UploadPayment />
      </div>
    </div>
  );
}

export default Upload;
