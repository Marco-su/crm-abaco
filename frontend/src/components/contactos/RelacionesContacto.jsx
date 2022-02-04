import OportunidadesSection from "../common/OportunidadesSection";
import { useSelector } from "react-redux";

const RelacionesContacto = () => {
  return (
    <>
      {/* Hay que colocar el empleado encargado aún */}
      <OportunidadesSection
        lista={useSelector((store) => store.contactos.contacto.oportunidades)}
      />
    </>
  );
};

export default RelacionesContacto;
