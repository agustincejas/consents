import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import ErrorPage from "./Error";
import ConsentList from "./consents/ConsentList";
import GiveConsent from "./consents/GiveConsent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Navigate to="/give-consent" />,
        index: true,
      },

      {
        path: "/give-consent",
        element: <GiveConsent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/consents",
        element: <ConsentList />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
