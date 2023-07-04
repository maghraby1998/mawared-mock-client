import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setToken } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";

const Layout = () => {
  const dispatch = useDispatch();
  const authName = useSelector((state: RootState) => state.auth.auth?.name);

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

      {/*this line here is just for displaying other contents beside the layout*/}
      <Outlet />
      {/*this line here is just for displaying other contents beside the layout*/}
    </>
  );
};

export default Layout;
