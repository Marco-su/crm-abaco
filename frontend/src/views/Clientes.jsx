import { useSelector } from "react-redux";
import { getClientes } from "../store/actions/empresa.actions";
import EmpresasTable from "../components/empresas/List";

const Clientes = () => {
  const rows = useSelector((store) => store.empresas.clientes);

  return (
    <EmpresasTable getInitial={getClientes} rows={rows} titulo="Clientes" />
  );
};

export default Clientes;
