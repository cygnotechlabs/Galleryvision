import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const ChannelView = lazy(() => import("./components/Channel/ChannelView"));
const CreateChannel = lazy(() => import("./components/Channel/CreateChannel"));
const UnassignedChannel = lazy(
  () => import("./components/Channel/UnassignedChannel")
);
const Channel = lazy(() => import("./pages/Channel"));
const Invoice = lazy(() => import("./pages/Invoice"));
const Licensor = lazy(() => import("./pages/Licensor"));
const Music = lazy(() => import("./pages/Music"));
const Root = lazy(() => import("./pages/Root"));
const Settings = lazy(() => import("./pages/Settings"));
const Upload = lazy(() => import("./pages/Upload"));
const CreateLicensor = lazy(
  () => import("./components/Licensor/CreateLicensor")
);
const UnassignedMusic = lazy(
  () => import("./components/Music/UnassignedMusic")
);
const MusicView = lazy(() => import("./components/Music/MusicView"));
const CreateMusic = lazy(() => import("./components/Music/CreateMusic"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const EditLicensor = lazy(() => import("./components/Licensor/EditLicensor"));
const Login = lazy(() => import("./components/Login/Login"));
const GenerateInvoice = lazy(
  () => import("./components/Invoice/GenarateInvoice")
);
const ViewInvoice = lazy(() => import("./components/Invoice/ViewInvoice"));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Dashboard />} />
          {/* INVOICE */}
          <Route path="invoice" element={<Invoice />} />
          <Route path="generate-invoice" element={<GenerateInvoice />} />
          <Route path="view-invoice" element={<ViewInvoice />} />

          {/* LICENSOR */}
          <Route path="licensor" element={<Licensor />} />
          <Route path="create-licensor" element={<CreateLicensor />} />
          <Route path="update-licensor/:id" element={<EditLicensor />} />

          {/* CHANNEL */}
          <Route path="channel" element={<Channel />} />
          <Route path="create-channel" element={<CreateChannel />} />
          <Route path="channel-view/:id" element={<ChannelView />} />
          <Route path="unassigned-channels" element={<UnassignedChannel />} />

          {/* MUSIC */}
          <Route path="music" element={<Music />} />
          <Route path="music-view/:id" element={<MusicView />} />
          <Route path="create-music" element={<CreateMusic />} />
          <Route path="unassigned-musics" element={<UnassignedMusic />} />

          {/* UPLOAD */}
          <Route path="csv-upload" element={<Upload />} />

          {/* SETTINGS */}
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
