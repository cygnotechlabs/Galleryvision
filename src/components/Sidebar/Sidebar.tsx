import { Link } from "react-router-dom";
import logo from "../../assets/logo/gv-logo.png";
import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({
  children,
  isOpen,
  toggleSidebar,
}: SidebarProps) {
  return (
    <aside
      className={`h-screen z-10 fixed left-0 top-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}
    >
      <nav className="h-full w-[320px] flex flex-col bg-white overflow-y-auto">
        <div className="py-8 px-8 flex justify-between items-center">
          <img src={logo} className="w-[70%]" alt="Logo" />
          <button className="lg:hidden text-gray-700" onClick={toggleSidebar}>
            ✕
          </button>
        </div>
        <ul className="flex-col">{children}</ul>
      </nav>
    </aside>
  );
}

interface SidebaritemProps {
  icon: ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
  to: string;
}

export const Sidebaritem = ({
  to,
  icon,
  text,
  active,
  onClick,
}: SidebaritemProps) => (
  <li
    className={` m-3 font-bold rounded-3xl hover:bg-gray-200 ${
      active ? "bg-red-600 text-white" : ""
    }`}
    onClick={onClick}
  >
    <Link to={to} className="flex items-center p-5">
      <span className="mr-3">{icon}</span>
      {text}
    </Link>
  </li>
);
