import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TextField, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  updateEmpresa,
  createEmpresa,
} from "../../store/actions/empresa.actions";
import { capitalizeFirstLetter } from "../../helpers/firstLetterUppercase";

const EmpresaUpdateForm = ({ children }) => {
  // STATES
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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

  const updateType = useSelector((store) => store.modals.updateType);
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
    if (updateType === "empresa") {
      if (item) {
        setValue("nombre", item.nombre);
        setValue("vertical", item.vertical);
      }
    }
  }, [item, setValue, empresaId, updateType]);

  // HANDLES
  const onSubmit = (data) => {
    data.id = empresaId;

    Object.keys(data).forEach((el) => {
      if (typeof data[el] === "string") {
        data[el] = capitalizeFirstLetter(data[el]);
      }
    });

    if (updateType === "empresa") {
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
    } else if (updateType.toLowerCase().includes("create")) {
      dispatch(createEmpresa(data, navigate));
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
    maxLength: {
      value: 120,
      message: "Vertical muy larga (máximo 120 caracteres).",
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

  const propiedadRules = register("propiedad", {});

  const ingresosRules = register("ingresos_anuales", {
    max: {
      value: 100000000000,
      message: "Número fuera de rango.",
    },
    min: {
      value: 0,
      message: "No se admiten números negativos.",
    },
  });

  // RENDER
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div>
        <div>
          <h2>Información</h2>
          <div className="upFormInputsBox">
            <TextField
              className="inputText"
              label="Nombre de la empresa"
              size="small"
              error={errors.nombre ? true : false}
              helperText={errors.nombre ? errors.nombre.message : ""}
              {...nombreRules}
            />

            <TextField
              className="inputText"
              label="Sector"
              size="small"
              error={errors.vertical ? true : false}
              helperText={errors.vertical ? errors.vertical.message : ""}
              {...verticalRules}
            />

            <TextField
              className="inputText"
              label="Propiedad"
              size="small"
              select
              defaultValue="Privada"
              error={errors.cargo ? true : false}
              helperText={errors.cargo ? errors.cargo.message : ""}
              {...propiedadRules}
            >
              <MenuItem value="Privada">Privada</MenuItem>
              <MenuItem value="Publica">Pública</MenuItem>
              <MenuItem value="Otra">Otra</MenuItem>
            </TextField>

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
              label="Número de empleados"
              type="number"
              size="small"
              error={errors.empleados ? true : false}
              helperText={errors.empleados ? errors.empleados.message : ""}
              {...empleadosRules}
            />

            <TextField
              className="inputText"
              label="Ingresos Anuales"
              type="number"
              size="small"
              error={errors.ingresos_anuales ? true : false}
              helperText={
                errors.ingresos_anuales ? errors.ingresos_anuales.message : ""
              }
              {...ingresosRules}
            />
          </div>
        </div>

        <div>
          <h2>Dirección de facturación</h2>
          <div className="upFormInputsBox">
            <TextField
              className="inputText"
              label="Calle"
              size="small"
              error={errors.calle_fact ? true : false}
              helperText={errors.calle_fact ? errors.calle_fact.message : ""}
              {...webRules}
            />

            <TextField
              className="inputText"
              label="Ciudad"
              size="small"
              error={errors.ciudad_fact ? true : false}
              helperText={errors.ciudad_fact ? errors.ciudad_fact.message : ""}
              {...webRules}
            />

            <TextField
              className="inputText"
              label="Estado o provincia"
              size="small"
              error={errors.estado_fact ? true : false}
              helperText={errors.estado_fact ? errors.estado_fact.message : ""}
              {...webRules}
            />

            <TextField
              className="inputText"
              label="Código postal"
              size="small"
              error={errors.codigo_fact ? true : false}
              helperText={errors.codigo_fact ? errors.codigo_fact.message : ""}
              {...webRules}
            />

            <TextField
              className="inputText"
              label="País"
              size="small"
              error={errors.pais_fact ? true : false}
              helperText={errors.pais_fact ? errors.pais_fact.message : ""}
              {...webRules}
            />
          </div>
        </div>

        <div>
          <h2>Dirección de envío</h2>
          <div className="upFormInputsBox">
            <TextField
              className="inputText"
              label="Calle"
              size="small"
              error={errors.calle_envio ? true : false}
              helperText={errors.calle_envio ? errors.calle_envio.message : ""}
              {...webRules}
            />

            <TextField
              className="inputText"
              label="Ciudad"
              size="small"
              error={errors.ciudad_envio ? true : false}
              helperText={
                errors.ciudad_envio ? errors.ciudad_envio.message : ""
              }
              {...webRules}
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
              label="Sitio Web"
              size="small"
              error={errors.web ? true : false}
              helperText={errors.web ? errors.web.message : ""}
              {...webRules}
            />

            <TextField
              className="inputText"
              label="Sitio Web"
              size="small"
              error={errors.web ? true : false}
              helperText={errors.web ? errors.web.message : ""}
              {...webRules}
            />
          </div>
        </div>
      </div>

      {children}
    </form>
  );
};

export default EmpresaUpdateForm;
