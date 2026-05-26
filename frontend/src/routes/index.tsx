import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
const router = createBrowserRouter([
  {
    path:'/login',
    element:<AuthPage/>,
  }
])

const AppRouter = () => {
  return <RouterProvider router={router}/>
}

export default AppRouter