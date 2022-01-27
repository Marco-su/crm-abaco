import "../../assets/css/navigation/topbar.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleMenu } from "../../store/actions/global.actions";
import {
  NotificationsNoneOutlined,
  SettingsOutlined,
  Person,
  Menu,
} from "@mui/icons-material";

const Topbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.global.isAuth);

  // RENDER
  if (!isAuth) {
    return <></>;
  }

  return (
    <div id="topbar">
      <div className="topLeft">
        <button
          className="iconBtn notifications"
          onClick={() => {
            dispatch(toggleMenu());
          }}
        >
          <Menu />
        </button>

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
