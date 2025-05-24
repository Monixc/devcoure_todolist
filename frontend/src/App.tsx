import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { PageLayout } from "./components/layout/PageLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout><Outlet /></PageLayout>,
    errorElement: <div>오류!</div>,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "join", element: <Join /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}