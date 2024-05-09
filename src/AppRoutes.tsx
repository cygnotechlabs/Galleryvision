import { Route, Routes } from "react-router-dom";
import BankDetails from "./components/Licensor/BankDetails";
import LicenserDetails from "./components/Licensor/LicenserDetails";
import PersnalDetails from "./components/Licensor/PersonalDetails";
import Channel from "./pages/Channel";
import Invoice from "./pages/Invoice";
import Licensor from "./pages/Licensor";
import Root from "./pages/Root";
import Settings from "./pages/Settings";
import Upload from "./pages/Upload";
import Music from "./pages/Music";
import UnassignedChannel from "./components/Channel/UnassignedChannel";
import CreateChannel from "./components/Channel/CreateChannel";
import ChannelView from "./components/Channel/ChannelView";

const AppRoutes: any = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/licensor" element={<Licensor />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/create-channel" element={<CreateChannel />} />
        <Route path="/channel-view" element={<ChannelView />} />
        <Route path="/unassigned-channels" element={<UnassignedChannel />} />
        <Route path="/music" element={<Music />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/licensordetails" element={<LicenserDetails />} />
        <Route path="/personaldetails" element={<PersnalDetails />} />
        <Route path="/csv-upload" element={<Upload />} />
        <Route path="/bankdetails" element={<BankDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
