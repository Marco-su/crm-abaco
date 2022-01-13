import "../../assets/css/common/cardContactos.css";

const CardContactos = ({ lista }) => {
  return (
    <div className="box">
      <section>
        <h2>Contactos ({lista.length})</h2>
      </section>

      <div className="contactoCardGrid">
        {lista.length > 0 ? (
          <div className="contactoCard">
            {lista.map((el) => (
              <div key={el.id}>
                <div className="cardHeader">
                  <h3>
                    {el.nombre} {el.apellido}
                  </h3>
                </div>

                <div className="detalleBody">
                  <div>
                    <p className="gray">Cargo</p>
                    <p>{el.cargo}</p>
                  </div>

                  <div>
                    <p className="gray">Correo electrónico</p>
                    <p>{el.correo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Crear un nuevo contacto</div>
        )}
      </div>
    </div>
  );
};

export default CardContactos;
