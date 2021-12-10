import { Card, CardHeader, CardBody } from "reactstrap";

const CardOportunidades = ({ lista }) => {
  const showBody = () => {
    return (
      <CardBody>
        {lista.map((el) => (
          <div key={el.id}></div>
        ))}
      </CardBody>
    );
  };

  return (
    <Card>
      <CardHeader className="relationTitle">
        Oportunidades ({lista.length})
      </CardHeader>

      {lista.length > 0 ? (
        showBody()
      ) : (
        <CardBody className="text-center">Crear una nueva oportunidad</CardBody>
      )}
    </Card>
  );
};

export default CardOportunidades;
