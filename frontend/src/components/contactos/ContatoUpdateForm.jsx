import { TextField, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";

const ContactoUpdateForm = ({ children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="upFormInputsBox">
        <TextField
          className="inputText"
          label="Nombre"
          multiline
          maxRows={2}
          size="small"
          // value={value}
          error={errors.nombre ? true : false}
          helperText={errors.nombre ? errors.nombre.message : ""}
          {...register("nombre", {
            required: {
              value: true,
              message: "El contacto debe tener un nombre.",
            },
            maxLength: {
              value: 120,
              message: "Nombre muy largo (máximo 120 caracteres).",
            },
          })}
        />

        <TextField
          className="inputText"
          label="Apellido"
          multiline
          maxRows={2}
          size="small"
          // value={value}
          error={errors.apellido ? true : false}
          helperText={errors.apellido ? errors.apellido.message : ""}
          {...register("apellido", {
            required: {
              value: true,
              message: "El contacto debe tener un apellido.",
            },
            maxLength: {
              value: 120,
              message: "Apellido muy largo (máximo 120 caracteres).",
            },
          })}
        />

        <TextField
          className="inputText"
          label="Cargo"
          size="small"
          // value={value}
          select
          defaultValue="Una"
          error={errors.cargo ? true : false}
          helperText={errors.cargo ? errors.cargo.message : ""}
          {...register("cargo", {
            required: {
              value: true,
              message: "El contacto debe tener un cargo asignado.",
            },
          })}
        >
          <MenuItem value="Una">Una opción</MenuItem>
          <MenuItem value="Otra">Otra opcion</MenuItem>
        </TextField>
      </div>

      {children}
    </form>
  );
};

export default ContactoUpdateForm;
