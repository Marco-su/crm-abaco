import { changeBytesSize } from "../../helpers/changeBytesSize";

const CardArchivos = ({ lista }) => {
  return (
    <div className="box">
      <div className="box__info-title">
        <div className="title">
          <h2>Archivos ({lista.length})</h2>
        </div>
      </div>

      {lista.length > 0 ? (
        <div>
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
        </div>
      ) : (
        <div className="text-center">Subir un archivo</div>
      )}
    </div>
  );
};

export default CardArchivos;
