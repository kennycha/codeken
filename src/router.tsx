import { createBrowserRouter } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import CodeKenDetailPage from "./pages/CodeKenDetailPage";
import CodeKenListPage from "./pages/CodeKenListPage";

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
]);

export default router;
