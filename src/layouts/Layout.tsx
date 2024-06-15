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
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleItemClick = (text: string) => {
    setActiveItem(text);
    setIsSidebarOpen(false); // Close sidebar on item click in mobile view
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="flex font-custom bg-gray-100 h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <Sidebaritem
          to="/home"
          icon={<Home />}
          text="Dashboard"
          active={activeItem === "Dashboard"}
          onClick={() => handleItemClick("Dashboard")}
        />
        <Sidebaritem
          to="/home/csv-upload"
          icon={<Upload />}
          text="Upload Files"
          active={activeItem === "Upload File"}
          onClick={() => handleItemClick("Upload File")}
        />
        <Sidebaritem
          to="/home/licensor"
          icon={<Licensor />}
          text="Licensor"
          active={activeItem === "Licensor"}
          onClick={() => handleItemClick("Licensor")}
        />
        <Sidebaritem
          to="/home/channel"
          icon={<Channel />}
          text="Channel"
          active={activeItem === "Channel"}
          onClick={() => handleItemClick("Channel")}
        />
        <Sidebaritem
          to="/home/music"
          icon={<Music />}
          text="Music Partner"
          active={activeItem === "Music"}
          onClick={() => handleItemClick("Music")}
        />
        <Sidebaritem
          to="/home/invoice"
          icon={<Invoice />}
          text="Invoice"
          active={activeItem === "Invoice"}
          onClick={() => handleItemClick("Invoice")}
        />
        <Sidebaritem
          to="/home/payment"
          icon={<Payment />}
          text="Payment"
          active={activeItem === "Payment"}
          onClick={() => handleItemClick("Payment")}
        />
        <Sidebaritem
          to="/home/settings"
          icon={<Settings />}
          text="Settings"
          active={activeItem === "Settings"}
          onClick={() => handleItemClick("Settings")}
        />
      </Sidebar>
      <div className="flex-1 flex flex-col ml-0 lg:ml-[200px]">
        <Header toggleSidebar={toggleSidebar} />
        <div className="overflow-y-auto flex-1 p-2">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
