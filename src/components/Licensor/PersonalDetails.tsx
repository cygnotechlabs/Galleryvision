import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Arrow, BackArrow, Next } from "../icons/icon";

const PersnalDetails: React.FC = () => {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    logoInputRef.current?.click();
  };

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

      <div className="flex flex-col mr-[34px] bg-white w-[1,172px] rounded-2xl h-[470px] ml-[34px] mt-[24px]">
        <h2 className="text-xl font-bold mb-4 pl-[32px] pt-[32px]">
          Create Licensor
        </h2>
        <div className="flex items-center justify-center gap-2">
          <h1>Licensor Details</h1>
          <Next />
          <h1 className="font-bold">Personal Details</h1>
          <Next />
          <h1>Bank Details</h1>
        </div>
        <div className="flex pl-[32px] pt-[20px] items-center gap-2 ">
          <p className="bg-red-700 w-[40px] h-[40px] px-4 pt-2 rounded-3xl text-white">
            2
          </p>
          <p className="font-bold">Personal Details</p>
        </div>
        <div className=" gap-4 pt-[16px] pl-[32px] ">
          <div className="flex items-center gap-12">
            <div className="flex flex-col gap-2 w-[45svh]">
              <label htmlFor="" className="text-sm">
                First Name
              </label>
              <input
                type="text"
                placeholder="First name"
                className="border-2 border-gray-300  text-sm rounded-md px-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-2 w-[45svh]">
              <label htmlFor="" className="text-sm">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last name"
                className="border-2 border-gray-300  text-sm rounded-md px-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-2 w-[45svh]">
              <label htmlFor="" className="text-sm">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="border-2 border-gray-300 text-sm rounded-md px-4 py-2"
              />
            </div>
          </div>
          <div className="flex items-center mt-6 gap-12">
            <div className="flex flex-col gap-2 w-[70svh]">
              <label htmlFor="" className="text-sm">
                Phone
              </label>
              <input
                type="number"
                placeholder="Phone Number"
                className="border-2 border-gray-300 text-sm rounded-md px-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-2 w-[70svh]">
              <label htmlFor="" className="text-sm">
                Address
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="border-2 border-gray-300 text-sm rounded-md px-4 py-2"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4 justify-end">
          <button className="bg-gray-400 font-bold flex gap-2 text-white py-3 border border-black px-4 mr-[32px] rounded-md mt-4 self-end">
          Previous
            <BackArrow/>
          </button>
          <button className="bg-black font-bold flex gap-2 text-white py-3 px-4 mr-[32px] rounded-md mt-4 self-end">
            Next
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersnalDetails;
