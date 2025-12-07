import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAppSelector((s) => s.auth.accessToken);
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;


//secure (login,ckeck token)