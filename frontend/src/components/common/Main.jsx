import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import DeleteManyModal from "./DeleteManyModal";
import RoutesComponent from "../../routes";
import { useSelector } from "react-redux";

const Main = () => {
  const isAuth = useSelector((store) => store.global.isAuth);

  return (
    <main className={isAuth ? "" : "fullWindow"}>
      <UpdateModal />
      <DeleteModal />
      <DeleteManyModal />

      <RoutesComponent />
    </main>
  );
};

export default Main;
