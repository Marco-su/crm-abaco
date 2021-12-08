import { useParams } from "react-router";

const DetalleEmpresa = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default DetalleEmpresa;
