import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import ErrorPage from "./Error";
import ConsentList from "./consents/ConsentList";
import GiveConsent from "./consents/GiveConsent";
import { PATH_CONSENTS, PATH_GIVE_CONSENT } from "./constants";

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
        path: PATH_GIVE_CONSENT,
        element: <GiveConsent />,
        errorElement: <ErrorPage />,
      },
      {
        path: PATH_CONSENTS,
        element: <ConsentList />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
