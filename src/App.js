import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Signup from "./pages/signup/Signup"
import Login from "./pages/login/Login"
import OnBoarding from "./pages/onboarding/OnBoarding";

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
      path: "/onboarding",
      element: <OnBoarding />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
