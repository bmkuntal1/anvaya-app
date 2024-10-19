import { ProtectedRoute } from "@/components/custom/common/ProtectedRoute";
import { AdminLayout } from "@/components/layouts/admin/AdminLayout";
import { DashboardPage } from "@/pages/common/dashboards/DashboardPage";
import { UserListPage } from "@/pages/admin/users/UserListPage";
import { UserDetailPage } from "@/pages/admin/users/UserDetailPage";
import { LogListPage } from "@/pages/admin/logs/LogListPage";
import { LogContentPage } from "@/pages/admin/logs/LogContentPage";
import { SettingLayout } from "@/pages/admin/settings/SettingLayout";
import { GeneralSettingPage } from "@/pages/admin/settings/GeneralSettingPage";
import { CustomListPage } from "@/pages/admin/settings/CustomListPage";
import UserProfilePage from "@/pages/common/profile/UserProfilePage";
import { ProfileLayout } from "@/pages/common/profile/ProfileLayout";
import AccountSettingPage from "@/pages/common/profile/AccountSettingPage";
import AppInfoPage from "./settings/AppInfoPage";

const commonRoutes = [
    { path: "/", element: <DashboardPage /> },
    {
        path: "/profile", element: <ProfileLayout />, children: [
            { path: "", element: <UserProfilePage /> },
            { path: "account-settings", element: <AccountSettingPage /> },
        ]

    }
]

export const adminRoutes = [
    {
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
            {
                path: "/",
                element: <AdminLayout />,
                children: [
                    ...commonRoutes,
                    { path: "/users", element: <UserListPage /> },
                    { path: "/users/:userId", element: <UserDetailPage /> },
                    { path: "/logs", element: <LogListPage /> },
                    {
                        path: "/settings", element: <SettingLayout />, children: [
                            { path: "general", element: <GeneralSettingPage /> },
                            { path: "custom-lists", element: <CustomListPage /> },
                        ]
                    },
                    { path: "/logs/:fileName", element: <LogContentPage /> },
                    { path: "/info", element: <AppInfoPage /> }
                ]
            }
        ]
    }
]