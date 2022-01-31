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
    <div className="topbar">
      <div className="topbar__left">
        <button
          className="icon-btn icon-btn--purple"
          onClick={() => {
            dispatch(toggleMenu());
          }}
        >
          <Menu />
        </button>

        <p>Abaco CRM</p>
      </div>

      <div className="topbar__right">
        <button className="icon-btn icon-btn--purple">
          <NotificationsNoneOutlined />
        </button>

        <button className="icon-btn icon-btn--orange">
          <SettingsOutlined />
        </button>

        <button className="icon-btn icon-btn--blue">
          <Person />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
