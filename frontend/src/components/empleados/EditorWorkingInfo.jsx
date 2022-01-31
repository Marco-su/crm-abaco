import { TextField, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";

const EditorWorkingInfo = ({ register, errors }) => {
  const item = useSelector((store) => store.empleados.empleado);

  // RULES
  const cargoRules = register("cargo", {
    required: {
      value: true,
      message: "El contacto debe tener un cargo asignado.",
    },
  });

  const correoRules = register("correoEmpresa", {
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Correo no válido. Ejemplo válido: usuario@dominio.tld",
    },
  });

  // RENDER
  return (
    <div className="upFormInputsBox">
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
        size="small"
        inputProps={{ readOnly: true, defaultValue: item.empleados }}
      />

      <TextField
        label="Correo de empresa"
        size="small"
        error={errors.correoEmpresa ? true : false}
        helperText={errors.correoEmpresa ? errors.correoEmpresa.message : ""}
        {...correoRules}
      />
    </div>
  );
};

export default EditorWorkingInfo;
