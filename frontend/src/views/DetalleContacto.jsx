import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getContactoById } from "../store/actions/contacto.actions";
import DatosContacto from "../components/contactos/DatosContacto";
import Historial from "../components/common/Historial";
import RelacionesContacto from "../components/contactos/RelacionesContacto";

const DetalleContacto = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getContactoById(id));
  }, [dispatch, id]);

  return (
    <div className="detailView viewContainer">
      <div className="box">
        <h2 className="title">Contacto</h2>
      </div>

      <div className="contactoHistBox">
        <DatosContacto />
        <Historial />
      </div>

      <RelacionesContacto />
    </div>
  );
};

export default DetalleContacto;
