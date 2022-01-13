import { useSelector } from "react-redux";
import { getClientes } from "../store/actions/empresa.actions";
import EmpresasTable from "../components/empresas/Table";

const Clientes = () => {
  const rows = useSelector((store) => store.empresas.clientes);

  return (
    <EmpresasTable getInitial={getClientes} rows={rows} titulo="Clientes" />
  );
};

export default Clientes;
