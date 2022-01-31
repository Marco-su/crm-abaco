import "../../assets/css/common/detalle.css";
import { useSelector } from "react-redux";

const DatosProducto = () => {
  return (
    <div className="box">
      <div className="box__main-title">
        <div className="title">
          <h2>Información</h2>
        </div>
      </div>

      <div className="detailsContent">
        <div>
          <p>Código de producto</p>
          <p className="text-gray">
            {useSelector((store) => store.productos.producto.codigo)}
          </p>
        </div>
        <div>
          <p>Costo base</p>
          <p className="text-gray">
            {useSelector((store) => store.productos.producto.precio)} $
          </p>
        </div>
        <div>
          <p>Categoría</p>
          <p className="text-gray">
            {useSelector((store) => store.productos.producto.categoria)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatosProducto;
