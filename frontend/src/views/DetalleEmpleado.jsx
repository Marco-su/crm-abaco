import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEmpleadoById } from "../store/actions/empleado.actions";
import DatosEmpleado from "../components/empleados/DatosEmpleado";
import Historial from "../components/common/Historial";

const DetalleEmpleado = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEmpleadoById(id));
  }, [dispatch, id]);

  return (
    <div className="detailView">
      <div className="datosDetalle">
        <DatosEmpleado />
      </div>

      <div className="asideDetails">
        <Historial />
      </div>
    </div>
  );
};

export default DetalleEmpleado;
