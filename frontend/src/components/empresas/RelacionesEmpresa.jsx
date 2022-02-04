import ContactosSection from "../common/ContactosSection";
import OportunidadesSection from "../common/OportunidadesSection";
import { useSelector } from "react-redux";

const RelacionesEmpresas = () => {
  return (
    <>
      <ContactosSection
        lista={useSelector((store) => store.empresas.empresa.contactos)}
      />
      <OportunidadesSection
        lista={useSelector((store) => store.empresas.empresa.oportunidades)}
      />
    </>
  );
};

export default RelacionesEmpresas;
