import "../../assets/css/common/modals.css";

import ContactoUpdateForm from "../contactos/ContatoUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { toggleUpdate } from "../../store/actions/modals.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import EmpleadoUpdateForm from "../empleados/EmpleadoUpdateForm";
import EmpresaUpdateForm from "../empresas/EmpresaUpdateForm";
import ProductoUpdateForm from "../productos/ProductoUpdateForm";
import { Button } from "@mui/material";

const UpdateModal = (element) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((store) => store.modals.updateIsOpen);
  const updateType = useSelector((store) => store.modals.updateType);
  const isCreate = useSelector((store) => store.modals.updateType)
    .toLowerCase()
    .includes("create");

  const buttons = () => {
    return (
      <div className="buttonRight">
        <Button
          variant="contained"
          onClick={() => dispatch(toggleUpdate("", null))}
        >
          Cancelar
        </Button>
        <Button
          className="ms-2 text-white"
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
    <div className={isOpen ? "viewportModal active" : "viewportModal"}>
      <div className="viewportModalContent">
        <div className="closeTimesBtnBox">
          <button
            className="closeTimesBtn"
            onClick={() => dispatch(toggleUpdate("", null))}
          >
            <FontAwesomeIcon icon={faTimes} className="deleteIcon" />
          </button>
        </div>

        <div>
          {updateType.includes("Create") ? (
            <p className="title">Crear {updateType.split("Create")[0]}</p>
          ) : (
            <p className="title">Editar {updateType}</p>
          )}
        </div>

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
  );
};

export default UpdateModal;
