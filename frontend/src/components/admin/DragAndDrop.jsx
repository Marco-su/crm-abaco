import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { bulkCreateEmpresa } from "../../store/actions/empresa.actions";
import { Button } from "@mui/material";

const DragAndDrop = ({ items, setItems, fileCells }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fileFields, setFileFields] = useState([]);

  // EFFECTS
  useEffect(() => {
    if (fileCells.length > 0) {
      setFileFields(
        Object.keys(fileCells[0]).map((el, index) => {
          return { id: index, name: el, label: el };
        })
      );
    }
  }, [fileCells]);

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
          objectEl.telefono
            ? (objectEl.telefono = {
                ...objectEl.telefono,
                [key]: el[values[index]],
              })
            : (objectEl.telefono = { numero: el[values[index]] });

          // Colocando valores restantes
        } else {
          objectEl[key] = el[values[index]];
        }
      });

      return [...acc, objectEl];
    }, []);

    dispatch(bulkCreateEmpresa(newCells, navigate));
  };

  // RENDER
  return (
    <div className="dragBox">
      <div>
        <h2 className="text-center mb-2">Intercepción de campos</h2>
        <p className="infoP">
          Selecciona y arrastra para hacer coincidir los campos de la base de
          datos con los campos correspondientes del archivo seleccionado. Este
          paso es de gran importacia, ya que en él se dermina en que campos será
          guardada la información proporcionada.
        </p>
      </div>

      <div className="dragListsBox">
        <div className="dragList">
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
                          className="droppableLi"
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

        <div className="dragList">
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
                            className="droppableLi"
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

      <div className="btnBox">
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={fileCells.length > 1000 ? true : false}
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
};

export default DragAndDrop;
