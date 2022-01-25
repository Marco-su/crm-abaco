import { useSelector } from "react-redux";
import { getEmpresas } from "../store/actions/empresa.actions";
import EmpresasTable from "../components/empresas/List";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Empresas = () => {
  const rows = useSelector((store) => store.empresas.lista);

  return (
    <EmpresasTable getInitial={getEmpresas} rows={rows} titulo="Empresas" />
  );
};

export default Empresas;
