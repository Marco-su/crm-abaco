import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { FileUploadOutlined } from "@mui/icons-material";
import { dbProspectNames } from "../../constants/dbNames";
import path from "path";
import XLSX from "xlsx";

const UpdateExcel = ({ fileFields, setFileFields, items, setItems }) => {
  // HANDLES
  const readXlsx = (event) => {
    const file = event.target.files[0];

    if (file) {
      const promise = new Promise((resolve, reject) => {
        const ext = path.extname(file.name).toLowerCase();

        if (ext === ".xlsx" || ext === ".xls") {
          const fileReader = new FileReader();

          fileReader.readAsArrayBuffer(file);

          fileReader.onload = (e) => {
            const bufferArray = e.target.result;

            const workbook = XLSX.read(bufferArray, { type: "buffer" });
            const sheetName = workbook.SheetNames[0];
            const workbookSheet = workbook.Sheets[sheetName];

            const data = XLSX.utils.sheet_to_json(workbookSheet);

            resolve(data);
          };

          fileReader.onerror = (error) => reject(error);
        }
      });

      promise
        .then((data) => {
          setFileFields(data);
        })
        .catch((error) => console.log("Error en lectura de archivo", error));
    }
  };

  const handleChange = (e, el) => {
    if (e.target.checked) {
      setItems([...items, el]);
    } else {
      const newArray = items.filter((element) => element.id !== el.id);
      setItems(newArray);
    }
  };

  // RENDER
  return (
    <div className="archivoBox">
      <h2 className="mb-2">Archivo</h2>

      <div className="archivoInfo">
        {fileFields.length > 0 ? (
          <>
            <p>Campos identificados ({Object.keys(fileFields[0]).length})</p>

            <div className="foundFields">
              {Object.keys(fileFields[0]).map((el, index) => (
                <span key={`fieldName-${index}`}>{el}</span>
              ))}
            </div>

            <p>Registros listados en archivo ({fileFields.length})</p>

            <p>
              Seleccionar campos existentes en el archivo para realizar guardado
              en base de datos:
            </p>

            <div>
              {dbProspectNames.map((el) => {
                return el.name !== "nombre" && el.name !== "nombre_contacto" ? (
                  <FormControlLabel
                    key={el.id}
                    control={<Checkbox onChange={(e) => handleChange(e, el)} />}
                    label={el.label}
                  />
                ) : null;
              })}
            </div>
          </>
        ) : null}
      </div>

      <div className="uploadBtnBox">
        <label htmlFor="uploadExcel">
          <Button component="span" variant="outlined">
            <FileUploadOutlined className="me-2" />
            Seleccionar Archivo
          </Button>
        </label>

        <input
          id="uploadExcel"
          type="file"
          onChange={readXlsx}
          accept=".xlsx, .xls"
        />
      </div>
    </div>
  );
};

export default UpdateExcel;
