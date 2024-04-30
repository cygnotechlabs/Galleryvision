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
  const [activeItem, setActiveItem] = useState<string | null>(null); // State to manage active item

  // Function to handle clicking on a sidebar item
  const handleItemClick = (text: string) => {
    setActiveItem((prevActiveItem) => (prevActiveItem === text ? null : text));
  };
  return (
    <main className="flex">
      <Sidebar>
        <Sidebaritem
          to="/home"
          icon={<Home />}
          text="Dashboard"
          active={activeItem === "Dashboard"}
          onClick={() => handleItemClick("Dashboard")}
        />
        <Sidebaritem
          to="/csv-upload"
          icon={<Upload />}
          text="CSV Upload"
          active={activeItem === "CSV Upload"}
          onClick={() => handleItemClick("CSV Upload")}
        />
        <Sidebaritem
          to="/licensor"
          icon={<Licensor />}
          text="Licensor"
          active={activeItem === "Licensor"}
          onClick={() => handleItemClick("Licensor")}
        />
        <Sidebaritem
          to="/channel"
          icon={<Channel />}
          text="Channel"
          active={activeItem === "Channel"}
          onClick={() => handleItemClick("Channel")}
        />
        <Sidebaritem
          to="/music"
          icon={<Music />}
          text="Music"
          active={activeItem === "Music"}
          onClick={() => handleItemClick("Music")}
        />
        <Sidebaritem
          to="/invoice"
          icon={<Invoice />}
          text="Invoice"
          active={activeItem === "Invoice"}
          onClick={() => handleItemClick("Invoice")}
        />
        <Sidebaritem
          to="/payment"
          icon={<Payment />}
          text="Payment"
          active={activeItem === "Payment"}
          onClick={() => handleItemClick("Payment")}
        />
        <Sidebaritem
          to="/settings"
          icon={<Settings />}
          text="Settings"
          active={activeItem === "Settings"}
          onClick={() => handleItemClick("Settings")}
        />
      </Sidebar>
      <div>
        <Header />
        {children}
      </div>
    </main>
  );
};

export default Layout;
