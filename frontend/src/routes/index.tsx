import {createBrowserRouter} from "react-router-dom"
import AppLayout from "../components/layout/AppLayout"
import Dashboard from "../pages/dashboard/Dashboard"
import UsersPage from "../pages/users/UsersPage"
import Login from "../pages/auth/Login"
import NotFound from "../pages/NotFound"
import ProtectedRoute from "@/components/layout/ProtectedRoute"
import {ProtectedRouteLogin} from "@/components/layout/ProtectedRoute"
import ProfilePage from "@/pages/profile/ProfilePage"
export const router = createBrowserRouter([
  {
    element: <ProtectedRouteLogin />, // Ruta protegida
    children: [
    {
    path: "/auth/login",
    element: <Login />,
  },
],
},
  {
    element: <ProtectedRoute />, // Ruta protegida
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "users", element: <UsersPage /> },
          { path: "profile", element:<ProfilePage/>},
          // otras rutas protegidas aquí
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);