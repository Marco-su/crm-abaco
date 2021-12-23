import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import generateStore from "./store";

import Sidebar from "./components/navigation/Sidebar";
import Topbar from "./components/navigation/Topbar";
import Main from "./components/common/Main";

import("./assets/css/App.css");

const App = () => {
  return (
    <div className="App">
      <Provider store={generateStore()}>
        <Router>
          <Topbar />

          <div className="mainContainer">
            <Sidebar />

            <Main />
          </div>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
