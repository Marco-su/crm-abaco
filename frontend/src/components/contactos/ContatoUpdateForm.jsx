import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { updateContacto } from "../../store/actions/contacto.actions";
import { capitalizeFirstLetter } from "../../helpers/firstLetterUppercase";

const ContactoUpdateForm = ({ children }) => {
  // STATES
  const dispatch = useDispatch();

  const contactos = useSelector((store) => store.contactos.lista);
  const contactoId = useSelector((store) => store.modals.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const item = contactos.find((el) => el.id === contactoId);

  // EFFECTS
  useEffect(() => {
    if (item) {
      setValue("nombre", item.nombre);
      setValue("apellido", item.apellido);
      setValue("cargo", item.cargo);
    }
  }, [item, contactoId, setValue]);

  // HANDLES
  const onSubmit = (data) => {
    Object.keys(data).forEach((el) => {
      if (typeof data[el] === "string") {
        data[el] = capitalizeFirstLetter(data[el]);
      }
    });

    dispatch(updateContacto({ ...data, id: contactoId }));
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

  // RENDER
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="upFormInputsBox">
        <TextField
          className="inputText"
          label="Nombre"
          maxRows={2}
          size="small"
          error={errors.nombre ? true : false}
          helperText={errors.nombre ? errors.nombre.message : ""}
          {...nombreRules}
        />

        <TextField
          className="inputText"
          label="Apellido"
          maxRows={2}
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
      </div>

      {children}
    </form>
  );
};

export default ContactoUpdateForm;
