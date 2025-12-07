import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface ProtectedRouteProps {
  children: React.ReactElement;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const token = useAppSelector((s) => s.auth.accessToken);
  const user = useAppSelector((s) => s.user.user);

  if (!token) return <Navigate to="/login" />; // not logged in

  if (adminOnly && user?.role !== "admin") return <Navigate to="/user" />; // only admin

  return children;
};

export default ProtectedRoute;
