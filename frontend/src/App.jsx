import { createBrowserRouter, RouterProvider } from "react-router"

import Home from "./Pages/Home"
import Uploadww from "./Upload"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/signup",
    element: <SignupPage/>
  },
])

function App() {

  return (
    <RouterProvider router={Router} />
  )

}

export default App
