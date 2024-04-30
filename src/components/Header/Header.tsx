import React from "react";
import logo from "../../assets/logo/gv-logo.png";

interface HeaderProps {
  // Add any additional props you may need
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex h-[77px] w-[1373.15px] items-center justify-between px-4 py-2 bg-white border-b">
      <div className="relative">
        <svg
          className="h-5 w-5 text-gray-400 absolute inset-y-0 left-0 ml-2 mt-3 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          className="pl-9 px-4 py-2 pr-10 w-[441px] h-[41.89px] rounded-lg bg-gray-200  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="text-gray-400 hover:text-white focus:outline-none"
          aria-label="Settings"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        <div className="flex relative">
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
      </div>
    </header>
  );
};

export default Header;
