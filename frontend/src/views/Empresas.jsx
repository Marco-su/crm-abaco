import { useSelector } from "react-redux";
import { getEmpresas } from "../store/actions/empresa.actions";
import EmpresasTable from "../components/empresas/BaseTable";

const Empresas = () => {
  const rows = useSelector((store) => store.empresas.lista);

  return <EmpresasTable getInitial={getEmpresas} rows={rows} />;
};

export default Empresas;
