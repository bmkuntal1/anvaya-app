import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { NotFound } from "../pages/common/NotFound";
import { UnauthorizedPage } from "../pages/common/UnauthorizedPage";
import { LoginPage } from "../pages/common/auth/LoginPage";
import { AdminLayout } from "../components/layouts/admin/AdminLayout";
import { DashboardPage } from "../pages/common/DashboardPage";
import { UserListPage } from "../pages/admin/users/UserListPage";
const routes = [
    { path: "/login", element: <LoginPage /> },
    { path: "/unauthorized", element: <UnauthorizedPage /> },
    {
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
            {
                path: "/",
                element: <AdminLayout />,
                children: [
                    { path: "/", element: <DashboardPage /> },
                    { path: "/users", element: <UserListPage /> },
                ]
            }
        ]
    },
    { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter(routes);

export default router;
