import { Routes, Route } from "react-router-dom";
import CheckAuth from "./CheckAuth";

import Home from "../views/Home";
import Empleados from "../views/Empleados";
import Empresas from "../views/Empresas";
import Contactos from "../views/Contactos";
import Prospectos from "../views/Prospectos";
import Clientes from "../views/Clientes";
import Productos from "../views/Productos";
import Oportunidades from "../views/Oportunidades";
import DetalleEmpresa from "../views/DetalleEmpresa";
import DetalleEmpleado from "../views/DetalleEmpleado";
import DetalleContacto from "../views/DetalleContacto";
import DetalleProducto from "../views/DetalleProducto";
import Correo from "../views/Correo";
import AdminProspectos from "../views/AdminProspectos";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />

      <Route element={<CheckAuth />}>
        <Route path="/empleados/:id" element={<DetalleEmpleado />} />
        <Route path="/empleados" element={<Empleados />} />

        <Route path="/empresas/:id" element={<DetalleEmpresa />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/prospectos" element={<Prospectos />} />
        <Route path="/clientes" element={<Clientes />} />

        <Route path="/contactos/:id" element={<DetalleContacto />} />
        <Route path="/contactos" element={<Contactos />} />

        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/productos" element={<Productos />} />

        <Route path="/oportunidades/:id" element={<DetalleProducto />} />
        <Route path="/oportunidades" element={<Oportunidades />} />

        <Route
          path="/administracion/prospectos"
          element={<AdminProspectos />}
        />

        <Route path="/correo" element={<Correo />} />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
