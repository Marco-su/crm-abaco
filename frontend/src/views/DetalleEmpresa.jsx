import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEmpresaById } from "../store/actions/empresa.actions";
import DatosEmpresa from "../components/empresas/DatosEmpresa";
import Historial from "../components/common/Historial";

const DetalleEmpresa = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEmpresaById(id));
  }, [dispatch, id]);

  return (
    <div className="detailView">
      <div className="datosDetalle">
        <DatosEmpresa />
      </div>

      <div className="asideDetails">
        <Historial />
      </div>
    </div>
  );
};

export default DetalleEmpresa;