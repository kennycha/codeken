import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
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
    path: "/auth",
    element: <AuthPage />,
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
