import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate replace to="/" /> : children;
};

export default PublicRoute;
