import { Block, Close, Email, Flag } from "../icons/icon";

type Props = {
  licensor: Licensor;
  onClose: () => void;
};
interface Licensor {
  _id: string;
  companyName: string;
  companyEmail: string;
  companyLogo: string;
  licensorName: string;
  licensorEmail: string;
  licensorPhno: string;
  licensorAddress: string;
  bankAccNum: string;
  ifsc_iban: string;
  currency: string;
}
const LicensorView = ({ licensor, onClose }: Props) => {
  console.log(licensor.companyLogo);

  return (
    <div className="w-[1135px] h-[849px] bg-white rounded-xl ">
      <div className="flex px-8 pt-8 items-center justify-between ">
        <p className="text-base font-bold">Licensor Details</p>
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className="mx-8 mt-4 w-[1071px] px-6 py-6 h-[181px] bg-gray-100 rounded-lg flex">
        <div className="flex justify-center items-center w-[153px] h-[133px] pr-2 py-2">
          {licensor.companyLogo && (
            <img
              src={licensor.companyLogo} // Set the src attribute to the base64 string
              alt="Company Logo"
              className="w-[150px] h-[150px] object-contain"
            />
          )}
        </div>
        <div className="w-[837px] h-[133px]">
          <h1 className="text-lg font-bold">{licensor.licensorName}</h1>
          <div className="flex w-[600px] h-[91px] mt-5 ">
            <div className="flex flex-col gap-1 pr-16 border-gray-500 border-r  ">
              <Block />
              <p className="text-sm text-gray-500">Licensor ID</p>
              <p className="text-sm font-bold">{licensor._id}</p>
            </div>
            <div className="flex flex-col gap-1 px-16 border-gray-500 border-r">
              <Email />
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-bold">{licensor.licensorEmail}</p>
            </div>
            <div className="flex flex-col gap-1 pl-16">
              <Flag />
              {/* <p className="text-sm text-gray-500">Country</p>
              <p className="text-sm font-bold">India</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-8 mt-4 w-[1071px] px-6 py-6 h-[131px] bg-gray-100 rounded-lg">
        <p className="text-base font-bold">Contact Details</p>
        <div className="flex items-center mt-4">
          <div className="pr-6 ">{licensor.licensorName}</div>
          <div className="px-6 border-gray-500 border-x">
            <p className="text-base text-gray-500">Email</p>
            <p className="text-sm font-medium">{licensor.companyEmail}</p>
          </div>
          <div className="px-6 border-r border-gray-500">
            <p className="text-base text-gray-500">Phone</p>
            <p className="text-sm font-medium">{licensor.licensorPhno}</p>
          </div>
          <div className="pl-6">
            <p className="text-base text-gray-500">Address</p>
            <p className="text-sm font-medium">{licensor.licensorAddress}</p>
          </div>
        </div>
      </div>
      <div className="mx-8 mt-4 w-[1071px] px-6 py-6 h-[131px] bg-gray-100 rounded-lg">
        <p className="text-base font-bold">Bank Details</p>
        <div className="flex items-center mt-4">
          {/* <div className="pr-6 ">
            <p className="text-base text-gray-500">Bank name</p>
            <p className="text-sm font-medium">ICICI Bank</p>
          </div>
          <div className="px-6 border-gray-500 border-x">
            <p className="text-base text-gray-500">Branch</p>
            <p className="text-sm font-medium">Delhi</p>
          </div>
          <div className="px-6 border-r border-gray-500">
            <p className="text-base text-gray-500">Acc holder name</p>
            <p className="text-sm font-medium">Kristin</p>
          </div> */}
          <div className="px-6 border-r border-gray-500">
            <p className="text-base text-gray-500">Acc number</p>
            <p className="text-sm font-medium">{licensor.bankAccNum}</p>
          </div>
          <div className="px-6 border-r border-gray-500">
            <p className="text-base text-gray-500">IFSC code</p>
            <p className="text-sm font-medium">{licensor.ifsc_iban}</p>
          </div>
          <div className="pl-6">
            <p className="text-base text-gray-500">Currency</p>
            <p className="text-sm font-medium">{licensor.currency}</p>
          </div>
        </div>
      </div>
      <div className="mx-8 mt-4 w-[1071px] px-6 py-6 h-[246px] bg-gray-100 rounded-lg">
        <p className="text-base font-bold">Company Details</p>
        <div className="flex items-center mt-4"></div>
      </div>
    </div>
  );
};

export default LicensorView;
