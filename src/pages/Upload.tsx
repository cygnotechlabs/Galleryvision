import LogTable from "../components/Upload/LogTable";
import UploadChannelCSV from "../components/Upload/UploadChannel";
import UploadMusic from "../components/Upload/UploadMusic";
import UploadPayment from "../components/Upload/UploadPayment";

type Props = {};

function Upload({}: Props) {
  return (
    <div className="mx-6 my-6">
      <div className="flex flex-col">
        <div className="mb-2 lg:mb-0">
          <p className="text-xl font-bold">Upload</p>
          <h1 className="text-sm font-normal text-gray-400 pt-1">
            Upload your Youtube Channel CSV file, Music partner XLXS file &
            Payment report
          </h1>
        </div>
      </div>
      <div className="flex gap-4 w-full">
        <UploadChannelCSV />
        <UploadMusic />
        <UploadPayment />
      </div>
      <LogTable />
    </div>
  );
}

export default Upload;
