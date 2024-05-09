import React from "react";
import { Link } from "react-router-dom";
import { Arrow, BackArrow, Next } from "../icons/icon";

const BankDetails: React.FC = () => {
  return (
    <div className="bg-gray-100 h-[90svh]">
      <div className="pl-[34px] pt-[45px]">
        <Link to="/licensor">
          <button className="flex gap-1 border font-medium border-gray-600 items-center rounded-lg px-3 py-2 text-sm">
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
          </button>
        </Link>
      </div>

      <div className="flex flex-col mx-[34px] bg-white w-[95%] rounded-2xl h-[470px] mt-[24px]">
        <h2 className="text-xl font-bold mb-4 pl-[32px] pt-[32px]">
          Create Licensor
        </h2>
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-lg">Licensor Details</h1>
          <Next />
          <h1 className="text-lg">Personal Details</h1>
          <Next />
          <h1 className="font-bold text-lg">Bank Details</h1>
        </div>
        <div className="flex pl-[32px] pt-[20px] items-center gap-2">
          <p className="bg-red-700 w-[40px] h-[40px] px-4 pt-2 rounded-3xl text-white">
            3
          </p>
          <p className="font-bold">Bank Details</p>
        </div>
        <div className="gap-4 pt-[16px] pl-[32px]">
          <div className="flex items-center gap-12">
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="" className="text-lg">
                Select type of payment
              </label>
              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="domestic"
                    name="paymentType"
                    value="domestic"
                  />
                  <label htmlFor="domestic">Domestic</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="international"
                    name="paymentType"
                    value="international"
                  />
                  <label htmlFor="international">International</label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-4 gap-12">
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="" className="text-lg">
                Account number
              </label>
              <input
                type="number"
                placeholder="Phone Number"
                className="border-2 border-gray-300 text-sm rounded-md px-5 py-3"
              />
            </div>
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="" className="text-lg">
                IFSC code
              </label>
              <input
                type="number"
                placeholder="Enter IFSC code"
                className="border-2 border-gray-300 text-sm rounded-md px-5 py-3"
              />
            </div>
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="" className="text-lg">
                Preferred currency
              </label>
              <select className="border-2 border-gray-300 text-sm rounded-md px-5 py-3">
                <option value="currency">Select Currency</option>
                <option value="USD">USD</option>
                <option value="EUR">INR</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4 justify-end">
          <Link
            to="/personaldetails"
            className="bg-gray-400 font-bold flex gap-2 text-white py-3 border px-4 mr-[32px] rounded-md mt-4 self-end"
          >
            Previous
            <BackArrow />
          </Link>
          <button className="bg-black font-bold flex gap-2 text-white py-3 px-4 mr-[32px] rounded-md mt-4 self-end">
            Submit
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
