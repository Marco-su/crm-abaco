import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductoById } from "../store/actions/producto.actions";
import DatosProducto from "../components/productos/DatosProducto";
import Historial from "../components/common/Historial";

const DetalleProducto = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductoById(id));
  }, [dispatch, id]);

  return (
    <div className="detailView">
      <div className="datosDetalle">
        <DatosProducto />
      </div>

      <div className="asideDetails">
        <Historial />
      </div>
    </div>
  );
};

export default DetalleProducto;
