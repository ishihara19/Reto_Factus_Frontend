import {createBrowserRouter} from "react-router-dom"
import AppLayout from "../components/layout/AppLayout"
import Dashboard from "../pages/dashboard/Dashboard"
import UsersPage from "../pages/users/UsersPage"
import Login from "../pages/auth/Login"
import NotFound from "../pages/NotFound"
export const  router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "users", element: <UsersPage /> },
      
    ],
},
{
    path: "/auth/login",
    element: <Login/>
},
{
    path: "*",
    element: <NotFound/>
}
])