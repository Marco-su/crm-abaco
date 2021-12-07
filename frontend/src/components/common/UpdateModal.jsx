import "../../assets/css/common/modals.css";

import ContactoUpdateForm from "../contactos/ContatoUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { toggleUpdate } from "../../store/actions/modals.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import EmpleadoUpdateForm from "../empleados/EmpleadoUpdateForm";
import EmpresaUpdateForm from "../empresas/EmpresaUpdateForm";
import ProductoUpdateForm from "../productos/ProductoUpdateForm";

const UpdateModal = (element) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((store) => store.modals.updateIsOpen);
  const updateType = useSelector((store) => store.modals.updateType);

  const buttons = () => {
    return (
      <div className="buttonRight">
        <button
          type="button"
          className="cancelBtn"
          onClick={() => dispatch(toggleUpdate("", null))}
        >
          Cancelar
        </button>
        <button type="submit" className="editBtn">
          Modificar
        </button>
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
          <p className="title">Editar {updateType}</p>
        </div>

        {updateType === "contacto" && (
          <ContactoUpdateForm>{buttons()}</ContactoUpdateForm>
        )}

        {updateType === "empleado" && (
          <EmpleadoUpdateForm>{buttons()}</EmpleadoUpdateForm>
        )}

        {updateType === "empresa" && (
          <EmpresaUpdateForm>{buttons()}</EmpresaUpdateForm>
        )}

        {updateType === "producto" && (
          <ProductoUpdateForm>{buttons()}</ProductoUpdateForm>
        )}
      </div>
    </div>
  );
};

export default UpdateModal;
