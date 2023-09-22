import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import OnBoarding from "./pages/onboarding/OnBoarding";
import ContextProvider from "./context/TaskBoardContext";
import Toaster from "react-hot-toast";
// import ErrorPage from "./pages/errorPage/errorPage";
import Page404 from "./pages/404/Page404";
import ForgottenPassword from "./pages/forgottenPassword/ForgottenPassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgottenPassword",
      element: <ForgottenPassword />,
    },
    {
      path: "/onboarding",
      element: <OnBoarding />,
      errorElement: <Page404 />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <Page404 />,
    },
    {
      path: "*",
      element: <Page404 />,
      errorElement: <Page404 />,
    },
  ]);

  return (
    <div className="App">
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </div>
  );
}

export default App;
