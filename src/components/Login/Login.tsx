import { Link } from "react-router-dom";
import image from "../../assets/Image/login-image.png";
import logo from "../../assets/logo/gv-logo.png";
import axios from "axios";

type Props = {};

function Login({}: Props) {

  // const onSubmit = ()=>{
  //   responce = axios.get('')
  // }


  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/2 relative">
        <img
          src={image}
          className="h-full w-full object-cover"
          alt="Background"
        />
        <div className="absolute top-40 left-56 w-[50%]">
          <p
            className="text-white text-3xl font-medium"
            style={{ lineHeight: "38.4px" }}
          >
            Seamless Revenue Management & Payment Processing for YouTube & Music
          </p>
          <div className="flex gap-4 mt-5">
            <div className="bg-white rounded-full w-[18%] h-2"></div>
            <div className="bg-white rounded-full w-[5%] h-2"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-1/2 bg-white gap-40">
        <div className="flex justify-end p-8">
          <img src={logo} alt="Gallery Vision Logo" className="w-32" />
        </div>

        <div className="flex flex-col justify-center px-28">
          <p className="text-4xl font-bold mb-8">Login</p>
          <form className="space-y-6" action="#" method="POST">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email-address"
                  className="text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="name@email.com"
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
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember password
                </label>
              </div>
            </div>

            <div>
              <Link to={"/"}>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
