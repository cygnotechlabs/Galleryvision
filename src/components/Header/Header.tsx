import React from "react";
import logo from "../../assets/logo/gv-logo.png";
import { Setting } from "../icons/icon";

interface HeaderProps {
  // Add any additional props you may need
}

const Header: React.FC<HeaderProps> = () => {
  const rightPadding = 320; // Adjust this value as needed
  return (
    <header
      style={{ width: `calc(100vw - ${rightPadding}px)` }}
      className="flex  w-screen items-center justify-between px-4 py-3 bg-white"
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            className="pl-9 pr-10 py-2 w-[150%] rounded-lg bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
            style={{ marginLeft: "15px", paddingRight: "60px" }} // Adjust the right padding here
          />
        </div>
      </div>
      <div className="flex relative gap-3">
        <button
          className="text-black pr-4 focus:outline-none"
          aria-label="Settings"
        >
          <Setting />
        </button>
        <div>
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={logo}
            alt="Profile"
          />
        </div>

        <div className="px-5">
          <div className="font-semibold">Aman</div>
          <div className="text-sm">admin</div>
        </div>
        <div></div>
      </div>
    </header>
  );
};

export default Header;
