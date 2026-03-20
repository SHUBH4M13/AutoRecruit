import { createBrowserRouter, RouterProvider } from "react-router"

import Home from "./Pages/Home"
import Uploadww from "./Pages/UploadSection"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"
import UploadSection from "./Pages/UploadSection"

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
  {
    path: "/upload",
    element: <UploadSection/>
  }
])

function App() {

  return (
    <RouterProvider router={Router} />
  )

}

export default App
