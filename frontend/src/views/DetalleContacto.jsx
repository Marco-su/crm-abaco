import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getContactoById } from "../store/actions/contacto.actions";
import DatosContacto from "../components/contactos/DatosContacto";
import Historial from "../components/common/Historial";
import RelacionesContacto from "../components/contactos/RelacionesContacto";
import { CalendarViewDay, ViewCompact } from "@mui/icons-material/";
import { Tooltip, IconButton } from "@mui/material";

const DetalleContacto = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getContactoById(id));
  }, [dispatch, id]);

  return (
    <div className="detailView viewContainer">
      <div className="box detailTitleBox">
        <h2 className="title">Contacto</h2>

        <div>
          <Tooltip title="Vista amplia">
            <IconButton color="info" component="span">
              <ViewCompact />
            </IconButton>
          </Tooltip>

          <Tooltip title="Vista compacta">
            <IconButton color="info" component="span">
              <CalendarViewDay />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div>
        <div className="contactoHistBox">
          <DatosContacto />
          <Historial />
        </div>

        <RelacionesContacto />
      </div>
    </div>
  );
};

export default DetalleContacto;
