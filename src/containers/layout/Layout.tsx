import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setToken } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import UserType from "../../enums/UserType";

interface SidebarLink {
  name: string;
  link: string;
}

const sidebarLinks: SidebarLink[] = [
  {
    name: "dashboard",
    link: "/",
  },
  {
    name: "employees",
    link: "/employees",
  },
  {
    name: "offices",
    link: "/offices",
  },
  {
    name: "departments",
    link: "/departments",
  },
  {
    name: "positions",
    link: "/positions",
  },
];

const Layout = () => {
  const dispatch = useDispatch();
  const authName = useSelector((state: RootState) => state.auth.auth?.name);
  const authType = useSelector((state: RootState) => state.auth.auth?.userType);

  const handleLogOut = () => {
    dispatch(setAuth(null));
    dispatch(setToken(null));
  };

  return (
    <>
      <div className="px-[50px] bg-slate-700 h-[50px] w-full flex gap-5 items-center justify-end">
        <p className="text-white capitalize">{authName}</p>
        <button
          className="text-red-500 font-bold capitalize"
          onClick={handleLogOut}
        >
          logout
        </button>
      </div>

      {authType?.name !== UserType.SUPER ? (
        <div className="h-screen w-[100px] bg-slate-600 absolute overflow-scroll top-0">
          {sidebarLinks.map((sidebarLink, index: number) => {
            return (
              <NavLink
                key={index}
                className={({ isActive }) =>
                  isActive ? "nav-link bg-slate-500" : "nav-link"
                }
                to={sidebarLink.link}
              >
                {sidebarLink.name}
              </NavLink>
            );
          })}
        </div>
      ) : null}

      {/*this line here is just for displaying other contents beside the layout*/}
      <Outlet />
      {/*this line here is just for displaying other contents beside the layout*/}
    </>
  );
};

export default Layout;
