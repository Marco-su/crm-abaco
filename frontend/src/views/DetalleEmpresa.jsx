import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEmpresaById } from "../store/actions/empresa.actions";
import DatosEmpresa from "../components/empresas/DatosEmpresa";
import Historial from "../components/common/Historial";
import RelacionesEmpresas from "../components/empresas/RelacionesEmpresa";

const DetalleEmpresa = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEmpresaById(id));
  }, [dispatch, id]);

  return (
    <div className="detailView">
      <DatosEmpresa />

      <div className="detailsBox">
        <div className="relationsDetails">
          <RelacionesEmpresas />
        </div>

        <div className="asideDetails">
          <Historial />
        </div>
      </div>
    </div>
  );
};

export default DetalleEmpresa;
