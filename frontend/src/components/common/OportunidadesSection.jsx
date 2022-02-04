import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleUpdate } from "../../store/actions/modals.action";

const OportunidadesSection = ({ lista }) => {
  // STATES
  const dispatch = useDispatch();

  // RENDER
  return (
    <div className="box">
      <div className="box__info-title">
        <div className="title">
          <h2>Oportunidades creadas ({lista.length})</h2>
        </div>

        <div className="right-box">
          <Button
            className="pill-button"
            variant="outlined"
            onClick={() =>
              dispatch(toggleUpdate("oportunidadCreate", null, true))
            }
          >
            Crear nuevo
          </Button>
        </div>
      </div>

      {lista.length > 0 ? (
        <div>
          {lista.map((el) => (
            <div key={el.id}></div>
          ))}
        </div>
      ) : (
        <div className="empty-button-box">
          <Button
            className="pill-button"
            onClick={() => dispatch(toggleUpdate("oportunidadCreate", null))}
          >
            Crear un nueva oportunidad
          </Button>
        </div>
      )}
    </div>
  );
};

export default OportunidadesSection;
