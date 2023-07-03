import { createBrowserRouter } from "react-router-dom";
import Login from "./containers/login/Login";
import Super from "./containers/super/Super";

export default createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/super",
    element: <Super />,
  },
]);
