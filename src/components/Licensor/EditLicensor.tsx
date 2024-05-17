import { Link, useParams } from "react-router-dom";
import { Back, HomeXl } from "../icons/icon";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

type Props = {};

interface FormData {
  companyName: string;
  companyEmail: string;
  companyLogo: string;
  licensorName: string;
  licensorEmail: string;
  licensorAddress: string;
  licensorPhno: string;
  bankAccNum: string;
  ifsc_iban: string;
  currency: string;
}

const EditLicensor: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    companyEmail: "",
    companyLogo: "",
    licensorName: "",
    licensorEmail: "",
    licensorAddress: "",
    licensorPhno: "",
    bankAccNum: "",
    ifsc_iban: "",
    currency: "",
  });

  const notify = () => {
    toast.success("Licensor edited successfully!", { position: "top-center" });
  };
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/view-licensor/${id}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          companyLogo: reader.result?.toString() || "",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/update-licensor/${id}`,
        formData
      );
      if (response.status === 200) {
        console.log("Data updated successfully!");
        setTimeout(() => {
          navigate("/licensor");
        }, 2000);
        notify();
      } else {
        console.error("Failed to update data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [bankFormat, setBankFormat] = useState("IFSC Code");

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-100">
        <div className="pl-[34px]">
          <Link to="/licensor">
            <button className="flex gap-1 border font-medium text-sm border-gray-400 items-center rounded-lg px-3 py-2">
              <Back />
              Back
            </button>
          </Link>
        </div>

        <div className="flex flex-col mr-[34px] bg-white w-[95%] rounded-2xl h-[82%] m-[34px] my-[20px] pb-6">
          <h2 className="text-xl font-bold pl-[32px] pt-[20px]">
            Edit Licensor
          </h2>
          <div className="flex pl-[32px] pt-[20px] items-center gap-2">
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
                    Drop your logo here, or{" "}
                    <label className="cursor-pointer text-blue-500">
                      browse
                      <input
                        type="file"
                        accept="image/jpg, image/png"
                        name="companyLogo"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </label>
                </div>
                <p className="text-gray-500 text-xs">Supports JPG, PNG</p>

                {formData.companyLogo && (
                  <div className="w-16 h-16">
                    <img
                      src={formData.companyLogo}
                      alt="Company Logo"
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                )}
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
                  className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
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
                  className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                />
              </div>
            </div>
          </div>
          <div className="flex pl-[32px] pt-[20px] items-center gap-2">
            <p className="flex items-center justify-center bg-red-700 w-[20px] h-[20px] text-xs px-2 rounded-full text-white">
              2
            </p>
            <p className="font-bold">Personal Details</p>
          </div>
          <div className="gap-4 pt-[16px] pl-[32px]">
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-2 w-[45%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Licensor Name
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  name="licensorName"
                  value={formData.licensorName}
                  onChange={handleChange}
                  className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                />
              </div>
              <div className="flex flex-col gap-2 w-[45%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="licensorEmail"
                  value={formData.licensorEmail}
                  onChange={handleChange}
                  className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                />
              </div>
            </div>
            <div className="flex items-center mt-6 gap-6">
              <div className="flex flex-col gap-2 w-[45%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter address"
                  name="licensorAddress"
                  value={formData.licensorAddress}
                  onChange={handleChange}
                  className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                />
              </div>
              <div className="flex flex-col gap-2 w-[45%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="licensorPhno"
                  value={formData.licensorPhno}
                  onChange={handleChange}
                  className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
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
            <div className="flex flex-col gap-4">
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
                      onClick={() => setBankFormat("IBAN")}
                    />
                    <label htmlFor="international">International</label>
                  </div>
                </div>
              </div>{" "}
              <div className="flex gap-3">
                <div className="flex flex-col gap-2 w-[30%]">
                  <label htmlFor="" className="text-sm font-semibold">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter bank account number"
                    name="bankAccNum"
                    value={formData.bankAccNum}
                    onChange={handleChange}
                    className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                  />
                </div>
                <div className="flex flex-col gap-2 w-[30%]">
                  <label htmlFor="" className="text-sm font-semibold">
                    {bankFormat}
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter ${bankFormat}`}
                    name="ifsc_iban"
                    value={formData.ifsc_iban}
                    onChange={handleChange}
                    className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                  />
                </div>
                <div className="flex flex-col gap-2 w-[30%]">
                  <label htmlFor="" className="text-sm font-semibold">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pr-[32px] pt-[20px]">
            <button
              type="submit"
              className="bg-black text-white font-semibold text-sm rounded-md px-5 py-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" />
    </form>
  );
};

export default EditLicensor;
