const CardOportunidades = ({ lista }) => {
  return (
    <div className="box">
      <section>
        <h2>Oportunidades ({lista.length})</h2>
      </section>

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
