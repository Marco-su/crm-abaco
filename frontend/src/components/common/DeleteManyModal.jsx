import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleDeleteMany } from "../../store/actions/modals.action";
import { disableManyContactos } from "../../store/actions/contacto.actions";
import { disableManyEmpleados } from "../../store/actions/empleado.actions";
import { disableManyProductos } from "../../store/actions/producto.actions";
import { disableManyEmpresas } from "../../store/actions/empresa.actions";
import { Button, IconButton } from "@mui/material";

const DeleteManyModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isOpen = useSelector((store) => store.modals.deleteManyIsOpen);
  const deleteType = useSelector((store) => store.modals.deleteType);
  const ids = useSelector((store) => store.modals.arrayIds);

  const deleteConfirmed = (e) => {
    switch (deleteType) {
      case "contacto":
        dispatch(disableManyContactos(ids));
        break;
      case "empleado":
        dispatch(disableManyEmpleados(ids));
        break;
      case "empresa":
        dispatch(disableManyEmpresas(ids, location.pathname));
        break;
      case "producto":
        dispatch(disableManyProductos(ids));
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={
        isOpen ? "viewport-modal viewport-modal--active" : "viewport-modal"
      }
      id="deleteManyModal"
    >
      <div className="viewport-modal__content">
        <div className="close-icon-box">
          <IconButton
            className="close-icon-button"
            color="info"
            onClick={() => dispatch(toggleDeleteMany("", []))}
          >
            <FontAwesomeIcon icon={faTimes} className="times-icon" />
          </IconButton>
        </div>

        <div className="info-box">
          <p className="title">
            {ids.length > 1
              ? `Eliminar ${ids.length} ${deleteType}s?`
              : "Eliminar el elemento seleccionado?"}
          </p>

          <div className="delete-message">
            <p className="delete-title">Advertencia</p>

            <p>
              Si eliminas uno o varios elementos solo serán accecibles desde la
              sección "Inactivos", además no podrán ser asignados a ningun
              proceso de negociación.
            </p>
          </div>

          <div className="button-right">
            <Button
              className="pill-button"
              variant="contained"
              onClick={() => dispatch(toggleDeleteMany("", {}))}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={deleteConfirmed}
              className="ms-2 pill-button"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteManyModal;
