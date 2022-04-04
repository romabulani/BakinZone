import { Navigate } from "react-router-dom";
import { useAuth } from "contexts";

function PrivateRoute({ children }) {
  const { authToken } = useAuth();
  return authToken ? children : <Navigate to="/login" />;
}

export { PrivateRoute };
