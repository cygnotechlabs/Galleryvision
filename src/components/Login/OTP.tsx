// OtpModal.tsx

import { useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";

type Props = {
  onClose: () => void;
  email: string;
  onOtpVerified: (token: string) => void;
};

const OtpModal = ({ onClose, email, onOtpVerified }: Props) => {
  const [otp, setOtp] = useState<number | string>("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ENDPOINTS.OPT_CHECKING, {
        email: email,
        otp: otp.toString(),
      });
      if (response.status === 200) {
        const token = response.data.token; // Assuming the OTP verification response contains a token
        localStorage.setItem("token", token);
        console.log(localStorage);
        onOtpVerified(token);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-red px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg text-center leading-6 font-medium text-gray-900 mb-2">
                Enter OTP
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mt-2">
                  <input
                    type="number"
                    name="otp"
                    id="otp"
                    autoComplete="one-time-code"
                    required
                    value={otp}
                    onChange={handleChange}
                    className="appearance-none rounded-none text-center relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter OTP"
                  />
                </div>
                <div className="mt-3">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
