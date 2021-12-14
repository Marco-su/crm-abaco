import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  updateProducto,
  createProducto,
} from "../../store/actions/producto.actions";
import { capitalizeFirstLetter } from "../../helpers/firstLetterUppercase";

const ProductoUpdateForm = ({ children }) => {
  // STATES
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateType = useSelector((store) => store.modals.updateType);
  const productos = useSelector((store) => store.productos.lista);
  const productoId = useSelector((store) => store.modals.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const item = productos.find((el) => el.id === productoId);

  // EFFECTS
  useEffect(() => {
    if (updateType === "producto") {
      if (item) {
        setValue("nombre", item.nombre);
        setValue("codigo", item.codigo);
        setValue("precio", String(item.precio));
        setValue("descripcion", item.descripcion);
      }
    }
  }, [item, productoId, setValue, updateType]);

  // HANDLES
  const onSubmit = (data) => {
    data.precio = data.precio.replace(",", ".");

    Object.keys(data).forEach((el) => {
      if (typeof data[el] === "string" && el !== "codigo") {
        data[el] = capitalizeFirstLetter(data[el]);
      }
    });

    if (updateType === "producto") {
      dispatch(updateProducto({ ...data, id: productoId }));
    } else if (updateType.toLowerCase().includes("create")) {
      dispatch(createProducto(data, navigate));
    }
  };

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

  //RENDER
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="upFormInputsBox">
        <TextField
          className="inputText"
          label="Nombre"
          maxRows={2}
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
          maxRows={2}
          size="small"
          name="codigo"
          error={errors.codigo ? true : false}
          helperText={errors.codigo ? errors.codigo.message : ""}
          {...codigoRules}
        />

        <TextField
          className="inputText"
          label="Precio"
          maxRows={2}
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
          maxRows={5}
          size="small"
          name="descripcion"
          error={errors.descripcion ? true : false}
          helperText={errors.descripcion ? errors.descripcion.message : ""}
          {...descripcionRules}
        />
      </div>

      {children}
    </form>
  );
};

export default ProductoUpdateForm;
