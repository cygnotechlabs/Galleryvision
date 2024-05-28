import React, { useState } from "react";
import logo from "../../assets/logo/gv-logo.png";
import { Setting } from "../icons/icon";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { logout } = useAuth();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white relative">
      <button
        className="lg:hidden text-black pr-4 focus:outline-none"
        aria-label="Toggle Sidebar"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <input
        type="text"
        className="px-10 py-2 w-30 lg:w-[30%] rounded-lg bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search"
      />
      <div className="flex items-center gap-3">
        <Link to={"/home/settings"}>
          <button
            className="text-black pr-4 focus:outline-none"
            aria-label="Settings"
          >
            <Setting />
          </button>
        </Link>

        <div className="relative">
          <button
            className="flex items-center focus:outline-none"
            onClick={toggleDropdown}
          >
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={logo}
              alt="Profile"
            />
            <div className="hidden lg:block px-5">
              <div className="font-semibold">Aman</div>
              <div className="text-sm">admin</div>
            </div>
          </button>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  logout();
                }}
              >
                Signout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
