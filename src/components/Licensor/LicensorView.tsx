import { Block, Close, Email, Flag } from "../icons/icon";

type Props = {};

const LicensorView = (props: Props) => {
  return (
    <div className="w-[1135px] h-[849px] bg-white rounded-xl ">
      <div className="flex px-8 pt-8 items-center justify-between ">
        <p className="text-base font-bold">Licensor Details</p>
        <Close />
      </div>
      <div className="mx-8 mt-4 w-[1071px] px-6 py-6 h-[181px] bg-gray-100 rounded-lg flex">
        <div className="flex justify-center items-center w-[153px] h-[133px]">
          logo
        </div>
        <div className="w-[837px] h-[133px]">
          <h1 className="text-lg font-bold">T-Series</h1>
          <div className="flex w-[600px] h-[91px] mt-5 ">
            <div className="flex flex-col gap-1 pr-16 border-gray-500 border-r  ">
              <Block />
              <p className="text-sm text-gray-500">Licensor ID</p>
              <p className="text-sm font-bold">LD0001</p>
            </div>
            <div className="flex flex-col gap-1 px-16 border-gray-500 border-r">
              <Email />
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-bold">T-Series@mail.com</p>
            </div>
            <div className="flex flex-col gap-1 pl-16">
              <Flag />
              <p className="text-sm text-gray-500">Country</p>
              <p className="text-sm font-bold">India</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-8 mt-4 w-[1071px] px-6 py-6 h-[131px] bg-gray-100 rounded-lg">
        <p className="text-base font-bold">Contact Details</p>
        <div className="flex items-center mt-4">
          <div className="pr-6 ">John Doe</div>
          <div className="px-6 border-gray-500 border-x">
            <p className="text-base text-gray-500">Email</p>
            <p className="text-sm font-medium">T-Series@mail.com</p>
          </div>
          <div className="px-6 border-r border-gray-500">
            <p className="text-base text-gray-500">Phone</p>
            <p className="text-sm font-medium">(225) 555-0118</p>
          </div>
          <div className="pl-6">
            <p className="text-base text-gray-500">Address</p>
            <p className="text-sm font-medium">
              8502 Preston Rd. Inglewood, Maine 98380
            </p>
          </div>
        </div>
      </div>
      <div className="mx-8 mt-4 w-[1071px] px-6 py-6 h-[131px] bg-gray-100 rounded-lg">
        <p className="text-base font-bold">Bank Details</p>
        <div className="flex items-center mt-4">
          <div className="pr-6 ">
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
          </div>
          <div className="px-6 border-r border-gray-500">
            <p className="text-base text-gray-500">Acc number</p>
            <p className="text-sm font-medium">xxxx xxxx xxxx xxxx</p>
          </div>
          <div className="px-6 border-r border-gray-500">
            <p className="text-base text-gray-500">IFSC code</p>
            <p className="text-sm font-medium">xxxx xxxx xxxx xxxx</p>
          </div>
          <div className="pl-6">
            <p className="text-base text-gray-500">Preferred currency</p>
            <p className="text-sm font-medium">INR</p>
          </div>
        </div>
      </div>
      <div className="mx-8 mt-4 w-[1071px] px-6 py-6 h-[246px] bg-gray-100 rounded-lg">
        <p className="text-base font-bold">Company Details</p>
        <div className="flex items-center mt-4">
          
        </div>
      </div>
    </div>
  );
};

export default LicensorView;
