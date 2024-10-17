import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "@/pages/common/NotFound";
import { commonRoutes } from "@/pages/common/routes";

const routes = [
    ...commonRoutes,
    { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter(routes);

export default router;
