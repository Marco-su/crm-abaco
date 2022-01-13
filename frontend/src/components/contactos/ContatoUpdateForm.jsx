import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  updateContacto,
  createContacto,
} from "../../store/actions/contacto.actions";
import { capitalizeFirstLetter } from "../../helpers/firstLetterUppercase";
import SearchEmpresaImput from "../common/SearchEmpresaInput";

const ContactoUpdateForm = ({ children }) => {
  // STATES
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [realValue, setRealValue] = useState(null);

  const updateType = useSelector((store) => store.modals.updateType);
  const contactos = useSelector((store) => store.contactos.lista);
  const contactoId = useSelector((store) => store.modals.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
  } = useForm();

  const item = contactos.find((el) => el.id === contactoId);

  // EFFECTS
  useEffect(() => {
    if (updateType === "contacto") {
      if (item) {
        setValue("nombre", item.nombre);
        setValue("apellido", item.apellido);
        setValue("cargo", item.cargo);
        setValue("correo", item.correo);
        setRealValue({
          id: item.empresa.id,
          nombre: item.empresa.nombre,
        });
      }
    }
  }, [item, contactoId, setValue, updateType]);

  // HANDLES
  const onSubmit = (data) => {
    if (!realValue || !realValue.id) {
      setError("empresa", {
        type: "manual",
        message: "Debes asignar una empresa",
      });

      return;
    } else {
      data.empresaId = realValue.id;
    }

    Object.keys(data).forEach((el) => {
      if (
        typeof data[el] === "string" &&
        el !== "correo" &&
        el !== "empresaId"
      ) {
        data[el] = capitalizeFirstLetter(data[el]);
      }
    });

    const { nombre, apellido, cargo, correo, empresaId } = data;

    if (updateType === "contacto") {
      dispatch(
        updateContacto({
          nombre,
          apellido,
          cargo,
          correo,
          empresaId,
          id: contactoId,
        })
      );
    } else if (updateType.toLowerCase().includes("create")) {
      dispatch(
        createContacto({ nombre, apellido, cargo, correo, empresaId }, navigate)
      );
    }
  };

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

  const cargoRules = register("cargo", {
    required: {
      value: true,
      message: "El contacto debe tener un cargo asignado.",
    },
  });

  const dniRules = register("dni", {
    maxLength: {
      value: 255,
      message: "Documento de identidad muy largo (máximo 255 caracteres).",
    },
  });

  const webRules = register("web", {
    maxLength: {
      value: 1000,
      message: "URL muy larga (máximo 1000 caracteres).",
    },
    pattern: {
      value:
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      message: "URL no válida. Ejemplo válido: http://dominio.com",
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
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="upFormInputsBox">
        <TextField
          className="inputText"
          label="Nombre"
          size="small"
          error={errors.nombre ? true : false}
          helperText={errors.nombre ? errors.nombre.message : ""}
          {...nombreRules}
        />

        <TextField
          className="inputText"
          label="Apellido"
          size="small"
          error={errors.apellido ? true : false}
          helperText={errors.apellido ? errors.apellido.message : ""}
          {...apellidoRules}
        />

        <TextField
          className="inputText"
          label="Documento de Identidad"
          size="small"
          error={errors.dni ? true : false}
          helperText={errors.dni ? errors.dni.message : ""}
          {...dniRules}
        />

        <TextField
          className="inputText"
          label="Sitio Web"
          size="small"
          error={errors.web ? true : false}
          helperText={errors.web ? errors.web.message : ""}
          {...webRules}
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

        <TextField
          className="inputText"
          label="Correo"
          size="small"
          error={errors.correo ? true : false}
          helperText={errors.correo ? errors.correo.message : ""}
          {...correoRules}
        />

        <TextField
          className="inputText"
          label="Empleados a cargo"
          type="number"
          size="small"
          error={errors.empleados ? true : false}
          helperText={errors.empleados ? errors.empleados.message : ""}
          {...empleadosRules}
        />

        <SearchEmpresaImput
          realValue={realValue}
          setRealValue={setRealValue}
          error={errors.empresa}
          clearErrors={clearErrors}
        />
      </div>

      {children}
    </form>
  );
};

export default ContactoUpdateForm;
