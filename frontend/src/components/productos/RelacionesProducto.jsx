import CardArchivos from "./CardArchivos";
import CardOportunidades from "../common/CardOportunidades";
import { useSelector } from "react-redux";

const RelacionesEmpresas = () => {
  return (
    <>
      <CardArchivos
        lista={useSelector((store) => store.productos.producto.archivos)}
      />
      <CardOportunidades lista={[]} />
    </>
  );
};

export default RelacionesEmpresas;
