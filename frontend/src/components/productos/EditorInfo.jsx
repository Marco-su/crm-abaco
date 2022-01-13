import { TextField, MenuItem, InputAdornment } from "@mui/material";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";

const EditorInfo = ({ register, errors, control }) => {
  const item = useSelector((store) => store.productos.producto);

  // RULES
  const nombreRules = register("nombre", {
    required: {
      value: true,
      message: "El producto debe tener un nombre.",
    },
    maxLength: {
      value: 120,
      message: "Nombre muy largo (máximo 120 caracteres).",
    },
  });

  const categoriaRules = {
    required: {
      value: true,
      message: "El producto debe estar asignado a una categoría.",
    },
  };
  const codigoRules = register("codigo", {
    required: {
      value: true,
      message: "El producto debe tener un código asignado.",
    },
    maxLength: {
      value: 120,
      message: "Código muy largo (máximo 120 caracteres).",
    },
  });

  const precioRules = register("precio", {
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
  });

  const descripcionRules = register("descripcion", {
    required: {
      value: true,
      message: "El producto debe tener una descripción.",
    },
    maxLength: {
      value: 255,
      message: "Descripción muy larga (máximo 255 caracteres).",
    },
  });

  // RENDER
  return (
    <div className="upFormInputsBox">
      <TextField
        className="inputText"
        label="Nombre"
        size="small"
        name="nombre"
        error={errors.nombre ? true : false}
        helperText={errors.nombre ? errors.nombre.message : ""}
        {...nombreRules}
      />

      <Controller
        control={control}
        name="categoria"
        defaultValue={item ? item.categoria : ""}
        render={({ field }) => (
          <TextField
            {...field}
            select
            size="small"
            label="Categoría"
            className="inputText"
            name="categoria"
            error={errors.categoria ? true : false}
            helperText={errors.categoria ? errors.categoria.message : ""}
          >
            <MenuItem value="Desarrollo de software">
              Desarrollo de software
            </MenuItem>
            <MenuItem value="Redes">Redes</MenuItem>
            <MenuItem value="Mantenimiento">Mantenimiento</MenuItem>
          </TextField>
        )}
        rules={categoriaRules}
      />

      <TextField
        className="inputText"
        label="Código de producto"
        size="small"
        name="codigo"
        error={errors.codigo ? true : false}
        helperText={errors.codigo ? errors.codigo.message : ""}
        {...codigoRules}
      />

      <TextField
        className="inputText"
        label="Precio"
        size="small"
        name="precio"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        error={errors.precio ? true : false}
        helperText={errors.precio ? errors.precio.message : ""}
        {...precioRules}
      />

      <TextField
        className="inputText"
        label="Descripción"
        multiline
        maxRows={3}
        size="small"
        name="descripcion"
        error={errors.descripcion ? true : false}
        helperText={errors.descripcion ? errors.descripcion.message : ""}
        {...descripcionRules}
      />
    </div>
  );
};

export default EditorInfo;
