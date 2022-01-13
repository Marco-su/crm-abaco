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
        setValue("empleados", item.empleados);
        setValue("representante", item.representante);
        setValue("nit", item.nit);
        setValue("ingresos_anuales", item.ingresos_anuales);

        if (item.contactos[0]) {
          setValue("nombreContacto", item.contactos[0].nombre);
          setValue("apellido", item.contactos[0].apellido);
          setValue("dni", item.contactos[0].dni);
          setValue("cargo", item.contactos[0].cargo);
          setValue("correo", item.contactos[0].correo);
          setValue("empleadosContacto", item.contactos[0].empleados);
        }

        if (item.direcciones[0]) {
          setValue("calle", item.direcciones[0].calle);
          setValue("ciudad", item.direcciones[0].ciudad);
          setValue("codigoPostal", item.direcciones[0].codigoPostal);
          setValue("estado", item.direcciones[0].estado);
          setValue("pais", item.direcciones[0].pais);
        }
      }
    }
  }, [item, setValue, empresaId, updateType]);

  // HANDLES
  const onSubmit = (data) => {
    let newData = {};
    let contactoId = null;
    let direccionId = null;

    if (item.contactos[0]) {
      contactoId = item.contactos[0].id;
    }
    if (item.direcciones[0]) {
      direccionId = item.direcciones[0].id;
    }

    Object.keys(data).forEach((el) => {
      if (el === "nombre" || el === "representante") {
        data[el] = capitalizeFirstLetter(data[el]);
      }
    });

    const {
      nombre,
      nit,
      representante,
      vertical,
      propiedad,
      empleados,
      ingresos_anuales,
      nombreContacto,
      apellido,
      empleadosContacto,
      correo,
      dni,
      cargo,
      calle,
      ciudad,
      codigoPostal,
      estado,
      pais,
    } = data;

    newData = {
      id: empresaId,
      nombre,
      nit,
      representante,
      vertical,
      propiedad,
      empleados,
      ingresos_anuales,
      contactos: [
        {
          id: contactoId,
          nombre: nombreContacto,
          apellido,
          empleados: empleadosContacto,
          correo,
          dni,
          cargo,
        },
      ],
      direcciones: [
        {
          id: direccionId,
          calle,
          ciudad,
          codigoPostal,
          estado,
          pais,
        },
      ],
    };

    if (updateType === "empresa") {
      switch (location.pathname) {
        case "/prospectos":
          dispatch(updateEmpresa(newData, "prospectos"));
          break;

        case "/clientes":
          dispatch(updateEmpresa(newData, "clientes"));
          break;

        default:
          dispatch(updateEmpresa(newData, "empresas"));
          break;
      }
    } else if (updateType.toLowerCase().includes("create")) {
      dispatch(createEmpresa(newData, navigate));
    }
  };

  // RULES
  // info rules
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

  const representanteRules = register("representante", {
    maxLength: {
      value: 120,
      message: "Nombre de representante muy largo (máximo 120 caracteres).",
    },
  });

  const nitRules = register("nit", {
    maxLength: {
      value: 120,
      message: "NIT muy largo (máximo 120 caracteres).",
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

  // contacto rules
  const nombreContactoRules = register("nombreContacto", {
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

  const empleadosContactoRules = register("empleadosContacto", {
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
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Correo no válido. Ejemplo válido: usuario@dominio.tld",
    },
  });

  // direccion rules
  const calleRules = register("calle", {
    maxLength: {
      value: 255,
      message: "Máximo 255 caracteres.",
    },
  });

  const ciudadRules = register("ciudad", {
    maxLength: {
      value: 255,
      message: "Máximo 255 caracteres.",
    },
  });

  const estadoRules = register("estado", {
    maxLength: {
      value: 255,
      message: "Máximo 255 caracteres.",
    },
  });

  const codigoRules = register("codigoPostal", {
    maxLength: {
      value: 255,
      message: "Máximo 255 caracteres.",
    },
  });

  const paisRules = register("pais", {
    maxLength: {
      value: 255,
      message: "Máximo 255 caracteres.",
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
              error={errors.propiedad ? true : false}
              helperText={errors.propiedad ? errors.propiedad.message : ""}
              {...propiedadRules}
            >
              <MenuItem value="Privada">Privada</MenuItem>
              <MenuItem value="Publica">Pública</MenuItem>
              <MenuItem value="Otra">Otra</MenuItem>
            </TextField>

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
              label="Representante legal"
              type="text"
              size="small"
              error={errors.representante ? true : false}
              helperText={
                errors.representante ? errors.representante.message : ""
              }
              {...representanteRules}
            />

            <TextField
              className="inputText"
              label="Número de Identificación Tributaria (NIT)"
              type="text"
              size="small"
              error={errors.nit ? true : false}
              helperText={errors.nit ? errors.nit.message : ""}
              {...nitRules}
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
          <h2>Contacto principal</h2>
          <div className="upFormInputsBox">
            <TextField
              className="inputText"
              label="Nombre"
              size="small"
              error={errors.nombreContacto ? true : false}
              helperText={
                errors.nombreContacto ? errors.nombreContacto.message : ""
              }
              {...nombreContactoRules}
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
              label="Cargo"
              size="small"
              error={errors.cargo ? true : false}
              helperText={errors.cargo ? errors.cargo.message : ""}
              {...cargoRules}
            ></TextField>

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
              {...empleadosContactoRules}
            />
          </div>
        </div>

        <div>
          <h2>Dirección principal</h2>
          <div className="upFormInputsBox">
            <TextField
              className="inputText"
              label="Calle"
              size="small"
              error={errors.calle ? true : false}
              helperText={errors.calle ? errors.calle.message : ""}
              {...calleRules}
            />

            <TextField
              className="inputText"
              label="Ciudad"
              size="small"
              error={errors.ciudad ? true : false}
              helperText={errors.ciudad ? errors.ciudad.message : ""}
              {...ciudadRules}
            />

            <TextField
              className="inputText"
              label="Estado o provincia"
              size="small"
              error={errors.estado ? true : false}
              helperText={errors.estado ? errors.estado.message : ""}
              {...estadoRules}
            />

            <TextField
              className="inputText"
              label="Código postal"
              size="small"
              error={errors.codigoPostal ? true : false}
              helperText={
                errors.codigoPostal ? errors.codigoPostal.message : ""
              }
              {...codigoRules}
            />

            <TextField
              className="inputText"
              label="País"
              size="small"
              error={errors.pais ? true : false}
              helperText={errors.pais ? errors.pais.message : ""}
              {...paisRules}
            />
          </div>
        </div>
      </div>

      {children}
    </form>
  );
};

export default EmpresaUpdateForm;
