import "../../assets/css/navigation/topbar.css";
import { NotificationsNone, Settings, Person } from "@mui/icons-material";

const Topbar = () => {
  return (
    <div id="topbar">
      <div className="topleft">
        <span>Abaco CRM</span>
      </div>

      <div className="topright">
        <div className="iconBox">
          <button className="iconBtn">
            <NotificationsNone />
          </button>
          <button className="iconBtn">
            <Settings />
          </button>
          <button className="iconBtn">
            <Person />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
