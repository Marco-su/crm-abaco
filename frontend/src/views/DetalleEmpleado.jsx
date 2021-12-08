import { useParams } from "react-router";

const DetalleEmpleado = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default DetalleEmpleado;
