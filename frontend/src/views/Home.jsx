import Login from "../components/home/Login";
import { useSelector } from "react-redux";

const Home = () => {
  const isAuth = useSelector((store) => store.global.isAuth);

  if (!isAuth) {
    return <Login />;
  }

  return <></>;
};

export default Home;
