import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateEmpleado,
  createEmpleado,
} from "../../store/actions/empleado.actions";
import { TextField, MenuItem } from "@mui/material";
import PhoneInput from "../common/PhoneInput";
import { useForm } from "react-hook-form";
import { capitalizeFirstLetter } from "../../helpers/firstLetterUppercase";

const EmpleadoUpdateForm = ({ children }) => {
  // STATES
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateType = useSelector((store) => store.modals.updateType);
  const empleados = useSelector((store) => store.empleados.lista);
  const empleadoId = useSelector((store) => store.modals.id);

  const isCreate = updateType.toLowerCase().includes("create");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  let telf;
  let movil;

  const item = empleados.find((el) => el.id === empleadoId);

  if (item) {
    telf = item.telefonos.find((el) => el.tipo === "telefono");
    movil = item.telefonos.find((el) => el.tipo === "movil");
  }

  // EFFECTS
  useEffect(() => {
    if (updateType === "empleado") {
      if (item) {
        setValue("nombre", item.nombre);
        setValue("apellido", item.apellido);
        setValue("cargo", item.cargo);
        setValue("correo", item.correo);

        if (telf) {
          setValue("numerotelefono", telf.numero);
        }
        if (movil) {
          setValue("numeromovil", movil.numero);
        }
      }
    }
  }, [item, empleadoId, setValue, telf, movil, updateType]);

  // HANDLES
  const onSubmit = (data) => {
    Object.keys(data).forEach((el) => {
      if (
        typeof data[el] === "string" &&
        el !== "correo" &&
        el !== "password" &&
        el !== "emailPassword"
      ) {
        data[el] = capitalizeFirstLetter(data[el]);
      }
    });

    if (updateType === "empleado") {
      data.telefonos = [
        {
          id: movil.id,
          codPais: data.codmovil,
          numero: data.numeromovil,
          tipo: "movil",
        },
        {
          id: telf.id,
          codPais: data.codtelefono,
          numero: data.numerotelefono,
          tipo: "telefono",
        },
      ];

      dispatch(updateEmpleado({ ...data, id: empleadoId }));
    } else if (isCreate) {
      data.telefonos = [
        {
          codPais: data.codmovil,
          numero: data.numeromovil,
          tipo: "movil",
        },
        {
          codPais: data.codtelefono,
          numero: data.numerotelefono,
          tipo: "telefono",
        },
      ];

      dispatch(createEmpleado(data, navigate));
    }
  };

  // RULES
  const nombreRules = register("nombre", {
    required: {
      value: true,
      message: "El empleado debe tener un nombre.",
    },
    maxLength: {
      value: 120,
      message: "Nombre muy largo (máximo 120 caracteres).",
    },
  });

  const apellidoRules = register("apellido", {
    required: {
      value: true,
      message: "El empleado debe tener un apellido.",
    },
    maxLength: {
      value: 120,
      message: "Apellido muy largo (máximo 120 caracteres).",
    },
  });

  const cargoRules = register("cargo", {
    required: {
      value: true,
      message: "El empleado debe tener un cargo asignado.",
    },
  });

  const correoRules = register("correo", {
    required: {
      value: true,
      message: "El empleado debe tener un correo asignado.",
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Correo no válido. Ejemplo válido: usuario@mail.com",
    },
  });

  const passwordRules = register("password", {
    required: {
      value: true,
      message: "Ingresa una contraseña.",
    },
    maxLength: {
      value: 120,
      message: "Contraseña muy larga (máximo 120 caracteres).",
    },
    minLength: {
      value: 4,
      message: "Contraseña muy corta (mínimo 4 caracteres).",
    },
  });

  const emailPassRules = register("emailPassword", {
    maxLength: {
      value: 120,
      message: "Contraseña muy larga (máximo 120 caracteres).",
    },
    minLength: {
      value: 4,
      message: "Contraseña muy corta (mínimo 4 caracteres).",
    },
  });

  // RENDER
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="upFormInputsBox">
        <TextField
          className="inputText"
          label="Nombre"
          inputProps={{
            autoComplete: "off",
          }}
          size="small"
          error={errors.nombre ? true : false}
          helperText={errors.nombre ? errors.nombre.message : ""}
          {...nombreRules}
        />

        <TextField
          className="inputText"
          label="Apellido"
          inputProps={{
            autoComplete: "off",
          }}
          size="small"
          error={errors.apellido ? true : false}
          helperText={errors.apellido ? errors.apellido.message : ""}
          {...apellidoRules}
        />

        <TextField
          className="inputText"
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

        <PhoneInput
          label="Teléfono"
          tipo="telefono"
          errors={errors}
          control={control}
          telf={telf || ""}
          register={register}
        />

        <PhoneInput
          label="Móvil"
          tipo="movil"
          errors={errors}
          control={control}
          telf={movil || ""}
          register={register}
        />

        <TextField
          className="inputText"
          label="Correo electrónico"
          inputProps={{
            autoComplete: "off",
          }}
          size="small"
          error={errors.correo ? true : false}
          helperText={errors.correo ? errors.correo.message : ""}
          {...correoRules}
        />

        {isCreate ? (
          <TextField
            className="inputText"
            label="Contraseña"
            size="small"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : ""}
            type="password"
            {...passwordRules}
          />
        ) : null}

        {isCreate ? (
          <TextField
            className="inputText"
            label="Contraseña de aplicaciones (email)"
            size="small"
            error={errors.emailPassword ? true : false}
            helperText={
              errors.emailPassword ? errors.emailPassword.message : ""
            }
            type="password"
            {...emailPassRules}
          />
        ) : null}
      </div>

      {children}
    </form>
  );
};

export default EmpleadoUpdateForm;
