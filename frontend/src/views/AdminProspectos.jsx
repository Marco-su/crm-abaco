import { useState } from "react";
import DragAndDrop from "../components/admin/DragAndDrop";
import UpdateExcel from "../components/admin/UpdateExcel";
import { Button } from "@mui/material";
import { dbProspectNames } from "../constants/dbNames";

const AdminProspectos = () => {
  const [dbNames, setDbNames] = useState([dbProspectNames[0]]);
  const [instructionActual, setInstructionActual] = useState(0);
  const [fileFields, setFileFields] = useState([]);

  const instruccion = [
    "Seleccione un archivo de excel con extensión .xlsx o .xls. Este archivo debe tener una fila inicial de encabezados.",
    "Con las cajas de selección, escoja los campos de la base de datos que están presentes en el archivo de excel seleccionado.",
    "Haga coincidir los campos de la base de datos con los campos del archivo de excel. Para ello, en el recuadro inferior, arrastre los contenedores con los nombres de cada campo y coloquelos en pares correspondientes.",
    "Una vez finalizada la intercepción de campos precione el botón finalizar en la parte inferior de la misma sección y si considera que todo está en orden confirme para guardar los registros del archivo.",
  ];

  return (
    <div className="excel view-container">
      <div className="box">
        <div className="box__main-title">
          <div className="title">
            <h2>Prospectos (creación masiva)</h2>
          </div>
        </div>
      </div>

      <div className="box excel__upload-box">
        <UpdateExcel
          fileFields={fileFields}
          setFileFields={setFileFields}
          items={dbNames}
          setItems={setDbNames}
        />

        <div>
          <h2 className="mb-2">Instrucciones</h2>

          <p className="text-gray">Paso {instructionActual + 1}</p>
          <p>{instruccion[instructionActual]}</p>

          {instructionActual > 0 ? (
            <Button
              className="me-2 pill-button"
              variant="contained"
              color="secondary"
              onClick={() => setInstructionActual(instructionActual - 1)}
            >
              Anterior
            </Button>
          ) : null}

          {instructionActual < instruccion.length - 1 ? (
            <Button
              className="pill-button"
              variant="contained"
              color="secondary"
              onClick={() => setInstructionActual(instructionActual + 1)}
            >
              Siguiente
            </Button>
          ) : null}
        </div>
      </div>

      {fileFields.length > 0 ? (
        <DragAndDrop
          fileCells={fileFields}
          items={dbNames}
          setItems={setDbNames}
        />
      ) : null}
    </div>
  );
};

export default AdminProspectos;
