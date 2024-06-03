import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import image from "../../assets/Image/login-image.png";
import logo from "../../assets/logo/gv-logo.png";
import API_ENDPOINTS from "../../config/apiConfig";
import Modal from "../../layouts/Modal";
import OtpModal from "./OTP";

type Props = {};

function Login({}: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleStayLoggedInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStayLoggedIn(e.target.checked);
  };

  const validateForm = () => {
    if (!email || !password) {
      setError("Both email and password are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN_TEST, {
        email,
        password,
      });

      if (response.status === 200) {
        login(response.data, stayLoggedIn);
        setOpen(true); // Open the OTP modal only if the login is successful
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      setError(error.response?.data || "An error occurred during login.");
      // Make sure to handle the case where error.response is undefined
      // or error.response.data is undefined to prevent unexpected errors.
    }
  };
  return (
    <div className="flex flex-col lg:flex-row w-screen h-screen">
      <div className="w-full lg:w-1/2 relative">
        <img
          src={image}
          className="h-64 lg:h-full w-full object-cover"
          alt="Background"
        />
        <div className="absolute top-20 lg:top-40 left-10 lg:left-56 w-[80%] lg:w-[50%]">
          <p
            className="text-white text-lg lg:text-3xl font-medium"
            style={{ lineHeight: "1.5" }}
          >
            Seamless Revenue Management & Payment Processing for YouTube & Music
          </p>
          <div className="flex gap-4 mt-2 lg:mt-5">
            <div className="bg-white rounded-full w-[30%] lg:w-[18%] h-2"></div>
            <div className="bg-white rounded-full w-[10%] lg:w-[5%] h-2"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-1/2 bg-white gap-10 lg:gap-40">
        <div className="flex justify-center lg:justify-end p-4 lg:p-8">
          <img src={logo} alt="Gallery Vision Logo" className="w-24 lg:w-32" />
        </div>

        <div className="flex flex-col justify-center px-8 lg:px-28">
          <p className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-8">Login</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email-address"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="name@email.com"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="stay-logged-in"
                  name="stay-logged-in"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={stayLoggedIn}
                  onChange={handleStayLoggedInChange}
                />
                <label
                  htmlFor="stay-logged-in"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Stay logged in
                </label>
              </div>
            </div>

            {error && (
              <div className="text-red-500 font-semibold text-sm mt-2">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal onClose={() => setOpen(false)} open={open}>
        <OtpModal onClose={() => setOpen(false)} email={email} />
      </Modal>
    </div>
  );
}

export default Login;
