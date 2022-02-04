import CardArchivos from "./CardArchivos";
import OportunidadesSection from "../common/OportunidadesSection";
import { useSelector } from "react-redux";

const RelacionesEmpresas = () => {
  return (
    <>
      <CardArchivos
        lista={useSelector((store) => store.productos.producto.archivos)}
      />
      <OportunidadesSection
        lista={useSelector((store) => store.productos.producto.oportunidades)}
      />
    </>
  );
};

export default RelacionesEmpresas;
