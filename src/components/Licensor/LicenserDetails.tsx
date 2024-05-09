import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Arrow, Next } from "../icons/icon";

const LicensorDetails: React.FC = () => {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    logoInputRef.current?.click();
  };

  return (
    <div className="bg-gray-100 h-[90svh]">
      <div className="pl-[34px] pt-[45px]">
        <Link to="/licensor">
          <button className="flex gap-1 border font-medium border-gray-600 items-center rounded-lg px-3 py-2 text-lg">
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

      <div className="flex flex-col mr-[34px] bg-white w-[95%] rounded-2xl h-[470px] ml-[34px] mt-[24px]">
        <h2 className="text-xl font-bold mb-4 pl-[32px] pt-[32px]">
          Create Licensor
        </h2>
        <div className="flex items-center justify-center gap-2">
          <h1 className="font-bold text-lg">Licensor Details</h1>
          <Next />
          <h1 className="text-lg">Personal Details</h1>
          <Next />
          <h1 className="text-lg">Bank Details</h1>
        </div>
        <div className="flex pl-[32px] pt-[20px] items-center gap-2 ">
          <p className="bg-red-700 w-[40px] h-[40px] px-4 pt-2 rounded-3xl text-white">
            1
          </p>
          <p className="font-bold">Licensor Details</p>
        </div>
        <div className="flex gap-4 pt-[16px] pl-[32px]">
          <div className="bg-gray-100 px-[24px] py-[24px] rounded-xl">
            <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300 flex flex-col items-center">
              <div className="flex flex-col items-center mb-4 mx-[24px] my-[24px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-10 h-10 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <label className="text-black font-medium text-lg">
                  Drop your logo here, or{" "}
                  <a href="#" onClick={handleBrowseClick}>
                    browse
                  </a>
                </label>
              </div>
              <p className="text-gray-500 text-lg">Supports JPG, PNG</p>

              <input
                type="file"
                accept="image/jpg, image/png"
                ref={logoInputRef}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex items-center gap-12">
            <div className="flex flex-col gap-2 w-[50svh]">
              <label htmlFor="" className="text-lg">
                Licensor Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="border-2 border-gray-300  text-lg rounded-md px-5 py-3"
              />
            </div>
            <div className="flex flex-col gap-2 w-[50svh]">
              <label htmlFor="" className="text-lg">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="border-2 border-gray-300 text-lg rounded-md px-5 py-3"
              />
            </div>
          </div>
        </div>
        <Link
          to="/personaldetails"
          className="bg-black font-bold flex gap-2 text-white py-3 px-4 mr-[32px] rounded-md self-end"
        >
          Next
          <Arrow />
        </Link>
      </div>
    </div>
  );
};

export default LicensorDetails;
