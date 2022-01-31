import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { bulkCreateEmpresa } from "../../store/actions/empresa.actions";
import { Button, IconButton } from "@mui/material";
import { Progress } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { setActualStep } from "../../store/actions/global.actions";
import { randomName } from "../../helpers/randonString";

const DragAndDrop = ({ items, setItems, fileCells }) => {
  // STATES
  const dispatch = useDispatch();
  const actualStep = useSelector((store) => store.global.actualMasiveStep);

  const [fileFields, setFileFields] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [totalSteps, setTotalSteps] = useState(0);
  const [cellsForDb, setCellsForDb] = useState([]);
  const [startCreate, setStartCreate] = useState(false);
  const [idDeCreacion, setIdDeCreacion] = useState("");

  // EFFECTS
  useEffect(() => {
    if (fileCells.length > 0) {
      setFileFields(
        Object.keys(fileCells[0]).map((el, index) => {
          return { id: index, name: el, label: el };
        })
      );
    }

    setTotalSteps(fileCells.length);
  }, [fileCells]);

  useEffect(() => {
    if (startCreate === true) {
      setIsOpen(true);
      dispatch(bulkCreateEmpresa(cellsForDb[actualStep], totalSteps));
    }
    // eslint-disable-next-line
  }, [actualStep, dispatch, startCreate]);

  // HANDLES
  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleDrag = (data) => {
    const { source, destination } = data;

    if (
      !destination ||
      (source.index === destination.index &&
        source.droppableId === destination.droppableId)
    ) {
      return;
    }

    setItems((prevItems) =>
      reorder(prevItems, source.index, destination.index)
    );
  };

  const handleDragFile = (data) => {
    const { source, destination } = data;

    if (
      !destination ||
      (source.index === destination.index &&
        source.droppableId === destination.droppableId)
    ) {
      return;
    }

    setFileFields((prevItems) =>
      reorder(prevItems, source.index, destination.index)
    );
  };

  const handleSubmit = () => {
    const newKeysObject = {};
    let keys = [];
    let values = [];
    const idCreacion = randomName();
    setIdDeCreacion(idCreacion);

    items.forEach((el, index) => {
      if (items[index] && fileFields[index]) {
        newKeysObject[`${el.name}`] = fileFields[index].name;
      }

      if (index === items.length - 1) {
        keys = Object.keys(newKeysObject);
        values = Object.values(newKeysObject);
      }
    });

    const newCells = fileCells.reduce((acc, el) => {
      const objectEl = {};

      keys.forEach((key, index) => {
        // Colocando dirección
        if (
          key === "calle" ||
          key === "estado" ||
          key === "ciudad" ||
          key === "codigoPostal" ||
          key === "pais"
        ) {
          objectEl.direcciones
            ? (objectEl.direcciones = [
                { ...objectEl.direcciones[0], [key]: el[values[index]] },
              ])
            : (objectEl.direcciones = [{ [key]: el[values[index]] }]);

          // Colocando contacto
        } else if (key === "nombre_contacto" || key === "email_contacto") {
          let newKey = "";

          switch (key) {
            case "nombre_contacto":
              newKey = "nombre";
              break;
            case "email_contacto":
              newKey = "correo";
              break;
            default:
              break;
          }

          objectEl.contactos
            ? (objectEl.contactos = [
                { ...objectEl.contactos[0], [newKey]: el[values[index]] },
              ])
            : (objectEl.contactos = [{ [newKey]: el[values[index]] }]);

          // Colocando telefono del contacto
        } else if (key === "telf_contacto") {
          objectEl.contactos && objectEl.contactos[0].telefonos
            ? (objectEl.contactos[0].telefonos[0] = [
                {
                  ...objectEl.contactos[0].telefonos[0],
                  numero: el[values[index]],
                },
              ])
            : objectEl.contactos && !objectEl.contactos[0].telefonos
            ? (objectEl.contactos[0].telefonos = [
                { numero: el[values[index]] },
              ])
            : (objectEl.contactos = [
                { telefonos: [{ numero: el[values[index]] }] },
              ]);

          // colocando telefono de la empresa
        } else if (key === "telefono") {
          objectEl.telefonos
            ? (objectEl.telefonos = [
                { ...objectEl.telefonos[0], numero: el[values[index]] },
              ])
            : (objectEl.telefonos = [{ numero: el[values[index]] }]);

          // Colocando valores restantes
        } else if (
          key === "ingresosMaximos" &&
          !keys.includes("ingresosMinimos")
        ) {
          objectEl.ingresosMinimos = el[values[index]];
        } else {
          objectEl[key] = el[values[index]];
        }
      });

      objectEl.idCreacion = idCreacion;
      objectEl.tipoCreacion = "Creación masiva";

      return [...acc, objectEl];
    }, []);

    setCellsForDb(newCells);
    setStartCreate(true);
  };

  // RENDER
  return (
    <div className="drag-box excel__drag-and-drop">
      <div>
        <h2 className="text-center mb-2">Intercepción de campos</h2>
        <p className="info-paragraph">
          Selecciona y arrastra para hacer coincidir los campos de la base de
          datos con los campos correspondientes del archivo seleccionado. Este
          paso es de gran importacia, ya que en él se dermina en que campos será
          guardada la información proporcionada.
        </p>
      </div>

      <div className="drag-list-box">
        <div className="db-cols-box">
          <DragDropContext onDragEnd={handleDrag}>
            <h2>Campos para guardado</h2>
            <Droppable droppableId="databaseCols">
              {(dropProps) => (
                <ul {...dropProps.droppableProps} ref={dropProps.innerRef}>
                  {items.map((el, index) => (
                    <Draggable
                      key={`dbCol-${el.id}`}
                      draggableId={`dbCol-${el.id}`}
                      index={index}
                    >
                      {(dragProps) => (
                        <li
                          {...dragProps.draggableProps}
                          ref={dragProps.innerRef}
                          {...dragProps.dragHandleProps}
                        >
                          {el.label}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {dropProps.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="file-cols-box">
          <DragDropContext onDragEnd={handleDragFile}>
            <h2>Campos identificados en archivo</h2>
            <Droppable droppableId="fileCols">
              {(dropProps) => (
                <ul {...dropProps.droppableProps} ref={dropProps.innerRef}>
                  {fileFields.length > 0 &&
                    fileFields.map((el, index) => (
                      <Draggable
                        key={`fileCol-${el.id}`}
                        draggableId={`fileCol-${el.id}`}
                        index={index}
                      >
                        {(dragProps) => (
                          <li
                            {...dragProps.draggableProps}
                            ref={dragProps.innerRef}
                            {...dragProps.dragHandleProps}
                          >
                            {el.label}
                          </li>
                        )}
                      </Draggable>
                    ))}
                  {dropProps.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      <div className="btn-box">
        <Button
          className="pill-button"
          variant="contained"
          onClick={handleSubmit}
        >
          Finalizar
        </Button>
      </div>

      {/* MODAL */}
      <div
        className={
          isOpen ? "viewport-modal viewport-modal--active" : "viewport-modal"
        }
      >
        <div className="viewport-modal__content">
          {actualStep === totalSteps ? (
            <div className="close-icon-box">
              <IconButton
                className="close-icon-button"
                color="info"
                onClick={() => {
                  setIsOpen(false);
                  setStartCreate(false);
                  dispatch(setActualStep(0));
                }}
              >
                <FontAwesomeIcon icon={faTimes} className="times-icon" />
              </IconButton>
            </div>
          ) : null}

          <div className="info-box">
            <p className="title">
              Subiendo registros con el id "{idDeCreacion}"
            </p>
            <Progress value={(actualStep / totalSteps) * 100} />
            <div className="d-flex justify-content-end mt-1">
              {actualStep} de {totalSteps}
            </div>

            <div className="button-right">
              <Button
                variant="contained"
                onClick={() => {
                  setIsOpen(false);
                  setStartCreate(false);
                  dispatch(setActualStep(0));
                }}
                disabled={actualStep === totalSteps ? false : true}
              >
                Finalizar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
