import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmpleadoById } from "../store/actions/empleado.actions";
import { setDetailViewType } from "../store/actions/global.actions";
import DatosEmpleado from "../components/empleados/DatosEmpleado";
import { CalendarViewDay, ViewCompact } from "@mui/icons-material/";
import Historial from "../components/common/Historial";
import { Tooltip, IconButton } from "@mui/material";
import RelacionesEmpleados from "../components/empleados/RelacionesEmpleado";
import DetailAccordion from "../components/empleados/DetailAccordion";

const DetalleEmpleado = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const viewType = useSelector((store) => store.global.detailViewType);

  useEffect(() => {
    dispatch(getEmpleadoById(id));
  }, [dispatch, id]);

  return (
    <div className="detailView view-container">
      <div className="box detailTitleBox">
        <div className="box__main-title">
          <div className="title">
            <h2>Empleado</h2>
          </div>
        </div>

        <div className="right-box">
          <Tooltip title="Vista amplia">
            <IconButton
              color={viewType === "amplia" ? "primary" : "info"}
              component="span"
              onClick={() => dispatch(setDetailViewType("amplia"))}
            >
              <ViewCompact />
            </IconButton>
          </Tooltip>

          <Tooltip title="Vista de editor">
            <IconButton
              color={viewType === "compacta" ? "primary" : "info"}
              component="span"
              onClick={() => dispatch(setDetailViewType("compacta"))}
            >
              <CalendarViewDay />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {viewType === "amplia" ? (
        <div>
          <div className="contactoHistBox">
            <DatosEmpleado />
            <Historial />
          </div>

          <RelacionesEmpleados />
        </div>
      ) : null}

      {viewType === "compacta" ? <DetailAccordion /> : null}
    </div>
  );
};

export default DetalleEmpleado;
