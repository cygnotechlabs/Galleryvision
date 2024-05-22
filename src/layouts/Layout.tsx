import { useState } from "react";
import Sidebar, { Sidebaritem } from "../components/Sidebar/Sidebar";
import {
  Upload,
  Music,
  Payment,
  Invoice,
  Channel,
  Licensor,
  Settings,
  Home,
} from "../components/icons/icon";
import Header from "../components/Header/Header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [activeItem, setActiveItem] = useState<string>("Dashboard");

  // State to manage active item
  // Function to handle clicking on a sidebar item
  const handleItemClick = (text: string) => {
    setActiveItem(text);
  };

  return (
    <main className="flex font-custom bg-gray-100 h-screen ">
      <Sidebar>
        <nav className="h-full w-[15%] flex flex-col bg-white mx-3 fixed">
          <Sidebaritem
            to="/home"
            icon={<Home />}
            text="Dashboard"
            active={activeItem === "Dashboard"}
            onClick={() => handleItemClick("Dashboard")}
          />
          <Sidebaritem
            to="csv-upload"
            icon={<Upload />}
            text="CSV Upload"
            active={activeItem === "CSV Upload"}
            onClick={() => handleItemClick("CSV Upload")}
          />
          <Sidebaritem
            to="licensor"
            icon={<Licensor />}
            text="Licensor"
            active={activeItem === "Licensor"}
            onClick={() => handleItemClick("Licensor")}
          />
          <Sidebaritem
            to="channel"
            icon={<Channel />}
            text="Channel"
            active={activeItem === "Channel"}
            onClick={() => handleItemClick("Channel")}
          />
          <Sidebaritem
            to="music"
            icon={<Music />}
            text="Music Partner"
            active={activeItem === "Music"}
            onClick={() => handleItemClick("Music")}
          />
          <Sidebaritem
            to="invoice"
            icon={<Invoice />}
            text="Invoice"
            active={activeItem === "Invoice"}
            onClick={() => handleItemClick("Invoice")}
          />
          <Sidebaritem
            to="payment"
            icon={<Payment />}
            text="Payment"
            active={activeItem === "Payment"}
            onClick={() => handleItemClick("Payment")}
          />
          <Sidebaritem
            to="settings"
            icon={<Settings />}
            text="Settings"
            active={activeItem === "Settings"}
            onClick={() => handleItemClick("Settings")}
          />
        </nav>
      </Sidebar>
      <div className="ml-[320px] flex-1 flex flex-col">
        <Header />
        <div className="overflow-y-auto flex-1 p-4">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
