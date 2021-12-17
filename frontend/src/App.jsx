import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import generateStore from "./store";

import Sidebar from "./components/navigation/Sidebar";
import Topbar from "./components/navigation/Topbar";

import DeleteModal from "./components/common/DeleteModal";
import UpdateModal from "./components/common/UpdateModal";
import DeleteManyModal from "./components/common/DeleteManyModal";
import RoutesComponent from "./routes";

import("./assets/css/App.css");

const App = () => {
  return (
    <div className="App">
      <Provider store={generateStore()}>
        <Router>
          <Topbar />

          <div className="mainContainer">
            <Sidebar />

            <main>
              <UpdateModal />
              <DeleteModal />
              <DeleteManyModal />

              <RoutesComponent />
            </main>
          </div>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
