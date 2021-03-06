import { TextField } from "@mui/material";

const EditorPersonalInfo = ({ register, errors }) => {
  // RULES
  const nombreRules = register("nombre", {
    required: {
      value: true,
      message: "El contacto debe tener un nombre.",
    },
    maxLength: {
      value: 120,
      message: "Nombre muy largo (máximo 120 caracteres).",
    },
  });

  const apellidoRules = register("apellido", {
    required: {
      value: true,
      message: "El contacto debe tener un apellido.",
    },
    maxLength: {
      value: 120,
      message: "Apellido muy largo (máximo 120 caracteres).",
    },
  });

  const dniRules = register("dni", {
    maxLength: {
      value: 255,
      message: "Documento de identidad muy largo (máximo 255 caracteres).",
    },
  });

  const correoRules = register("correo", {
    required: {
      value: true,
      message: "El empleado debe tener un correo asignado.",
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Correo no válido. Ejemplo válido: usuario@dominio.tld",
    },
  });

  // RENDER
  return (
    <div className="inputs-box">
      <TextField
        label="Nombre"
        size="small"
        error={errors.nombre ? true : false}
        helperText={errors.nombre ? errors.nombre.message : ""}
        {...nombreRules}
      />

      <TextField
        label="Apellido"
        size="small"
        error={errors.apellido ? true : false}
        helperText={errors.apellido ? errors.apellido.message : ""}
        {...apellidoRules}
      />

      <TextField
        label="Documento de Identidad"
        size="small"
        error={errors.dni ? true : false}
        helperText={errors.dni ? errors.dni.message : ""}
        {...dniRules}
      />

      <TextField
        label="Correo"
        size="small"
        error={errors.correo ? true : false}
        helperText={errors.correo ? errors.correo.message : ""}
        {...correoRules}
      />
    </div>
  );
};

export default EditorPersonalInfo;
