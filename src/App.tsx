import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./containers/login/Login";
import Super from "./containers/super/Super";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Layout from "./containers/layout/Layout";
import Company from "./containers/super/Company";
import Employees from "./containers/employees";
import OfficesList from "./containers/offices/OfficesList";
const queryClient = new QueryClient();

function App() {
  const auth = useSelector((state: RootState) => state.auth.auth);

  const token = useSelector((state: RootState) => state.auth.token);

  const router = createBrowserRouter(
    createRoutesFromElements(
      !token ? (
        <Route path="/">
          <Route index element={<Navigate to={"/login"} />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      ) : auth?.userType?.name === "super" ? (
        <Route
          path="/"
          element={
            <>
              <Layout />
              <Navigate to={"/super"} />
            </>
          }
        >
          <Route path="super" element={<Super />} />
          <Route path="company/:id" element={<Company />} />
        </Route>
      ) : (
        <Route path="/" element={<Layout />}>
          <Route index element={<div>dashboard</div>} />
          <Route path="employees" element={<Employees />} />
          <Route path="offices" element={<OfficesList />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Route>
      )
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
