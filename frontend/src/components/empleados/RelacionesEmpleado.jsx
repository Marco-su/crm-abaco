import ContactosSection from "../common/ContactosSection";
import OportunidadesSection from "../common/OportunidadesSection";
import { useSelector } from "react-redux";

const RelacionesEmpleados = () => {
  return (
    <>
      <ContactosSection
        lista={useSelector((store) => store.empleados.empleado.contactos)}
      />
      <OportunidadesSection
        lista={useSelector((store) => store.empleados.empleado.oportunidades)}
      />
    </>
  );
};

export default RelacionesEmpleados;
