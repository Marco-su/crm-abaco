import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEmpleadoById } from "../store/actions/empleado.actions";
import DatosEmpleado from "../components/empleados/DatosEmpleado";
import Historial from "../components/common/Historial";
import RelacionesEmpleados from "../components/empleados/RelacionesEmpleado";

const DetalleEmpleado = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEmpleadoById(id));
  }, [dispatch, id]);

  return (
    <div className="detailView">
      <div className="box">
        <h2 className="title">Empleado</h2>
      </div>

      <div className="contactoHistBox">
        <DatosEmpleado />
        <Historial />
      </div>

      <RelacionesEmpleados />
    </div>
  );
};

export default DetalleEmpleado;
