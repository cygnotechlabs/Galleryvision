import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./Context/AuthContext";
import PageNotFound from "./components/PageNotFound/PageNotFound";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Root = lazy(() => import("./pages/Root"));
const Login = lazy(() => import("./components/Login/Login"));
const ChannelPreview = lazy(
  () => import("./components/Payment/View/ChannelPreview")
);
const MusicPreview = lazy(
  () => import("./components/Payment/View/MusicPreview")
);

// Channel
const ChannelView = lazy(() => import("./components/Channel/ChannelView"));
const CreateChannel = lazy(() => import("./components/Channel/CreateChannel"));
const UnassignedChannel = lazy(
  () => import("./components/Channel/UnassignedChannel")
);
const Channel = lazy(() => import("./pages/Channel"));

// Invoice
const Invoice = lazy(() => import("./pages/Invoice"));
const MusicViewInvoice = lazy(
  () => import("./components/Invoice/MusicViewInvoice")
);
const GenerateInvoice = lazy(
  () => import("./components/Invoice/GenarateInvoice")
);
const ChannelViewInvoice = lazy(
  () => import("./components/Invoice/ChannelVeiwInvoice")
);

// Licensor
const Licensor = lazy(() => import("./pages/Licensor"));
const CreateLicensor = lazy(
  () => import("./components/Licensor/CreateLicensor")
);
const EditLicensor = lazy(() => import("./components/Licensor/EditLicensor"));

// Music
const Music = lazy(() => import("./pages/Music"));
const UnassignedMusic = lazy(
  () => import("./components/Music/UnassignedMusic")
);
const MusicView = lazy(() => import("./components/Music/MusicView"));
const CreateMusic = lazy(() => import("./components/Music/CreateMusic"));

// Upload
const Upload = lazy(() => import("./pages/Upload"));
const Settings = lazy(() => import("./pages/Settings"));

// Payment
const Payment = lazy(() => import("./pages/Payment"));

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="home" element={<Root />}>
              <Route index element={<Dashboard />} />
              <Route path="invoice" element={<Invoice />} />
              <Route path="generate-invoice" element={<GenerateInvoice />} />
              <Route path="view-invoice/:id" element={<MusicViewInvoice />} />
              <Route
                path="view-invoices/:id"
                element={<ChannelViewInvoice />}
              />
              <Route path="licensor" element={<Licensor />} />
              <Route path="create-licensor" element={<CreateLicensor />} />
              <Route path="update-licensor/:id" element={<EditLicensor />} />
              <Route path="channel" element={<Channel />} />
              <Route path="create-channel" element={<CreateChannel />} />
              <Route path="channel-view/:id" element={<ChannelView />} />
              <Route
                path="unassigned-channels"
                element={<UnassignedChannel />}
              />
              <Route path="music" element={<Music />} />
              <Route path="music-view/:id" element={<MusicView />} />
              <Route path="create-music" element={<CreateMusic />} />
              <Route path="unassigned-musics" element={<UnassignedMusic />} />
              <Route path="csv-upload" element={<Upload />} />
              <Route path="payment" element={<Payment />} />
              <Route path="preview/:id" element={<ChannelPreview />} />
              <Route path="preview-muisc/:id" element={<MusicPreview />} />
              <Route path="settings" element={<Settings />} />
            </Route><Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default AppRoutes;
