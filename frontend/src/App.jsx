import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import generateStore from "./store";

import Sidebar from "./components/navigation/Sidebar";
import Topbar from "./components/navigation/Topbar";
import Home from "./views/Home";
import Empleados from "./views/Empleados";
import Empresas from "./views/Empresas";
import Contactos from "./views/Contactos";
import Prospectos from "./views/Prospectos";
import Clientes from "./views/Clientes";

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
                <Route path="/empleados" element={<Empleados />} />
                <Route path="/empresas" element={<Empresas />} />
                <Route path="/prospectos" element={<Prospectos />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/contactos" element={<Contactos />} />
              </Routes>
            </main>
          </Router>
        </div>
      </Provider>
    </div>
  );
};

export default App;
