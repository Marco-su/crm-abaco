import CardOportunidades from "../common/CardOportunidades";
import { useSelector } from "react-redux";

const RelacionesContacto = () => {
  return (
    <>
      {/* Hay que colocar el empleado encargado aún */}
      <CardOportunidades
        lista={useSelector((store) => store.contactos.contacto.oportunidades)}
      />
    </>
  );
};

export default RelacionesContacto;
