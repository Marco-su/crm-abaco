import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Tooltip, IconButton } from "@mui/material";
import {
  Close,
  Add,
  LinkedIn,
  Facebook,
  Instagram,
  Twitter,
} from "@mui/icons-material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const [realValue, setRealValue] = useState({ id: "", nombre: "" });

  const updateType = useSelector((store) => store.modals.updateType);
  const contactos = useSelector((store) => store.contactos.lista);
  const contactoId = useSelector((store) => store.modals.id);
  const readOnlyEmpresa = useSelector((store) => store.modals.readOnlyEmpresa);
  const empresa = useSelector((store) => store.empresas.empresa);

  let correosDefault = [];
  let telefonosDefault = [];
  let item = contactos.find((el) => el.id === contactoId);

  if (!item) {
    item = {
      nombre: "",
      apellido: "",
      correo: "",
      empleados: "",
      dni: "",
      cargo: "",
      correos: [],
    };
  }

  if (item.correos.length === 0) {
    correosDefault = [{ correo: "" }];
    telefonosDefault = [{ numero: "" }];
  } else {
    correosDefault = item.correos;
    telefonosDefault = item.telefonos;
  }

  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    control,
  } = useForm({
    defaultValues: {
      correos: correosDefault,
      telefonos: telefonosDefault,
    },
  });

  const {
    fields: fieldsCorreo,
    append: appendCorreo,
    remove: removeCorreo,
  } = useFieldArray({
    control,
    name: "correos",
  });

  const {
    fields: fieldsTelf,
    append: appendTelf,
    remove: removeTelf,
  } = useFieldArray({
    control,
    name: "telefonos",
  });

  // EFFECTS
  useEffect(() => {
    if (updateType === "contacto") {
      if (item) {
        setRealValue({
          id: item.empresa.id,
          nombre: item.empresa.nombre,
        });
      }
    } else if (updateType === "contactoCreate" && readOnlyEmpresa) {
      setRealValue({
        id: empresa.id,
        nombre: empresa.nombre,
      });
    } else if (!readOnlyEmpresa) {
      setRealValue({
        id: "",
        nombre: "",
      });
    }
    // eslint-disable-next-line
  }, [
    contactoId,
    updateType,
    location,
    readOnlyEmpresa,
    empresa.id,
    empresa.nombre,
  ]);

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
  const nombreRules = {
    required: {
      value: true,
      message: "El contacto debe tener un nombre.",
    },
    maxLength: {
      value: 120,
      message: "Nombre muy largo (máximo 120 caracteres).",
    },
  };

  const apellidoRules = {
    required: {
      value: true,
      message: "El contacto debe tener un apellido.",
    },
    maxLength: {
      value: 120,
      message: "Apellido muy largo (máximo 120 caracteres).",
    },
  };

  const cargoRules = {
    maxLength: {
      value: 120,
      message: "Cargo muy largo (máximo 120 caracteres).",
    },
  };

  const dniRules = {
    maxLength: {
      value: 255,
      message: "Documento de identidad muy largo (máximo 255 caracteres).",
    },
  };

  const empleadosRules = {
    max: {
      value: 1000000,
      message:
        "Número de empleados muy grande para procesar (máximo un millon)",
    },
    min: {
      value: 0,
      message: "No se admiten números negativos",
    },
  };

  const redesRules = {
    maxLength: {
      value: 1000,
      message: "Enlace muy largo (máximo 1000 caracteres).",
    },
  };

  const correoRules = {
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Correo no válido. Ejemplo válido: usuario@dominio.tld",
    },
  };

  const telefonoRules = {
    maxLength: {
      value: 60,
      message: "Número muy largo (máximo 60 caracteres).",
    },
    pattern: {
      value: /^[0-9]*$/,
      message: "Número no valido.",
    },
  };

  // RENDER
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="inputs-main-box">
        <h2>Información</h2>
        <div className="inputs-box">
          <Controller
            control={control}
            name="nombre"
            defaultValue={item.nombre ? item.nombre : ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                size="small"
                error={errors.nombre ? true : false}
                helperText={errors.nombre ? errors.nombre.message : ""}
              />
            )}
            rules={nombreRules}
          />

          <Controller
            control={control}
            name="apellido"
            defaultValue={item.apellido ? item.apellido : ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Apellido"
                size="small"
                error={errors.apellido ? true : false}
                helperText={errors.apellido ? errors.apellido.message : ""}
              />
            )}
            rules={apellidoRules}
          />

          <Controller
            control={control}
            name="dni"
            defaultValue={item.dni ? item.dni : ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Documento de Identidad"
                size="small"
                error={errors.dni ? true : false}
                helperText={errors.dni ? errors.dni.message : ""}
              />
            )}
            rules={dniRules}
          />

          <Controller
            control={control}
            name="cargo"
            defaultValue={item.cargo ? item.cargo : ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Cargo"
                size="small"
                error={errors.cargo ? true : false}
                helperText={errors.cargo ? errors.cargo.message : ""}
              />
            )}
            rules={cargoRules}
          />

          <Controller
            control={control}
            name="empleados"
            defaultValue={item.empleados ? item.empleados : ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Empleados a cargo"
                type="number"
                size="small"
                error={errors.empleados ? true : false}
                helperText={errors.empleados ? errors.empleados.message : ""}
              />
            )}
            rules={empleadosRules}
          />

          <SearchEmpresaImput
            realValue={realValue}
            setRealValue={setRealValue}
            error={errors.empresa}
            clearErrors={clearErrors}
          />
        </div>

        <h2>Redes Sociales</h2>
        <div className="inputs-box">
          <Controller
            control={control}
            name="linkedin"
            defaultValue={item.linkedin ? item.linkedin : ""}
            render={({ field }) => (
              <TextField
                {...field}
                label={
                  <span className="d-flex align-items-center">
                    <LinkedIn fontSize="12" className="me-1" />
                    LinkedIn
                  </span>
                }
                size="small"
                error={errors.linkedin ? true : false}
                helperText={errors.linkedin ? errors.linkedin.message : ""}
              />
            )}
            rules={redesRules}
          />

          <Controller
            control={control}
            name="facebook"
            defaultValue={item.facebook ? item.facebook : ""}
            render={({ field }) => (
              <TextField
                {...field}
                label={
                  <span className="d-flex align-items-center">
                    <Facebook fontSize="12" className="me-1" />
                    Facebook
                  </span>
                }
                size="small"
                error={errors.facebook ? true : false}
                helperText={errors.facebook ? errors.facebook.message : ""}
              />
            )}
            rules={redesRules}
          />

          <Controller
            control={control}
            name="instagram"
            defaultValue={item.instagram ? item.instagram : ""}
            render={({ field }) => (
              <TextField
                {...field}
                label={
                  <span className="d-flex align-items-center">
                    <Instagram fontSize="12" className="me-1" />
                    Instagram
                  </span>
                }
                size="small"
                error={errors.instagram ? true : false}
                helperText={errors.instagram ? errors.instagram.message : ""}
              />
            )}
            rules={redesRules}
          />

          <Controller
            control={control}
            name="twitter"
            defaultValue={item.twitter ? item.twitter : ""}
            render={({ field }) => (
              <TextField
                {...field}
                label={
                  <span className="d-flex align-items-center">
                    <Twitter fontSize="12" className="me-1" />
                    Twitter
                  </span>
                }
                size="small"
                error={errors.twitter ? true : false}
                helperText={errors.twitter ? errors.twitter.message : ""}
              />
            )}
            rules={redesRules}
          />
        </div>

        <h2>Teléfonos</h2>
        <div className="inputs-box">
          {fieldsTelf.map((el, index) => (
            <div key={`inputTelf-${index}`} className="aditional-input-text">
              <Controller
                control={control}
                name={`telefonos[${index}].numero`}
                defaultValue={el.numero ? el.numero : ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Número telefónico"
                    size="small"
                    error={
                      errors.telefonos
                        ? errors.telefonos[index]
                          ? errors.telefonos[index].numero
                            ? true
                            : false
                          : false
                        : false
                    }
                    helperText={
                      errors.telefonos
                        ? errors.telefonos[index]
                          ? errors.telefonos[index].numero
                            ? errors.telefonos[index].numero.message
                            : ""
                          : ""
                        : ""
                    }
                  />
                )}
                rules={telefonoRules}
              />

              <Tooltip title="Eliminar número telefónico">
                <IconButton
                  color="info"
                  onClick={() => removeTelf(index)}
                  className="ms-2"
                >
                  <Close />
                </IconButton>
              </Tooltip>
            </div>
          ))}

          <div className="addButtonBox">
            <Tooltip title="Agregar número">
              <IconButton
                color="primary"
                onClick={() => {
                  appendTelf({ numero: "" });
                }}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <h2>Correos electrónicos</h2>
        <div className="inputs-box">
          {fieldsCorreo.map((el, index) => (
            <div key={`inputCorreo-${index}`} className="aditional-input-text">
              <Controller
                control={control}
                name={`correos[${index}].correo`}
                defaultValue={el.correo ? el.correo : ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Correo electrónico"
                    size="small"
                    error={
                      errors.correos
                        ? errors.correos[index]
                          ? errors.correos[index].correo
                            ? true
                            : false
                          : false
                        : false
                    }
                    helperText={
                      errors.correos
                        ? errors.correos[index]
                          ? errors.correos[index].correo
                            ? errors.correos[index].correo.message
                            : ""
                          : ""
                        : ""
                    }
                  />
                )}
                rules={correoRules}
              />

              <Tooltip title="Eliminar correo">
                <IconButton
                  color="info"
                  onClick={() => removeCorreo(index)}
                  className="ms-2"
                >
                  <Close />
                </IconButton>
              </Tooltip>
            </div>
          ))}

          <div className="addButtonBox">
            <Tooltip title="Agregar correo">
              <IconButton
                color="primary"
                onClick={() => {
                  appendCorreo({ correo: "" });
                }}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      {children}
    </form>
  );
};

export default ContactoUpdateForm;
