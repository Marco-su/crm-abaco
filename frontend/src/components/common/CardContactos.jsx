const CardContactos = ({ lista }) => {
  return (
    <div className="box">
      <section>
        <h2>Contactos ({lista.length})</h2>
      </section>

      {lista.length > 0 ? (
        <div>
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
        </div>
      ) : (
        <div className="text-center">Crear un nuevo contacto</div>
      )}
    </div>
  );
};

export default CardContactos;
