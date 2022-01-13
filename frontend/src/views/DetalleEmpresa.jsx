import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmpresaById } from "../store/actions/empresa.actions";
import { setDetailViewType } from "../store/actions/global.actions";
import DatosEmpresa from "../components/empresas/DatosEmpresa";
import Historial from "../components/common/Historial";
import RelacionesEmpresas from "../components/empresas/RelacionesEmpresa";
import DetailAccordion from "../components/empresas/DetailAccordion";
import { Tooltip, IconButton } from "@mui/material";
import { CalendarViewDay, ViewCompact } from "@mui/icons-material/";

const DetalleEmpresa = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEmpresaById(id));
  }, [dispatch, id]);

  const viewType = useSelector((store) => store.global.detailViewType);

  return (
    <div className="detailView viewContainer">
      <div className="box detailTitleBox">
        <div>
          <h2 className="title">Empresa</h2>
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
            <DatosEmpresa />
            <Historial />
          </div>

          <RelacionesEmpresas />
        </div>
      ) : null}

      {viewType === "compacta" ? <DetailAccordion /> : null}
    </div>
  );
};

export default DetalleEmpresa;
