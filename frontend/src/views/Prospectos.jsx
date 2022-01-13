import { useSelector } from "react-redux";
import { getProspectos } from "../store/actions/empresa.actions";
import EmpresasTable from "../components/empresas/Table";

const Prospectos = () => {
  const rows = useSelector((store) => store.empresas.prospectos);

  return (
    <EmpresasTable getInitial={getProspectos} rows={rows} titulo="Prospectos" />
  );
};

export default Prospectos;
