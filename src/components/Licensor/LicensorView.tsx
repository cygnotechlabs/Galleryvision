import { Block, Close, Email } from "../icons/icon";

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
  channel: Channel[];
  music: Music[];
}

interface Channel {
  channelId: string;
  channelName?: string;
}

interface Music {
  musicId: string;
  musicName?: string;
}

const LicensorView = ({ licensor, onClose }: Props) => {
  console.log(licensor.companyLogo);

  return (
    <div className="w-full lg:w-[1135px] py-8 m-2 bg-white rounded-xl">
      <div className="flex px-4 lg:px-8 items-center justify-between">
        <p className="text-base font-bold">Licensor Details</p>
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className="mx-4 lg:mx-8 mt-4 w-full lg:w-[1071px] px-6 py-6 h-auto lg:h-[181px] bg-gray-100 rounded-lg flex flex-col lg:flex-row">
        <div className="flex justify-center items-center w-full lg:w-[153px] h-[133px] pr-2 py-2">
          {licensor.companyLogo && (
            <img
              src={licensor.companyLogo}
              alt="Company Logo"
              className="w-[150px] h-[150px] object-contain"
            />
          )}
        </div>
        <div className="w-full h-[133px]">
          <h1 className="text-lg font-bold">{licensor.licensorName}</h1>
          <div className="flex flex-col lg:flex-row w-full lg:w-[600px] h-auto lg:h-[91px] mt-5">
            <div className="flex flex-col gap-1 pr-16 border-gray-500 border-r">
              <Block />
              <p className="text-sm text-gray-500">Licensor ID</p>
              <p className="text-sm font-bold">{licensor._id}</p>
            </div>
            <div className="flex flex-col gap-1 px-16 border-gray-500">
              <Email />
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-bold">{licensor.licensorEmail}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 lg:mx-8 mt-4 w-full lg:w-[1071px] px-6 py-6 h-auto lg:h-[131px] bg-gray-100 rounded-lg">
        <p className="text-base font-bold">Contact Details</p>
        <div className="flex flex-col lg:flex-row items-center mt-4">
          <div className="pr-6">{licensor.licensorName}</div>
          <div className="px-6 border-gray-500 border-x mt-2 lg:mt-0">
            <p className="text-base text-gray-500">Email</p>
            <p className="text-sm font-medium">{licensor.companyEmail}</p>
          </div>
          <div className="px-6 border-r border-gray-500 mt-2 lg:mt-0">
            <p className="text-base text-gray-500">Phone</p>
            <p className="text-sm font-medium">{licensor.licensorPhno}</p>
          </div>
          <div className="pl-6 mt-2 lg:mt-0">
            <p className="text-base text-gray-500">Address</p>
            <p className="text-sm font-medium">{licensor.licensorAddress}</p>
          </div>
        </div>
      </div>
      <div className="mx-4 lg:mx-8 mt-4 w-full lg:w-[1071px] px-6 py-6 h-auto lg:h-[131px] bg-gray-100 rounded-lg">
        <p className="text-base font-bold">Bank Details</p>
        <div className="flex flex-col lg:flex-row items-center mt-4">
          <div className="px-6 border-r border-gray-500 mt-2 lg:mt-0">
            <p className="text-base text-gray-500">Acc number</p>
            <p className="text-sm font-medium">{licensor.bankAccNum}</p>
          </div>
          <div className="px-6 border-r border-gray-500 mt-2 lg:mt-0">
            <p className="text-base text-gray-500">IFSC code</p>
            <p className="text-sm font-medium">{licensor.ifsc_iban}</p>
          </div>
          <div className="pl-6 mt-2 lg:mt-0">
            <p className="text-base text-gray-500">Currency</p>
            <p className="text-sm font-medium">{licensor.currency}</p>
          </div>
        </div>
      </div>
      <div className="mx-4 lg:mx-8 mt-4 w-full lg:w-[1071px] px-6 py-6 h-auto lg:h-[246px] bg-gray-100 rounded-lg">
        <div className="flex flex-col lg:flex-row items-center mt-4">
          <div className="w-full lg:w-[50%]">
            <p className="font-bold">Channels</p>
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 font-medium py-1">Channel ID</th>
                  <th className="px-4 font-medium py-1">Channel Name</th>
                </tr>
              </thead>
              <tbody>
                {licensor.channel.map((ch, index) => (
                  <tr key={index}>
                    <td className="px-4 py-1">{ch.channelId}</td>
                    <td className="px-4 py-1">{ch.channelName || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full lg:w-[50%] mt-4 lg:mt-0">
            <p className="font-bold">Music</p>
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 font-medium py-1">Music ID</th>
                  <th className="px-4 font-medium py-1">Music Name</th>
                </tr>
              </thead>
              <tbody>
                {licensor.music.map((ch, index) => (
                  <tr key={index}>
                    <td className="px-4 py-1">{ch.musicId}</td>
                    <td className="px-4 py-1">{ch.musicName || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicensorView;
