import {
  TextField,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  InputLabel,
  Select,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Close, Add } from "@mui/icons-material";
import { Controller, useFieldArray } from "react-hook-form";

const EditorInfo = ({
  register,
  errors,
  radioIngresos,
  setRadioIngresos,
  radioEmpleados,
  setRadioEmpleados,
  control,
  empresa,
  empleadosDefault,
  ingresosDefault,
}) => {
  // STATES
  const {
    fields: correoFields,
    append: correoAppend,
    remove: correoRemove,
  } = useFieldArray({
    control,
    name: "correos",
  });

  const {
    fields: telfFields,
    append: telfAppend,
    remove: telfRemove,
  } = useFieldArray({
    control,
    name: "telefonos",
  });

  // HANDLES
  const handleChangeRadioIngresos = (e) => {
    setRadioIngresos(e.target.value);
  };

  const handleChangeRadioEmpleados = (e) => {
    setRadioEmpleados(e.target.value);
  };

  //  RULES CONSTANTS
  const correoRuleObject = {
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Correo no válido. Ejemplo válido: usuario@dominio.tld",
    },
  };

  const telefonoRuleObject = {
    maxLength: {
      value: 60,
      message: "Número muy largo (máximo 60 caracteres).",
    },
    pattern: {
      value: /^[0-9]*$/,
      message: "Número no valido.",
    },
  };

  const rangeRuleObject = {
    maxLength: {
      value: 255,
      message: "Número muy grande para ser procesado",
    },
    pattern: {
      value: /^[0-9]*$/,
      message: "Número no valido.",
    },
  };

  const fuenteRuleObject = {
    maxLength: {
      value: 1000,
      message: "Fuente muy larga (máximo 1000 caracteres)",
    },
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

  const propiedadRules = {
    maxLength: {
      value: 120,
      message: "Propiedad muy larga (máximo 120 caracteres).",
    },
  };

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

  // RENDER
  return (
    <>
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

        <FormControl>
          <InputLabel id="propiedad">Tipo de propiedad</InputLabel>

          <Controller
            control={control}
            name="propiedad"
            defaultValue={empresa.propiedad}
            render={({ field }) => (
              <Select
                {...field}
                label="Tipo de propiedad"
                labelId="propiedad"
                size="small"
                MenuProps={{ sx: { maxHeight: 300 } }}
                error={errors.propiedad ? true : false}
              >
                <MenuItem value="privada">Privada</MenuItem>
                <MenuItem value="publica">Pública</MenuItem>
                <MenuItem value="otra">Otra</MenuItem>
              </Select>
            )}
            rules={propiedadRules}
          />

          {errors.propiedad ? (
            <FormHelperText error>{errors.propiedad.message}</FormHelperText>
          ) : null}
        </FormControl>

        <TextField
          className="inputText"
          label="Representante legal"
          type="text"
          size="small"
          error={errors.representante ? true : false}
          helperText={errors.representante ? errors.representante.message : ""}
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
      </div>

      <div className="mt-5">
        <h2 className="mb-3">Correos de la empresa</h2>
        <div className="upFormInputsBox">
          {correoFields.map((el, index) => (
            <div className="otherSiteBox" key={`inputEmail-${index}`}>
              <Controller
                control={control}
                name={`correos[${index}].correo`}
                defaultValue={el.correo ? el.correo : ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="inputText"
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
                rules={correoRuleObject}
              />

              <Tooltip title="Eliminar correo electrónico">
                <IconButton
                  color="info"
                  onClick={() => correoRemove(index)}
                  className="ms-2"
                >
                  <Close />
                </IconButton>
              </Tooltip>
            </div>
          ))}

          <div className="addButtonBox">
            <Tooltip title="Agregar correo adicional">
              <IconButton
                color="primary"
                onClick={() => {
                  correoAppend({ correo: "", id: "" });
                }}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="mb-3">Telefonos de la empresa</h2>
        <div className="upFormInputsBox">
          {telfFields.map((el, index) => (
            <div className="otherSiteBox" key={`inputTelf-${index}`}>
              <Controller
                control={control}
                name={`telefonos[${index}].numero`}
                defaultValue={el.numero ? el.numero : ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="inputText"
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
                rules={telefonoRuleObject}
              />

              <Tooltip title="Eliminar Teléfono">
                <IconButton
                  color="info"
                  onClick={() => telfRemove(index)}
                  className="ms-2"
                >
                  <Close />
                </IconButton>
              </Tooltip>
            </div>
          ))}

          <div className="addButtonBox">
            <Tooltip title="Agregar número telefónico">
              <IconButton
                color="primary"
                onClick={() => {
                  telfAppend({ numero: "", id: "" });
                }}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="mb-2">Ingresos</h2>
        <div className="upFormInputsBox">
          <FormControl>
            <RadioGroup
              name="controlled-radio-buttons-group"
              value={radioIngresos}
              onChange={handleChangeRadioIngresos}
            >
              <FormControlLabel
                value="puntual"
                label="Ingresos anuales puntuales"
                control={<Radio />}
              />
              <FormControlLabel
                value="rango"
                control={<Radio />}
                label="Ingresos anuales por rango"
              />
            </RadioGroup>
          </FormControl>

          {radioIngresos === "puntual" ? (
            <>
              <Controller
                control={control}
                name="ingresos_anuales"
                defaultValue={ingresosDefault.puntual}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="inputText"
                    label="Ingresos anuales"
                    size="small"
                    type="number"
                    error={errors.ingresos_anuales ? true : false}
                    helperText={
                      errors.ingresos_anuales
                        ? errors.ingresos_anuales.message
                        : ""
                    }
                  />
                )}
                rules={rangeRuleObject}
              />
            </>
          ) : (
            <>
              <Controller
                control={control}
                name="ingresosInf"
                defaultValue={ingresosDefault.limInf}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="inputText"
                    label="Ingresos anuales (límite inferior)"
                    size="small"
                    type="number"
                    error={errors.ingresosInf ? true : false}
                    helperText={
                      errors.ingresosInf ? errors.ingresosInf.message : ""
                    }
                  />
                )}
                rules={rangeRuleObject}
              />

              <Controller
                control={control}
                name="ingresosSup"
                defaultValue={ingresosDefault.limSup}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="inputText"
                    label="Ingresos anuales (límite superior)"
                    size="small"
                    type="number"
                    error={errors.ingresosSup ? true : false}
                    helperText={
                      errors.ingresosSup ? errors.ingresosSup.message : ""
                    }
                  />
                )}
                rules={rangeRuleObject}
              />
            </>
          )}

          <Controller
            control={control}
            name="ingresosFuente"
            render={({ field }) => (
              <TextField
                {...field}
                className="inputText"
                label="Fuente de información (ingresos)"
                size="small"
                error={errors.ingresosFuente ? true : false}
                helperText={
                  errors.ingresosFuente ? errors.ingresosFuente.message : ""
                }
              />
            )}
            rules={fuenteRuleObject}
          />
        </div>
      </div>

      <div className="mt-5">
        <h2 className="mb-2">Número de empleados</h2>
        <div className="upFormInputsBox">
          <FormControl>
            <RadioGroup
              name="controlled-radio-buttons-group"
              value={radioEmpleados}
              onChange={handleChangeRadioEmpleados}
            >
              <FormControlLabel
                value="puntual"
                label="Número de empleados puntual"
                control={<Radio />}
              />
              <FormControlLabel
                value="rango"
                control={<Radio />}
                label="Número de empleados por rango"
              />
            </RadioGroup>
          </FormControl>

          {radioEmpleados === "puntual" ? (
            <>
              <Controller
                control={control}
                name="empleados"
                defaultValue={empleadosDefault.puntual}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="inputText"
                    label="Número de empleados"
                    size="small"
                    type="number"
                    error={errors.empleados ? true : false}
                    helperText={
                      errors.empleados ? errors.empleados.message : ""
                    }
                  />
                )}
                rules={rangeRuleObject}
              />
            </>
          ) : (
            <>
              <Controller
                control={control}
                name="empleadosInf"
                defaultValue={empleadosDefault.limInf}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="inputText"
                    label="Empleados (límite inferior)"
                    size="small"
                    type="number"
                    error={errors.empleadosInf ? true : false}
                    helperText={
                      errors.empleadosInf ? errors.empleadosInf.message : ""
                    }
                  />
                )}
                rules={rangeRuleObject}
              />

              <Controller
                control={control}
                name="empleadosSup"
                defaultValue={empleadosDefault.limSup}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="inputText"
                    label="Empleados (límite superior)"
                    size="small"
                    type="number"
                    error={errors.empleadosSup ? true : false}
                    helperText={
                      errors.empleadosSup ? errors.empleadosSup.message : ""
                    }
                  />
                )}
                rules={rangeRuleObject}
              />
            </>
          )}

          <Controller
            control={control}
            name="empleadosFuente"
            render={({ field }) => (
              <TextField
                {...field}
                className="inputText"
                label="Fuente de información (cantidad de empleados)"
                size="small"
                error={errors.empleadosFuente ? true : false}
                helperText={
                  errors.empleadosFuente ? errors.empleadosFuente.message : ""
                }
              />
            )}
            rules={fuenteRuleObject}
          />
        </div>
      </div>
    </>
  );
};

export default EditorInfo;
