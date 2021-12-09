import "../../assets/css/common/detalle.css";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardBody } from "reactstrap";

const DatosContacto = () => {
  return (
    <Card>
      <CardHeader className="detalleHeader">
        <p className="smallSubtitle">Contacto</p>
        <h1>
          {useSelector((store) => store.contactos.contacto.nombre)}{" "}
          {useSelector((store) => store.contactos.contacto.apellido)}
        </h1>
      </CardHeader>
      <CardBody className="detalleBody">
        <div>
          <p className="smallSubtitle">Cargo</p>
          <p>{useSelector((store) => store.contactos.contacto.cargo)}</p>
        </div>
        <div>
          <p className="smallSubtitle">Correo</p>
          <p>{useSelector((store) => store.contactos.contacto.correo)}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default DatosContacto;
