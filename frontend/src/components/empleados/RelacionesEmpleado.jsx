import CardContactos from "../common/CardContactos";
import CardOportunidades from "../common/CardOportunidades";
import { useSelector } from "react-redux";

const RelacionesEmpleados = () => {
  return (
    <>
      <CardContactos
        lista={useSelector((store) => store.empleados.empleado.contactos)}
      />
      <CardOportunidades
        lista={useSelector((store) => store.empleados.empleado.oportunidades)}
      />
    </>
  );
};

export default RelacionesEmpleados;
