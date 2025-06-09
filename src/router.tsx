import { createHashRouter, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import CodeKenDetailPage from "./pages/CodeKenDetailPage";
import CodeKenListPage from "./pages/CodeKenListPage";
import NotFoundPage from "./pages/NotFoundPage";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <CodeKenListPage />
      </QueryParamProvider>
    ),
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
