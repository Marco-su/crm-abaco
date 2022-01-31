import ContactoUpdateForm from "../contactos/ContatoUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { toggleUpdate } from "../../store/actions/modals.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import EmpleadoUpdateForm from "../empleados/EmpleadoUpdateForm";
import EmpresaUpdateForm from "../empresas/EmpresaUpdateForm";
import ProductoUpdateForm from "../productos/ProductoUpdateForm";
import { Button, IconButton } from "@mui/material";

const UpdateModal = (element) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((store) => store.modals.updateIsOpen);
  const updateType = useSelector((store) => store.modals.updateType);
  const isCreate = useSelector((store) => store.modals.updateType)
    .toLowerCase()
    .includes("create");

  const buttons = () => {
    return (
      <div className="button-right">
        <Button
          className="pill-button"
          variant="contained"
          onClick={() => dispatch(toggleUpdate("", null))}
        >
          Cancelar
        </Button>
        <Button
          className="ms-2 text-white pill-button"
          variant="contained"
          type="submit"
          color={isCreate ? "success" : "warning"}
        >
          {isCreate ? "Crear" : "Modificar"}
        </Button>
      </div>
    );
  };

  return (
    <div
      className={
        isOpen ? "viewport-modal viewport-modal--active" : "viewport-modal"
      }
    >
      <div className="viewport-modal__content">
        <div className="close-icon-box">
          <IconButton
            className="close-icon-button"
            color="info"
            onClick={() => dispatch(toggleUpdate("", null))}
          >
            <FontAwesomeIcon icon={faTimes} className="times-icon" />
          </IconButton>
        </div>

        <div className="info-box">
          {updateType.includes("Create") ? (
            <p className="title">Crear {updateType.split("Create")[0]}</p>
          ) : (
            <p className="title">Editar {updateType}</p>
          )}

          {(updateType === "contacto" || updateType === "contactoCreate") && (
            <ContactoUpdateForm>{buttons()}</ContactoUpdateForm>
          )}

          {(updateType === "empleado" || updateType === "empleadoCreate") && (
            <EmpleadoUpdateForm>{buttons()}</EmpleadoUpdateForm>
          )}

          {(updateType === "empresa" || updateType === "empresaCreate") && (
            <EmpresaUpdateForm>{buttons()}</EmpresaUpdateForm>
          )}

          {(updateType === "producto" || updateType === "productoCreate") && (
            <ProductoUpdateForm>{buttons()}</ProductoUpdateForm>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
