import { useState } from "react";
import Sidebar, { Sidebaritem } from "./components/Sidebar/Sidebar";
import {
  Upload,
  Music,
  Payment,
  Invoice,
  Channel,
  Licensor,
  Settings,
  Home,
} from "./components/icons/icon";
import Header from "./components/Header/Header";

function App() {
  const [activeItem, setActiveItem] = useState<string | null>(null); // State to manage active item

  // Function to handle clicking on a sidebar item
  const handleItemClick = (text: string) => {
    setActiveItem((prevActiveItem) => (prevActiveItem === text ? null : text));
  };

  return (
    <main className="flex">
      <Sidebar>
        <Sidebaritem
          icon={<Home />}
          text="Dashboard"
          active={activeItem === "Dashboard"}
          onClick={() => handleItemClick("Dashboard")}
        />
        <Sidebaritem
          icon={<Upload />}
          text="CSV Upload"
          active={activeItem === "CSV Upload"}
          onClick={() => handleItemClick("CSV Upload")}
        />
        <Sidebaritem
          icon={<Licensor />}
          text="Licensor"
          active={activeItem === "Licensor"}
          onClick={() => handleItemClick("Licensor")}
        />
        <Sidebaritem
          icon={<Channel />}
          text="Channel"
          active={activeItem === "Channel"}
          onClick={() => handleItemClick("Channel")}
        />
        <Sidebaritem
          icon={<Music />}
          text="Music"
          active={activeItem === "Music"}
          onClick={() => handleItemClick("Music")}
        />
        <Sidebaritem
          icon={<Invoice />}
          text="Invoice"
          active={activeItem === "Invoice"}
          onClick={() => handleItemClick("Invoice")}
        />
        <Sidebaritem
          icon={<Payment />}
          text="Payment"
          active={activeItem === "Payment"}
          onClick={() => handleItemClick("Payment")}
        />
        <Sidebaritem
          icon={<Settings />}
          text="Settings"
          active={activeItem === "Settings"}
          onClick={() => handleItemClick("Settings")}
        />
      </Sidebar>
      <Header />
    </main>
  );
}

export default App;
