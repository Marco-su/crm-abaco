import { TextField, MenuItem } from "@mui/material";
import PhoneInput from "../common/PhoneInput";
import { useForm } from "react-hook-form";

const EmpleadoUpdateForm = ({ children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
              message: "El empleado debe tener un nombre.",
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
              message: "El empleado debe tener un apellido.",
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
              message: "El empleado debe tener un cargo asignado.",
            },
          })}
        >
          <MenuItem value="Una">Una opción</MenuItem>
          <MenuItem value="Otra">Otra opcion</MenuItem>
        </TextField>

        <PhoneInput
          label="Teléfono"
          tipo="telefono"
          register={register}
          errors={errors}
        />

        <PhoneInput
          label="Móvil"
          tipo="movil"
          register={register}
          errors={errors}
        />

        <TextField
          className="inputText"
          label="Correo electrónico"
          multiline
          maxRows={2}
          size="small"
          // value={value}
          error={errors.correo ? true : false}
          helperText={errors.correo ? errors.correo.message : ""}
          {...register("correo", {
            required: {
              value: true,
              message: "El empleado debe tener un correo asignado.",
            },
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Correo no válido. Ejemplo válido: usuario@dominio.tld",
            },
          })}
        />
      </div>

      {children}
    </form>
  );
};

export default EmpleadoUpdateForm;
