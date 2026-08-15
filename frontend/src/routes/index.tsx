import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom"
import AuthPage from "../pages/AuthPage"
import HomePage from "../pages/HomePage"
import RegisterForm from "../modules/auth/register/RegisterForm"
import UiHost from "../ui/UIHost"

const router = createBrowserRouter([
  {
    element: (
      <UiHost>
        <Outlet />
      </UiHost>
    ),
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
    ],
  },
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
