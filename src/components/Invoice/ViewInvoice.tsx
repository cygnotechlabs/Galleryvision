import { Back } from "../icons/icon";

type Props = {};

const ViewInvoice = ({}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 justify-center items-center  border-2 px-1 py-2 rounded-lg text-sm font-medium w-[5%]">
        <Back />
        Back
      </div>
      <div className="flex flex-col gap-6 bg-white w-[75%] p-8">
        <p className="text-lg font-bold ">Preview</p>
        <div className="flex flex-col gap-6 w-[94%] border-2 p-8 mx-8">
          <p className="text-lg font-bold">INV001</p>
          <div className="flex border-b-2 pb-6">
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Lincesor</p>
              <p className="font-bold text-sm">Sony</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Asset</p>
              <p className="font-bold text-sm">Sony Music Tamil</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Preferred currency</p>
              <p className="font-bold text-sm">Dollar ($)</p>
            </div>
          </div>
          <div className="flex border-b-2 pb-6">
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Invoice date</p>
              <p className="font-bold text-sm">04/04/24</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Due date</p>
              <p className="font-bold text-sm">21/05/24</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Status</p>
              <p className="font-bold text-sm">pending</p>
            </div>
          </div>
          <div className="flex border-b-2 justify-between pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold">Payment to</p>
              <div className="flex gap-2">
                logo
                <div className="flex-col">
                  <p className="text-sm font-bold">Asianet</p>
                  <p className="text-sm">asianet@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-2">
                logo
                <div className="flex-col">
                  <p className="text-sm font-bold">Asianet</p>
                  <p className="text-sm">asianet@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold">Payment to</p>
              <div className="flex gap-2">
                logo
                <div className="flex-col">
                  <p className="text-sm font-bold">Gallery vision</p>
                  <p className="text-sm">vision@email.com</p>
                </div>
              </div>
              <div className="flex gap-2">
                logo
                <div className="flex-col">
                  <p className="text-sm font-bold">**** **** **** 4455</p>
                  <p className="text-sm">
                    3891 Ranchview Dr. Richardson, California 62639
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-b-2 pb-6">
            <div className="flex justify-between gap-2">
              <p className="text-sm">Total revence</p>
              <p className="font-bold text-sm">$ 32000</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-sm">Commission (10%)</p>
              <p className="font-bold text-sm">$ 3200</p>
            </div>
            <div className="flex  justify-between gap-2">
              <p className="text-sm">Total amount</p>
              <p className="font-bold text-sm">$ 28000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoice;
