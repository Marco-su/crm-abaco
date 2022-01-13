import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getContactoById } from "../store/actions/contacto.actions";
import { setDetailViewType } from "../store/actions/global.actions";
import DatosContacto from "../components/contactos/DatosContacto";
import Historial from "../components/common/Historial";
import RelacionesContacto from "../components/contactos/RelacionesContacto";
import { CalendarViewDay, ViewCompact } from "@mui/icons-material/";
import { Tooltip, IconButton } from "@mui/material";
import DetailAccordion from "../components/contactos/DetailAccordion";

const DetalleContacto = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getContactoById(id));
  }, [dispatch, id]);

  const viewType = useSelector((store) => store.global.detailViewType);

  return (
    <div className="detailView viewContainer">
      <div className="box detailTitleBox">
        <div>
          <h2 className="title">Contacto</h2>
        </div>

        <div>
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
            <DatosContacto />
            <Historial />
          </div>

          <RelacionesContacto />
        </div>
      ) : null}

      {viewType === "compacta" ? <DetailAccordion /> : null}
    </div>
  );
};

export default DetalleContacto;
