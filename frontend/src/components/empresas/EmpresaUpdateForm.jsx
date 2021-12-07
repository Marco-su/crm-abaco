import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const EmpresaUpdateForm = ({ children }) => {
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
              message: "La empresa debe tener un nombre.",
            },
            maxLength: {
              value: 120,
              message: "Nombre muy largo (máximo 120 caracteres).",
            },
          })}
        />

        <TextField
          className="inputText"
          label="Vertical"
          multiline
          maxRows={2}
          size="small"
          // value={value}
          error={errors.vertical ? true : false}
          helperText={errors.vertical ? errors.vertical.message : ""}
          {...register("vertical", {
            required: {
              value: true,
              message: "Se requiere la vertical de negocios.",
            },
            maxLength: {
              value: 120,
              message: "Vertical muy larga (máximo 120 caracteres).",
            },
          })}
        />
      </div>

      {children}
    </form>
  );
};

export default EmpresaUpdateForm;
