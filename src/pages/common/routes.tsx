import { UnauthorizedPage } from "./UnauthorizedPage";
import { LoginPage } from "./auth/LoginPage";
import { ProtectedRoute } from "@/components/custom/common/ProtectedRoute";
import { AdminLayout } from "@/components/layouts/admin/AdminLayout";
import { DashboardPage } from "@/pages/common/dashboards/DashboardPage";
import { UserListPage } from "@/pages/admin/users/UserListPage";
import { UserDetailPage } from "@/pages/admin/users/UserDetailPage";
import { ProfileLayout } from "@/pages/common/profile/ProfileLayout";
import { UserProfilePage } from "@/pages/common/profile/UserProfilePage";
import { AccountSettingPage } from "@/pages/common/profile/AccountSettingPage";


export const commonRoutes = [
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
                    { path: "/users/:userId", element: <UserDetailPage /> },
                    {
                        path: "/profile", element: <ProfileLayout />, children: [
                            { path: "", element: <UserProfilePage /> },
                            { path: "account-settings", element: <AccountSettingPage /> },
                        ]
                    },
                ]
            }
        ]
    }
]