import CardContactos from "../common/CardContactos";
import CardOportunidades from "../common/CardOportunidades";
import { useSelector } from "react-redux";

const RelacionesEmpresas = () => {
  return (
    <>
      <CardContactos
        lista={useSelector((store) => store.empresas.empresa.contactos)}
      />
      <CardOportunidades
        lista={useSelector((store) => store.empresas.empresa.oportunidades)}
      />
    </>
  );
};

export default RelacionesEmpresas;
