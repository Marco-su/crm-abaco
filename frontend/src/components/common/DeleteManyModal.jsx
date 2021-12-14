import "../../assets/css/common/modals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleDeleteMany } from "../../store/actions/modals.action";
import { disableManyContactos } from "../../store/actions/contacto.actions";
import { disableManyEmpleados } from "../../store/actions/empleado.actions";
import { disableManyProductos } from "../../store/actions/producto.actions";
import { disableManyEmpresas } from "../../store/actions/empresa.actions";

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
      className={isOpen ? "viewportModal active" : "viewportModal"}
      id="deleteManyModal"
    >
      <div className="viewportModalContent">
        <div className="closeTimesBtnBox">
          <button
            className="closeTimesBtn"
            onClick={() => dispatch(toggleDeleteMany("", []))}
          >
            <FontAwesomeIcon icon={faTimes} className="deleteIcon" />
          </button>
        </div>

        <div>
          <p className="title">
            {ids.length > 1
              ? `Eliminar ${ids.length} ${deleteType}s?`
              : "Eliminar el elemento seleccionado?"}
          </p>
          <p className="deleteMessage">
            Si eliminas uno o varios elementos solo serán accecibles desde la
            sección "Inactivos", además no podrán ser asignados a ningun proceso
            de negociación.
          </p>

          <div className="buttonRight">
            <button
              className="blueBtn"
              onClick={() => dispatch(toggleDeleteMany("", {}))}
            >
              Cancelar
            </button>
            <button onClick={deleteConfirmed} className="redBtn">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteManyModal;
