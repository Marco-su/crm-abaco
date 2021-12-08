import "../../assets/css/common/modals.css";
import "../../assets/css/common/deleteModal.css";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleDelete } from "../../store/actions/modals.action";
import { disableContacto } from "../../store/actions/contacto.actions";
import { disableEmpleado } from "../../store/actions/empleado.actions";
import { disableProducto } from "../../store/actions/producto.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { disableEmpresa } from "../../store/actions/empresa.actions";

const DeleteModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isOpen = useSelector((store) => store.modals.deleteIsOpen);
  const deleteType = useSelector((store) => store.modals.deleteType);
  const id = useSelector((store) => store.modals.id);
  const name = useSelector((store) => store.modals.deleteName);

  const deleteConfirmed = () => {
    switch (deleteType) {
      case "contacto":
        dispatch(disableContacto(id));
        break;

      case "empleado":
        dispatch(disableEmpleado(id));
        break;

      case "empresa":
        dispatch(disableEmpresa(id, location.pathname));
        break;

      case "producto":
        dispatch(disableProducto(id));
        break;

      default:
        break;
    }
  };

  return (
    <div
      className={isOpen ? "viewportModal active" : "viewportModal"}
      id="deleteModal"
    >
      <div className="viewportModalContent">
        <div className="closeTimesBtnBox">
          <button
            className="closeTimesBtn"
            onClick={() => dispatch(toggleDelete("", null, ""))}
          >
            <FontAwesomeIcon icon={faTimes} className="deleteIcon" />
          </button>
        </div>

        <div>
          <p className="title">
            Eliminar {deleteType} "{name}"?
          </p>
          <p>Estás seguro de que quieres eliminar este elemento?</p>
        </div>

        <div className="deleteMessage">
          <p>Advertencia</p>

          {deleteType === "contacto" && (
            <p>
              Si eliminas este contacto ya no será visible en la empresa a la
              que pertenece y solo será accesible desde la sección "Inactivos".
            </p>
          )}

          {deleteType === "empleado" && (
            <p>
              Si eliminas a este empleado se le restringirá el acceso a la
              plataforma y a sus funcionalidades. Además solo será visible desde
              la sección "Inactivos".
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
              plataforma a ninguna empresa. Además, si se quieren acceder a sus
              datos y estadisticas se tendrá que hacer a través de la sección
              "Inactivos".
            </p>
          )}
        </div>

        <div className="buttonRight">
          <button
            className="cancelBtn"
            onClick={() => dispatch(toggleDelete("", null, ""))}
          >
            Cancelar
          </button>
          <button onClick={deleteConfirmed} className="deleteBtn">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
