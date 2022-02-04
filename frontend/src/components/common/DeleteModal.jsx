import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleDelete } from "../../store/actions/modals.action";
import { disableContacto } from "../../store/actions/contacto.actions";
import { disableEmpleado } from "../../store/actions/empleado.actions";
import { disableProducto } from "../../store/actions/producto.actions";
import { disableEmpresa } from "../../store/actions/empresa.actions";
import { Button, IconButton } from "@mui/material";

const DeleteModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isOpen = useSelector((store) => store.modals.deleteIsOpen);
  const deleteType = useSelector((store) => store.modals.deleteType);
  const isDeleteDetail = useSelector((store) => store.modals.isDeleteDetail);
  const idMain = useSelector((store) => store.modals.id);
  const idSecondary = useSelector((store) => store.modals.idSecondary);
  const name = useSelector((store) => store.modals.deleteName);

  const deleteConfirmed = () => {
    switch (deleteType) {
      case "contacto":
        dispatch(disableContacto(idMain, idSecondary, isDeleteDetail));
        break;

      case "empleado":
        dispatch(disableEmpleado(idMain));
        break;

      case "empresa":
        dispatch(disableEmpresa(idMain, location.pathname));
        break;

      case "producto":
        dispatch(disableProducto(idMain));
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
      id="deleteModal"
    >
      <div className="viewport-modal__content">
        <div className="close-icon-box">
          <IconButton
            className="close-icon-button"
            color="info"
            onClick={() => dispatch(toggleDelete("", null, ""))}
          >
            <FontAwesomeIcon icon={faTimes} className="times-icon" />
          </IconButton>
        </div>

        <div className="info-box">
          <div>
            <p className="title">
              Eliminar {deleteType} "{name}"?
            </p>
            <p>Estás seguro de que quieres eliminar este elemento?</p>
          </div>

          <div className="delete-message">
            <p className="delete-title">Advertencia</p>

            {deleteType === "contacto" && (
              <p>
                Si eliminas este contacto ya no será visible en la empresa a la
                que pertenece y solo será accesible desde la sección
                "Inactivos".
              </p>
            )}

            {deleteType === "empleado" && (
              <p>
                Si eliminas a este empleado se le restringirá el acceso a la
                plataforma y a sus funcionalidades. Además solo será visible
                desde la sección "Inactivos".
              </p>
            )}

            {deleteType === "empresa" && (
              <p>
                Si eliminas esta empresa no se podrá iniciar ningun proceso de
                negociación con la misma y solo será accesible desde la sección
                "Inactivos".
              </p>
            )}

            {deleteType === "producto" && (
              <p>
                Si eliminas este producto no podrá ser ofertado desde la
                plataforma a ninguna empresa. Además, si se quieren acceder a
                sus datos y estadisticas se tendrá que hacer a través de la
                sección "Inactivos".
              </p>
            )}
          </div>

          <div className="button-right">
            <Button
              className="pill-button"
              variant="contained"
              onClick={() => dispatch(toggleDelete("", null, ""))}
            >
              Cancelar
            </Button>
            <Button
              className="ms-2 pill-button"
              variant="contained"
              color="error"
              onClick={deleteConfirmed}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
