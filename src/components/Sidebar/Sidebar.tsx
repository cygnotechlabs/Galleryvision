import { Link } from "react-router-dom";
import logo from "../../assets/logo/gv-logo.png";
import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="h-screen border-b-0 fixed left-0 top-0">
      <nav className="h-full w-[360px] flex flex-col bg-white overflow-y-auto">
        <div className="py-[32px] px-[32px] flex justify-between items-center">
          <img src={logo} className="w-[146px] h-[60px]" alt="Logo" />
          <span></span>
        </div>
        <ul className="flex-col">{children}</ul>
      </nav>
    </aside>
  );
}

interface SidebaritemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
  to: string;
}

export function Sidebaritem({
  icon,
  text,
  active,
  onClick,
  to,
}: SidebaritemProps) {
  return (
    <Link to={to}>
      <li
        className={`relative flex items-center font-semibold pr-[24px] pl-[16px] py-[16px] my-4 rounded-3xl cursor-pointer transition-colors ${
          active ? "bg-red-700 text-white" : "text-gray-700 bg-white"
        }`}
        onClick={onClick}
      >
        {icon}
        <span className="w-[92px] h-[22px] ml-3">{text}</span>
      </li>
    </Link>
  );
}
