import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthPage from "../pages/AuthPage"
import HomePage from "../pages/HomePage"
const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
