import { Card, CardHeader, CardBody } from "reactstrap";

const CardContactos = ({ lista }) => {
  const showBody = () => {
    return (
      <CardBody>
        {lista.map((el) => (
          <div key={el.id} className="detalleBody">
            <div>
              <p className="smallSubtitle">Cargo</p>
              <p>{el.cargo}</p>
            </div>
            <div>
              <p className="smallSubtitle">Correo</p>
              <p>{el.correo}</p>
            </div>
          </div>
        ))}
      </CardBody>
    );
  };

  return (
    <Card>
      <CardHeader className="relationTitle">
        Contactos ({lista.length})
      </CardHeader>

      {lista.length > 0 ? (
        showBody()
      ) : (
        <CardBody className="text-center">Crear un nuevo contacto</CardBody>
      )}
    </Card>
  );
};

export default CardContactos;
