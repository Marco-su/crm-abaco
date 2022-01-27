import "../../assets/css/common/cardContactos.css";
import { Button } from "@mui/material";
import { toggleUpdate } from "../../store/actions/modals.action";
import { useDispatch } from "react-redux";

const CardContactos = ({ lista }) => {
  const dispatch = useDispatch();

  return (
    <div className="box">
      <section>
        <h2>Contactos registrados ({lista.length})</h2>
        <Button
          variant="outlined"
          onClick={() => dispatch(toggleUpdate("contactoCreate", null, true))}
        >
          Crear nuevo
        </Button>
      </section>

      <div className={lista.length > 0 ? "contactoCardGrid" : ""}>
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
          <div className="emptyButtonBox">
            <Button
              onClick={() => dispatch(toggleUpdate("contactoCreate", null))}
            >
              Crear un nuevo contacto
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardContactos;
