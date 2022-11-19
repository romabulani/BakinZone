import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "contexts";

function PrivateRoute({ children }) {
  const { authToken } = useAuth();
  const location = useLocation();
  return authToken ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export { PrivateRoute };
