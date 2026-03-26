import { createBrowserRouter, RouterProvider } from "react-router"

import Home from "./Pages/Home"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"
import UploadPage from "./Pages/UploadPage"
import Jobs from "./Pages/JobSearchPage"
import ProfilePage from "./Pages/ProfilePage"

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
    element: <UploadPage/>
  },
  {
    path: "/jobs",
    element: <Jobs/>
  },
  {
    path: "/profile",
    element: <ProfilePage/>
  }
])

function App() {

  return (
    <RouterProvider router={Router} />
  )

}

export default App
