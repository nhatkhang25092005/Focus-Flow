import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthPage from "../pages/AuthPage"
import HomePage from "../pages/HomePage"
import RegisterForm from "../modules/auth/register/RegisterForm"
const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  }
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
