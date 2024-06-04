import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Root = lazy(() => import("./pages/Root"));
const ChannelView = lazy(() => import("./components/Channel/ChannelView"));
const CreateChannel = lazy(() => import("./components/Channel/CreateChannel"));
const UnassignedChannel = lazy(() => import("./components/Channel/UnassignedChannel"));
const Invoice = lazy(() => import("./pages/Invoice"));
const MusicViewInvoice = lazy(() => import("./components/Invoice/MusicViewInvoice"));
const GenerateInvoice = lazy(() => import("./components/Invoice/GenarateInvoice"));
const ChannelViewInvoice = lazy(() => import("./components/Invoice/ChannelVeiwInvoice"));
const Licensor = lazy(() => import("./pages/Licensor"));
const CreateLicensor = lazy(() => import("./components/Licensor/CreateLicensor"));
const EditLicensor = lazy(() => import("./components/Licensor/EditLicensor"));
const Music = lazy(() => import("./pages/Music"));
const UnassignedMusic = lazy(() => import("./components/Music/UnassignedMusic"));
const MusicView = lazy(() => import("./components/Music/MusicView"));
const CreateMusic = lazy(() => import("./components/Music/CreateMusic"));
const Upload = lazy(() => import("./pages/Upload"));
const Settings = lazy(() => import("./pages/Settings"));
const Payment = lazy(() => import("./pages/Payment"));

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <ProtectedRoute path="/home" element={<Root />} />
          <ProtectedRoute path="/dashboard" element={<Dashboard />} />
          <ProtectedRoute path="/channel" element={<ChannelView />} />
          <ProtectedRoute path="/create-channel" element={<CreateChannel />} />
          <ProtectedRoute path="/unassigned-channels" element={<UnassignedChannel />} />
          <ProtectedRoute path="/invoice" element={<Invoice />} />
          <ProtectedRoute path="/generate-invoice" element={<GenerateInvoice />} />
          <ProtectedRoute path="/view-invoice/:id" element={<MusicViewInvoice />} />
          <ProtectedRoute path="/view-invoices/" element={<ChannelViewInvoice />} />
          <ProtectedRoute path="/licensor" element={<Licensor />} />
          <ProtectedRoute path="/create-licensor" element={<CreateLicensor />} />
          <ProtectedRoute path="/update-licensor/" element={<EditLicensor />} />
          <ProtectedRoute path="/music" element={<Music />} />
          <ProtectedRoute path="/music-view/" element={<MusicView />} />
          <ProtectedRoute path="/create-music" element={<CreateMusic />} />
          <ProtectedRoute path="/unassigned-musics" element={<UnassignedMusic />} />
          <ProtectedRoute path="/csv-upload" element={<Upload />} />
          <ProtectedRoute path="/payment" element={<Payment />} />
          <ProtectedRoute path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default AppRoutes;
