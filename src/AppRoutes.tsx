import { Route, Routes } from "react-router-dom";
import ChannelView from "./components/Channel/ChannelView";
import CreateChannel from "./components/Channel/CreateChannel";
import UnassignedChannel from "./components/Channel/UnassignedChannel";
import Channel from "./pages/Channel";
import Invoice from "./pages/Invoice";
import Licensor from "./pages/Licensor";
import Music from "./pages/Music";
import Root from "./pages/Root";
import Settings from "./pages/Settings";
import Upload from "./pages/Upload";
import CreateLicensor from "./components/Licensor/CreateLicensor";
import UnassignedMusic from "./components/Music/UnassignedMusic";
import MusicView from "./components/Music/MusicView";
import CreateMusic from "./components/Music/CreateMusic";
import Dashboard from "./pages/Dashboard";
import EditLicensor from "./components/Licensor/EditLicensor";
import Login from "./components/Login/Login";

const AppRoutes: any = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/licensor" element={<Licensor />} />
        <Route path="/create-licensor" element={<CreateLicensor />} />
        <Route path="//update-licensor/:id" element={<EditLicensor />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/create-channel" element={<CreateChannel />} />
        <Route path="/channel-view/:id" element={<ChannelView />} />
        <Route path="/unassigned-channels" element={<UnassignedChannel />} />
        <Route path="/music" element={<Music />} />
        <Route path="/music-view/:id" element={<MusicView />} />
        <Route path="/create-music" element={<CreateMusic />} />
        <Route path="/unassigned-musics" element={<UnassignedMusic />} />
        <Route path="/music-view" element={<MusicView />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/csv-upload" element={<Upload />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
