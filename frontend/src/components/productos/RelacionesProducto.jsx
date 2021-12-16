import CardArchivos from "./CardArchivos";
import CardOportunidades from "../common/CardOportunidades";
import { useSelector } from "react-redux";

const RelacionesEmpresas = () => {
  return (
    <>
      <CardArchivos
        lista={useSelector((store) => store.productos.producto.archivos)}
      />
      <CardOportunidades
        lista={useSelector((store) => store.productos.producto.oportunidades)}
      />
    </>
  );
};

export default RelacionesEmpresas;
