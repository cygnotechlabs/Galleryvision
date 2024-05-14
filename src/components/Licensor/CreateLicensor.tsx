import { Link } from "react-router-dom";
import { Arrow, HomeXl } from "../icons/icon";
import { useState } from "react";

type Props = {};

const CreateLicensor = ({}: Props) => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    licenserName: "",
    licenserEmail: "",
    licenserPhno: "",
    licenserAddress: "",
    paymentMethod: "",
    bankAccNum: "",
    ifsc_iban: "",
    currency: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/add-licensor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Data submitted successfully!");
      } else {
        console.error("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [bankFormat, setBankFormat] = useState("IFSC code");

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-100 h-[90%] ">
        <div className="pl-[34px] pt-[20px]">
          <Link to="/licensor">
            <button className="flex gap-1 border font-medium text-sm border-gray-400 items-center rounded-lg px-3 py-2 ">
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

        <div className="flex flex-col mr-[34px] bg-white w-[95%] rounded-2xl h-[82%] ml-[34px] mt-[20px]">
          <h2 className="text-xl font-bold  pl-[32px] pt-[20px]">
            Create Licensor
          </h2>
          <div className="flex pl-[32px] pt-[20px] jus items-center gap-2 ">
            <p className="flex items-center justify-center bg-red-700 w-[20px] h-[20px] text-xs px-2 rounded-full text-white">
              1
            </p>
            <p className="font-bold">Licensor Details</p>
          </div>
          <div className="flex gap-4 pt-[10px] pl-[32px]">
            <div className="bg-gray-100 px-[10px] py-[10px] rounded-xl">
              <div className="bg-white rounded-lg p-2 border-2 border-dashed border-gray-300 flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mx-[24px] my-[10px]">
                  <HomeXl />
                  <label className="text-black font-medium text-sm">
                    Drop your logo here, or <a href="#">browse</a>
                  </label>
                </div>
                <p className="text-gray-500 text-xs">Supports JPG, PNG</p>
                <input
                  type="file"
                  accept="image/jpg, image/png"
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex items-center gap-12">
              <div className="flex flex-col gap-2 w-[50svh]">
                <label htmlFor="" className="text-sm font-semibold">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="border-2 border-gray-300  text-sm rounded-md px-5 py-2"
                />
              </div>
              <div className="flex flex-col gap-2 w-[50svh]">
                <label htmlFor="" className="text-sm font-semibold">
                  Company Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  className="border-2 border-gray-300  text-sm rounded-md px-5 py-2"
                />
              </div>
            </div>
          </div>
          <div className="flex pl-[32px] pt-[20px] items-center gap-2 ">
            <p className="flex items-center justify-center bg-red-700 w-[20px] h-[20px] text-xs px-2 rounded-full text-white">
              2
            </p>
            <p className="font-bold">Personal Details</p>
          </div>
          <div className=" gap-4 pt-[16px] pl-[32px] ">
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-2 w-[45%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Licenser Name
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  name="licenserName"
                  value={formData.licenserName}
                  onChange={handleChange}
                  className="border-2 border-gray-300  text-sm rounded-md px-5 py-2"
                />
              </div>
              <div className="flex flex-col gap-2 w-[45%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="licenserEmail"
                  value={formData.licenserEmail}
                  onChange={handleChange}
                  className="border-2 border-gray-300  text-sm rounded-md px-5 py-2"
                />
              </div>
            </div>
            <div className="flex items-center mt-6 gap-6">
              <div className="flex flex-col gap-2 w-[45%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Phone
                </label>
                <input
                  type="number"
                  placeholder="Phone Number"
                  name="licenserPhno"
                  value={formData.licenserPhno}
                  onChange={handleChange}
                  className="border-2 border-gray-300  text-sm rounded-md px-5 py-2"
                />
              </div>
            </div>
          </div>
          <div className="flex pl-[32px] pt-[20px] items-center gap-2">
            <p className="flex items-center justify-center bg-red-700 w-[20px] h-[20px] text-xs px-2 rounded-full text-white">
              3
            </p>
            <p className="font-bold">Bank Details</p>
          </div>
          <div className="gap-4 pt-[16px] pl-[32px]">
            <div className="flex items-center gap-12">
              <div className="flex flex-col gap-2 w-[30%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Select type of payment
                </label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="domestic"
                      name="paymentType"
                      value="domestic"
                      onClick={() => setBankFormat("IFSC Code")}
                    />
                    <label htmlFor="domestic">Domestic</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="international"
                      name="paymentType"
                      value="international"
                      onClick={() => setBankFormat("IBAN Code")}
                    />
                    <label htmlFor="international">International</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-4 gap-12">
              <div className="flex flex-col gap-2 w-[30%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Account number
                </label>
                <input
                  type="number"
                  placeholder="Phone Number"
                  name="bankAccNum"
                  value={formData.bankAccNum}
                  onChange={handleChange}
                  className="border-2 border-gray-300  text-sm rounded-md px-5 py-2"
                />
              </div>
              <div className="flex flex-col gap-2 w-[30%]">
                <label htmlFor="" className="text-sm font-semibold">
                  {bankFormat}
                </label>
                <input
                  type="number"
                  placeholder="Enter IFSC code"
                  name="ifsc_iban"
                  value={formData.ifsc_iban}
                  onChange={handleChange}
                  className="border-2 border-gray-300  text-sm rounded-md px-5 py-2"
                />
              </div>
              <div className="flex flex-col gap-2 w-[30%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Preferred currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="border-2 border-gray-300  text-sm rounded-md px-5 py-2"
                >
                  <option value="currency">Select Currency</option>
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-black font-bold flex gap-2 text-white py-3 px-4 mr-[32px] rounded-md mt-4 self-end"
              >
                Submit
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateLicensor;
