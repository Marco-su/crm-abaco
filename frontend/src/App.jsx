import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import generateStore from "./store";

import Sidebar from "./components/navigation/Sidebar";
import Topbar from "./components/navigation/Topbar";
import Empleados from "./views/Empleados";
import Home from "./views/Home";

import("./assets/css/App.css");

const App = () => {
  return (
    <div className="App">
      <Provider store={generateStore()}>
        <Topbar />

        <div className="mainContainer">
          <Router>
            <Sidebar />

            <main>
              <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="empleados" element={<Empleados />} />
              </Routes>
            </main>
          </Router>
        </div>
      </Provider>
    </div>
  );
};

export default App;
