import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import logo from "../../assets/logo/userlogo.png";
import { Setting } from "../icons/icon";

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

      <div className="flex justify-between w-full items-center gap-3">
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
            <div className="lg:block px-5">
              <div className="font-semibold">Admin</div>
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
