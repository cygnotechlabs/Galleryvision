// ProtectedRoute.tsx

import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  element,
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
