import { TextField, MenuItem } from "@mui/material";

const EditorInfo = ({ register, errors }) => {
  // RULES
  const nombreRules = register("nombre", {
    required: {
      value: true,
      message: "La empresa debe tener un nombre.",
    },
    maxLength: {
      value: 120,
      message: "Nombre muy largo (máximo 120 caracteres).",
    },
  });

  const verticalRules = register("vertical", {
    maxLength: {
      value: 120,
      message: "Vertical muy larga (máximo 120 caracteres).",
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

  const propiedadRules = register("propiedad", {});

  const ingresosRules = register("ingresos_anuales", {
    max: {
      value: 100000000000000,
      message: "Número fuera de rango.",
    },
    min: {
      value: 0,
      message: "No se admiten números negativos.",
    },
  });

  // RENDER
  return (
    <div className="upFormInputsBox">
      <TextField
        className="inputText"
        label="Nombre de la empresa"
        size="small"
        error={errors.nombre ? true : false}
        helperText={errors.nombre ? errors.nombre.message : ""}
        {...nombreRules}
      />

      <TextField
        className="inputText"
        label="Sector"
        size="small"
        error={errors.vertical ? true : false}
        helperText={errors.vertical ? errors.vertical.message : ""}
        {...verticalRules}
      />

      <TextField
        className="inputText"
        label="Propiedad"
        size="small"
        select
        defaultValue="Privada"
        error={errors.cargo ? true : false}
        helperText={errors.cargo ? errors.cargo.message : ""}
        {...propiedadRules}
      >
        <MenuItem value="Privada">Privada</MenuItem>
        <MenuItem value="Publica">Pública</MenuItem>
        <MenuItem value="Otra">Otra</MenuItem>
      </TextField>

      <TextField
        className="inputText"
        label="Número de empleados"
        type="number"
        size="small"
        error={errors.empleados ? true : false}
        helperText={errors.empleados ? errors.empleados.message : ""}
        {...empleadosRules}
      />

      <TextField
        className="inputText"
        label="Ingresos Anuales"
        type="number"
        size="small"
        error={errors.ingresos_anuales ? true : false}
        helperText={
          errors.ingresos_anuales ? errors.ingresos_anuales.message : ""
        }
        {...ingresosRules}
      />
    </div>
  );
};

export default EditorInfo;
