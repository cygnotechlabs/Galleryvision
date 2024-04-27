import logo from "../../assets/logo/gv-logo.png";
import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="h-screen">
      <nav className="h-full w-[360px] flex flex-col bg-white border-r shadow-sm">
        <div className="pt-[32px] pr-[28px] pb-[32px] pl-[28px] flex justify-between items-center">
          <img src={logo} className="w-[146px] h-[60px]" alt="Logo" />
          <span></span>
        </div>
        <ul className="flex-col px-6">{children}</ul>
      </nav>
    </aside>
  );
}

interface SidebaritemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

export function Sidebaritem({ icon, text, active, onClick }: SidebaritemProps) {
  return (
    <li
      className={`relative
       flex items-center font-semibold
       pr-[24px] pl-[16px] py-[16px] my-4  rounded-3xl cursor-pointer
       transition-colors ${
         active ? "bg-red-700 text-white " : "text-gray-700 bg-white"
       }`}
      onClick={onClick}
    >
      {icon}
      <span className="w-[92px] h-[22px] ml-3">{text}</span>
      {/* Optionally render based on active or alert props */}
    </li>
  );
}
