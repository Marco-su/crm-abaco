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
import Productos from "./views/Productos";
import DeleteModal from "./components/common/DeleteModal";
import UpdateModal from "./components/common/UpdateModal";

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

              <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/empleados" element={<Empleados />} />
                <Route path="/empresas" element={<Empresas />} />
                <Route path="/prospectos" element={<Prospectos />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/contactos" element={<Contactos />} />
                <Route path="/productos" element={<Productos />} />
              </Routes>
            </main>
          </div>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
