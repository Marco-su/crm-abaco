import "../../assets/css/common/detalle.css";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardBody } from "reactstrap";

const DatosProducto = () => {
  return (
    <Card>
      <CardHeader className="detalleHeader">
        <p className="smallSubtitle">Producto</p>
        <h1>{useSelector((store) => store.productos.producto.nombre)}</h1>

        <div className="productDescBox">
          <p className="smallSubtitle">Descripción</p>
          <p>{useSelector((store) => store.productos.producto.descripcion)}</p>
        </div>
      </CardHeader>
      <CardBody className="detalleBody">
        <div>
          <p className="smallSubtitle">Código</p>
          <p>{useSelector((store) => store.productos.producto.codigo)}</p>
        </div>
        <div>
          <p className="smallSubtitle">precio</p>
          <p>{useSelector((store) => store.productos.producto.precio)}$</p>
        </div>
        <div>
          <p className="smallSubtitle">Categoría</p>
          <p>{useSelector((store) => store.productos.producto.categoria)}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default DatosProducto;
