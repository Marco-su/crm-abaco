import "../../assets/css/common/detalle.css";
import { useSelector } from "react-redux";

const DatosProducto = () => {
  return (
    <div className="box">
      <section>
        <h2>Información</h2>
      </section>

      <div className="detailsContent">
        <div>
          <p>Código de producto</p>
          <p className="gray">
            {useSelector((store) => store.productos.producto.codigo)}
          </p>
        </div>
        <div>
          <p>Costo base</p>
          <p className="gray">
            {useSelector((store) => store.productos.producto.precio)} $
          </p>
        </div>
        <div>
          <p>Categoría</p>
          <p className="gray">
            {useSelector((store) => store.productos.producto.categoria)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatosProducto;
