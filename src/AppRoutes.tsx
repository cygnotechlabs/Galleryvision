import { Route, Routes } from "react-router-dom";
import LicenserDetails from "./components/Licensor/LicenserDetails";
import Invoice from "./pages/Invoice";
import Licensor from "./pages/Licensor";
import Root from "./pages/Root";
import Upload from "./pages/Upload";
import PersnalDetails from "./components/Licensor/PersonalDetails";

type Props = {};

const AppRoutes: any = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/licensor" element={<Licensor />} />
        <Route path="/licensordetails" element={<LicenserDetails />} />
        <Route path="/personaldetails" element={<PersnalDetails />} />
        <Route path="/csv-upload" element={<Upload />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
