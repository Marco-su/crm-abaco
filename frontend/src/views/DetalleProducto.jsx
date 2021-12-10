import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductoById } from "../store/actions/producto.actions";
import DatosProducto from "../components/productos/DatosProducto";
import RelacionesProducto from "../components/productos/RelacionesProducto";
import Historial from "../components/common/Historial";

const DetalleProducto = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductoById(id));
  }, [dispatch, id]);

  return (
    <div className="detailView">
      <DatosProducto />

      <div className="detailsBox">
        <div className="relationsDetails">
          <RelacionesProducto />
        </div>

        <div className="asideDetails">
          <Historial />
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
