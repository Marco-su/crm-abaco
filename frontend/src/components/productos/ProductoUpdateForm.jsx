import { TextField, MenuItem, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";

const ProductoUpdateForm = ({ children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.precio = data.precio.replace(",", ".");
    console.log(Number(data.precio));
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
              message: "El producto debe tener un nombre.",
            },
            maxLength: {
              value: 120,
              message: "Nombre muy largo (máximo 120 caracteres).",
            },
          })}
        />

        <TextField
          className="inputText"
          label="Categoría"
          size="small"
          // value={value}
          select
          defaultValue="Una"
          error={errors.categoria ? true : false}
          helperText={errors.categoria ? errors.categoria.message : ""}
          {...register("categoria", {
            required: {
              value: true,
              message: "El producto debe estar asignado a una categoría.",
            },
          })}
        >
          <MenuItem value="Una">Una opción</MenuItem>
          <MenuItem value="Otra">Otra opcion</MenuItem>
        </TextField>

        <TextField
          className="inputText"
          label="Código de producto"
          multiline
          maxRows={2}
          size="small"
          // value={value}
          error={errors.codigo ? true : false}
          helperText={errors.codigo ? errors.codigo.message : ""}
          {...register("codigo", {
            required: {
              value: true,
              message: "El producto debe tener un código asignado.",
            },
            maxLength: {
              value: 120,
              message: "Código muy largo (máximo 120 caracteres).",
            },
          })}
        />

        <TextField
          className="inputText"
          label="Precio"
          multiline
          maxRows={2}
          size="small"
          // value={value}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          error={errors.precio ? true : false}
          helperText={errors.precio ? errors.precio.message : ""}
          {...register("precio", {
            required: {
              value: true,
              message: "El producto debe tener un precio asignado.",
            },
            maxLength: {
              value: 50,
              message: "Valor fuera de rango (máximo 50 caracteres).",
            },
            pattern: {
              value: /^([0-9]+([,][0-9]*)?|[,][0-9]+)$/,
              message: "Formato no válido. Ejemplo válido: $10,25",
            },
          })}
        />

        <TextField
          className="inputText"
          label="Descripción"
          multiline
          maxRows={5}
          size="small"
          // value={value}
          error={errors.descripcion ? true : false}
          helperText={errors.descripcion ? errors.descripcion.message : ""}
          {...register("descripcion", {
            required: {
              value: true,
              message: "El producto debe tener una descripción.",
            },
            maxLength: {
              value: 255,
              message: "Descripción muy larga (máximo 255 caracteres).",
            },
          })}
        />
      </div>

      {children}
    </form>
  );
};

export default ProductoUpdateForm;
