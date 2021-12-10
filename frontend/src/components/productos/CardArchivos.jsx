import { Card, CardHeader, CardBody } from "reactstrap";
import { changeBytesSize } from "../../helpers/changeBytesSize";

const CardArchivos = ({ lista }) => {
  const showBody = () => {
    return (
      <CardBody>
        {lista.map((el) => (
          <div key={el.id} className="detalleBody">
            <div>
              <p className="smallSubtitle">Nombre</p>
              <p>{el.nombre}</p>
            </div>
            <div>
              <p className="smallSubtitle">Tipo</p>
              <p>{el.tipo}</p>
            </div>
            <div>
              <p className="smallSubtitle">Tamaño</p>
              <p>{changeBytesSize(el.size)}</p>
            </div>
          </div>
        ))}
      </CardBody>
    );
  };

  return (
    <Card>
      <CardHeader className="relationTitle">
        Archivos ({lista.length})
      </CardHeader>

      {lista.length > 0 ? (
        showBody()
      ) : (
        <CardBody className="text-center">Subir un archivo</CardBody>
      )}
    </Card>
  );
};

export default CardArchivos;
