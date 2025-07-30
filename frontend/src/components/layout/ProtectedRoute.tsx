import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "@/utils/token";

export default function ProtectedRoute() {
  const token = getToken();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return <Outlet />;
}

export function ProtectedRouteLogin(){
    const token = getToken();
    if (token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}