import "../../assets/css/common/detalle.css";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardBody } from "reactstrap";

const DatosEmpleado = () => {
  const telf = useSelector((store) =>
    store.empleados.empleado.telefonos.find((el) => el.tipo === "telefono")
  );
  const movil = useSelector((store) =>
    store.empleados.empleado.telefonos.find((el) => el.tipo === "movil")
  );

  return (
    <Card>
      <CardHeader className="detalleHeader">
        <p className="smallSubtitle">Empleado</p>
        <h1>
          {useSelector((store) => store.empleados.empleado.nombre)}{" "}
          {useSelector((store) => store.empleados.empleado.apellido)}
        </h1>
      </CardHeader>
      <CardBody className="detalleBody">
        <div>
          <p className="smallSubtitle">Cargo</p>
          <p>{useSelector((store) => store.empleados.empleado.cargo)}</p>
        </div>
        <div>
          <p className="smallSubtitle">Correo</p>
          <p>{useSelector((store) => store.empleados.empleado.correo)}</p>
        </div>
        <div>
          <p className="smallSubtitle">Telefono</p>
          {telf ? (
            <p>
              +{telf.codPais}
              {telf.numero}
            </p>
          ) : null}
        </div>
        <div>
          <p className="smallSubtitle">Movil</p>
          {movil ? (
            <p>
              +{movil.codPais}
              {movil.numero}
            </p>
          ) : null}
        </div>
      </CardBody>
    </Card>
  );
};

export default DatosEmpleado;
