import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckAuth = () => {
  const isAuth = useSelector((store) => store.global.isAuth);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default CheckAuth;
