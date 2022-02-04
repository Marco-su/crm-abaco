import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, ClickAwayListener } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleDelete } from "../../store/actions/modals.action";

const CardContactos = ({ el }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="contacto-card__action">
        <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>

        {isOpen ? (
          <div className="dropdown">
            <ul>
              <li>
                <Link to={`/contactos/${el.id}`}>Ver</Link>
              </li>
              <li>
                <button>Editar</button>
              </li>
              <li>
                <button
                  onClick={() =>
                    dispatch(
                      toggleDelete(
                        "contacto",
                        el.id,
                        `${el.nombre} ${el.apellido}`,
                        true,
                        id
                      )
                    )
                  }
                >
                  Eliminar
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

export default CardContactos;
