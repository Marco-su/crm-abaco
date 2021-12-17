import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
      <div className="box">
        <p className="gray">Producto</p>
        <h2 className="title mb-3">
          {useSelector((store) => store.productos.producto.nombre)}
        </h2>

        <p className="gray">Descripción</p>
        <p>{useSelector((store) => store.productos.producto.descripcion)}</p>
      </div>

      <div className="contactoHistBox">
        <DatosProducto />
        <Historial />
      </div>

      <RelacionesProducto />
    </div>
  );
};

export default DetalleProducto;
