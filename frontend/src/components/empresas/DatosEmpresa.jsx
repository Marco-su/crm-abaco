import "../../assets/css/common/detalle.css";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardBody } from "reactstrap";

const DatosEmpresa = () => {
  return (
    <Card>
      <CardHeader className="detalleHeader">
        <p className="smallSubtitle">Empresa</p>
        <h1>{useSelector((store) => store.empresas.empresa.nombre)}</h1>
      </CardHeader>
      <CardBody className="detalleBody">
        <div>
          <p className="smallSubtitle">Tipo</p>
          <p>{useSelector((store) => store.empresas.empresa.tipo)}</p>
        </div>
        <div>
          <p className="smallSubtitle">Vertical</p>
          <p>{useSelector((store) => store.empresas.empresa.vertical)}</p>
        </div>
        <div>
          <p className="smallSubtitle">Etapa</p>
          <p>{useSelector((store) => store.empresas.empresa.etapa)}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default DatosEmpresa;
