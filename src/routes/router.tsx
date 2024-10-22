import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "@/pages/common/NotFound";
import { UnauthorizedPage } from "@/pages/common/UnauthorizedPage";
import { LoginPage } from "@/pages/common/auth/LoginPage";
import { adminRoutes } from "@/pages/admin/routes";
import { ForgotPasswordPage } from "@/pages/common/auth/ForgotPasswordPage";
const routes = [
    { path: "/login", element: <LoginPage /> },
    { path: "/forgot-password", element: <ForgotPasswordPage /> },
    ...adminRoutes,

    { path: "/unauthorized", element: <UnauthorizedPage /> },
    { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter(routes);

export default router;
