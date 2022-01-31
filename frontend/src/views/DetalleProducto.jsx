import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProductoById } from "../store/actions/producto.actions";
import { setDetailViewType } from "../store/actions/global.actions";
import DatosProducto from "../components/productos/DatosProducto";
import RelacionesProducto from "../components/productos/RelacionesProducto";
import Historial from "../components/common/Historial";
import { Tooltip, IconButton } from "@mui/material";
import { CalendarViewDay, ViewCompact } from "@mui/icons-material/";
import DetailAccordion from "../components/productos/DetailAccordion";

const DetalleProducto = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductoById(id));
  }, [dispatch, id]);

  const viewType = useSelector((store) => store.global.detailViewType);

  return (
    <div className="detailView view-container">
      <div className="box detailTitleBox">
        <div className="box__main-title">
          <div className="title">
            <h2>Producto</h2>
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
            <DatosProducto />
            <Historial />
          </div>

          <RelacionesProducto />
        </div>
      ) : null}

      {viewType === "compacta" ? <DetailAccordion /> : null}
    </div>
  );
};

export default DetalleProducto;
