import { Link } from "react-router-dom";
import { Button, Avatar } from "@mui/material";

import { toggleUpdate } from "../../store/actions/modals.action";
import { useDispatch } from "react-redux";
import { apiBase } from "../../constants/baseUrls";
import ClickAwayContactos from "./ClickAwayContactos";

const ContactosSection = ({ lista }) => {
  // STATES
  const dispatch = useDispatch();
  const newLista = lista.filter((el) => el.status === "activo");

  // FUNCTIONS
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  // RETURN
  return (
    <div className="box">
      <div className="box__info-title">
        <div className="title">
          <h2>Contactos registrados ({newLista.length})</h2>
        </div>

        <div className="right-box">
          <Button
            className="pill-button"
            variant="outlined"
            onClick={() => dispatch(toggleUpdate("contactoCreate", null, true))}
          >
            Crear nuevo
          </Button>
        </div>
      </div>

      <div className={newLista.length > 0 ? "contacto-card-grid" : ""}>
        {newLista.length > 0 ? (
          <>
            {newLista.map((el) => (
              <div key={el.id} className="contacto-card">
                <div className="contacto-card__avatar">
                  <Avatar
                    {...stringAvatar(`${el.nombre} ${el.apellido}`)}
                    alt={`${el.nombre} ${el.apellido}`}
                    src={`${apiBase}/uploads/${el.imgStorageName}`}
                  />
                </div>

                <div className="contacto-card__info">
                  <Link to={`/contactos/${el.id}`}>
                    <h3>
                      {el.nombre} {el.apellido}
                    </h3>
                  </Link>

                  <div className="detalleBody">
                    <p>
                      Cargo:{" "}
                      {el.cargo ? (
                        <span className="detail">{el.cargo}</span>
                      ) : (
                        <span className="text-gray">No especificado</span>
                      )}
                    </p>

                    <p>
                      Correo electrónico:{" "}
                      {el.correo ? (
                        <span className="detail">{el.correo}</span>
                      ) : (
                        <span className="text-gray">No especificado</span>
                      )}
                    </p>
                  </div>
                </div>

                <ClickAwayContactos el={el} dispatch={dispatch} />
              </div>
            ))}
          </>
        ) : (
          <div className="empty-button-box">
            <Button
              className="pill-button"
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

export default ContactosSection;
