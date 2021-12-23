import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
    <div className="detailView viewContainer">
      <div className="box">
        <p className="gray">Empresa</p>
        <h2 className="title">
          {useSelector((store) => store.empresas.empresa.nombre)}
        </h2>
      </div>

      <div className="contactoHistBox">
        <DatosEmpresa />
        <Historial />
      </div>

      <RelacionesEmpresas />
    </div>
  );
};

export default DetalleEmpresa;
