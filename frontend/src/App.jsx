import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./components/navigation/Sidebar";
import Topbar from "./components/navigation/Topbar";
import Main from "./components/common/Main";

import "./assets/css/App.css";
import "./assets/scss/App.scss";

// TABLES CSS
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Topbar />

        <div className="main-container">
          <Sidebar />

          <Main />
        </div>
      </Router>
    </div>
  );
};

export default App;
