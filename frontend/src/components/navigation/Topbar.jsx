import "../../assets/css/navigation/topbar.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { closeModals } from "../../store/actions/modals.action";
import {
  NotificationsNoneOutlined,
  SettingsOutlined,
  Person,
} from "@mui/icons-material";

const Topbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuth = useSelector((store) => store.global.isAuth);

  useEffect(() => {
    dispatch(closeModals());
  }, [dispatch, location.pathname]);

  if (!isAuth) {
    return <></>;
  }

  return (
    <div id="topbar">
      <div className="topLeft">
        <p>Abaco CRM</p>
      </div>

      <div className="topRight">
        <div className="iconBox">
          <button className="iconBtn notifications">
            <NotificationsNoneOutlined />
          </button>

          <button className="iconBtn settings">
            <SettingsOutlined />
          </button>

          <button className="iconBtn profile">
            <Person />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
