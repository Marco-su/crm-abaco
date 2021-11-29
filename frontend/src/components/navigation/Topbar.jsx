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
          <button className="icon">
            <NotificationsNone />
          </button>
          <button className="icon">
            <Settings />
          </button>
          <button className="icon">
            <Person />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
