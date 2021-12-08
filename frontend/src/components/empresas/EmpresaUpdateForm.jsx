import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { updateEmpresa } from "../../store/actions/empresa.actions";
import { capitalizeFirstLetter } from "../../helpers/firstLetterUppercase";

const EmpresaUpdateForm = ({ children }) => {
  // STATES
  const dispatch = useDispatch();
  const location = useLocation();

  let listToFind = "";

  switch (location.pathname) {
    case "/prospectos":
      listToFind = "prospectos";
      break;

    case "/clientes":
      listToFind = "clientes";
      break;

    default:
      listToFind = "lista";
      break;
  }

  const empresas = useSelector((store) => store.empresas[listToFind]);
  const empresaId = useSelector((store) => store.modals.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const item = empresas.find((el) => el.id === empresaId);

  // EFFECTS
  useEffect(() => {
    if (item) {
      setValue("nombre", item.nombre);
      setValue("vertical", item.vertical);
    }
  }, [item, setValue, empresaId]);

  // HANDLES
  const onSubmit = (data) => {
    data.id = empresaId;

    Object.keys(data).forEach((el) => {
      if (typeof data[el] === "string") {
        data[el] = capitalizeFirstLetter(data[el]);
      }
    });

    switch (location.pathname) {
      case "/prospectos":
        dispatch(updateEmpresa(data, "prospectos"));
        break;

      case "/clientes":
        dispatch(updateEmpresa(data, "clientes"));
        break;

      default:
        dispatch(updateEmpresa(data, "empresas"));
        break;
    }
  };

  // RULES
  const nombreRules = register("nombre", {
    required: {
      value: true,
      message: "La empresa debe tener un nombre.",
    },
    maxLength: {
      value: 120,
      message: "Nombre muy largo (máximo 120 caracteres).",
    },
  });

  const verticalRules = register("vertical", {
    required: {
      value: true,
      message: "Se requiere la vertical de negocios.",
    },
    maxLength: {
      value: 120,
      message: "Vertical muy larga (máximo 120 caracteres).",
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
          label="Vertical"
          maxRows={2}
          size="small"
          error={errors.vertical ? true : false}
          helperText={errors.vertical ? errors.vertical.message : ""}
          {...verticalRules}
        />
      </div>

      {children}
    </form>
  );
};

export default EmpresaUpdateForm;
