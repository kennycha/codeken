import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import CodeKenDetailPage from "./pages/CodeKenDetailPage";
import CodeKenListPage from "./pages/CodeKenListPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CodeKenListPage />,
  },
  {
    path: "/:id",
    element: <CodeKenDetailPage />,
  },
  {
    path: "/admin-login",
    element: <AdminLoginPage />,
  },
  {
    path: "/not-found",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <Navigate to="/not-found" />,
  },
]);

export default router;
