import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getContactoById } from "../store/actions/contacto.actions";
import DatosContacto from "../components/contactos/DatosContacto";
import Historial from "../components/common/Historial";

const DetalleContacto = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getContactoById(id));
  }, [dispatch, id]);

  return (
    <div className="detailView">
      <div className="datosDetalle">
        <DatosContacto />
      </div>

      <div className="asideDetails">
        <Historial />
      </div>
    </div>
  );
};

export default DetalleContacto;
