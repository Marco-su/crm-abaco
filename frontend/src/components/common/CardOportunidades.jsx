const CardOportunidades = ({ lista }) => {
  return (
    <div className="box">
      <div className="box__info-title">
        <div className="title">
          <h2>Oportunidades ({lista.length})</h2>
        </div>
      </div>

      {lista.length > 0 ? (
        <div>
          {lista.map((el) => (
            <div key={el.id}></div>
          ))}
        </div>
      ) : (
        <div className="text-center">Crear una nueva oportunidad</div>
      )}
    </div>
  );
};

export default CardOportunidades;
