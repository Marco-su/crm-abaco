import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TextField, MenuItem } from "@mui/material";
import SearchEmpresaImput from "../common/SearchEmpresaInput";

const EditorWorkingInfo = ({
  register,
  errors,
  clearErrors,
  realValue,
  setRealValue,
}) => {
  // STATES
  const item = useSelector((store) => store.contactos.contacto);

  // EFFECTS
  useEffect(() => {
    setRealValue({
      id: item.empresa.id,
      nombre: item.empresa.nombre,
    });
  }, [item, setRealValue]);

  // RULES
  const cargoRules = register("cargo", {
    required: {
      value: true,
      message: "El contacto debe tener un cargo asignado.",
    },
  });

  const empleadosRules = register("empleados", {
    max: {
      value: 1000000,
      message:
        "Número de empleados muy grande para procesar (máximo un millon)",
    },
    min: {
      value: 0,
      message: "No se admiten números negativos",
    },
  });

  // RENDER
  return (
    <div className="inputs-box">
      <SearchEmpresaImput
        realValue={realValue}
        setRealValue={setRealValue}
        error={errors.empresa}
        clearErrors={clearErrors}
      />

      <TextField
        label="Cargo"
        size="small"
        select
        defaultValue="Una"
        error={errors.cargo ? true : false}
        helperText={errors.cargo ? errors.cargo.message : ""}
        {...cargoRules}
      >
        <MenuItem value="Una">Una opción</MenuItem>
        <MenuItem value="Otra">Otra opcion</MenuItem>
      </TextField>

      <TextField
        label="Empleados a cargo"
        type="number"
        size="small"
        error={errors.empleados ? true : false}
        helperText={errors.empleados ? errors.empleados.message : ""}
        {...empleadosRules}
      />
    </div>
  );
};

export default EditorWorkingInfo;
