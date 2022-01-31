import { Controller, useFieldArray } from "react-hook-form";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Tooltip,
  IconButton,
} from "@mui/material";

import { Close } from "@mui/icons-material";

const DireccionesInputs = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "direcciones",
  });

  const rule = {
    maxLength: {
      value: 255,
      message: "máximo 255 caracteres",
    },
  };

  return (
    <div>
      {fields.map((el, index) => (
        <div key={`${index}-direccion`}>
          <div className="direccionTitle">
            <h2>Direccion #{index + 1}</h2>

            <Tooltip title={`Eliminar dirección #${index + 1}`}>
              <IconButton
                color="info"
                onClick={() => remove(index)}
                className="ms-2"
              >
                <Close />
              </IconButton>
            </Tooltip>
          </div>

          <div className="upFormInputsBox">
            <Controller
              control={control}
              name={`direcciones[${index}].calle`}
              defaultValue={el.calle ? el.calle : ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Calle"
                  size="small"
                  error={
                    errors.direcciones
                      ? errors.direcciones[index]
                        ? errors.direcciones[index].calle
                          ? true
                          : false
                        : false
                      : false
                  }
                  helperText={
                    errors.direcciones
                      ? errors.direcciones[index]
                        ? errors.direcciones[index].calle
                          ? errors.direcciones[index].calle.message
                          : ""
                        : ""
                      : ""
                  }
                />
              )}
              rules={rule}
            />

            <Controller
              control={control}
              name={`direcciones[${index}].ciudad`}
              defaultValue={el.ciudad ? el.ciudad : ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ciudad"
                  size="small"
                  error={
                    errors.direcciones
                      ? errors.direcciones[index]
                        ? errors.direcciones[index].ciudad
                          ? true
                          : false
                        : false
                      : false
                  }
                  helperText={
                    errors.direcciones
                      ? errors.direcciones[index]
                        ? errors.direcciones[index].ciudad
                          ? errors.direcciones[index].ciudad.message
                          : ""
                        : ""
                      : ""
                  }
                />
              )}
              rules={rule}
            />

            <Controller
              control={control}
              name={`direcciones[${index}].estado`}
              defaultValue={el.estado ? el.estado : ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Estado"
                  size="small"
                  error={
                    errors.direcciones
                      ? errors.direcciones[index]
                        ? errors.direcciones[index].estado
                          ? true
                          : false
                        : false
                      : false
                  }
                  helperText={
                    errors.direcciones
                      ? errors.direcciones[index]
                        ? errors.direcciones[index].estado
                          ? errors.direcciones[index].estado.message
                          : ""
                        : ""
                      : ""
                  }
                />
              )}
              rules={rule}
            />

            <Controller
              control={control}
              name={`direcciones[${index}].codigoPostal`}
              defaultValue={el.codigoPostal ? el.codigoPostal : ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Código postal"
                  size="small"
                  error={
                    errors.direcciones
                      ? errors.direcciones[index]
                        ? errors.direcciones[index].codigoPostal
                          ? true
                          : false
                        : false
                      : false
                  }
                  helperText={
                    errors.direcciones
                      ? errors.direcciones[index]
                        ? errors.direcciones[index].codigoPostal
                          ? errors.direcciones[index].codigoPostal.message
                          : ""
                        : ""
                      : ""
                  }
                />
              )}
              rules={rule}
            />

            <Controller
              control={control}
              name={`direcciones[${index}].pais`}
              defaultValue={el.pais ? el.pais : ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="País"
                  size="small"
                  error={
                    errors.direcciones
                      ? errors.direcciones[index]
                        ? errors.direcciones[index].pais
                          ? true
                          : false
                        : false
                      : false
                  }
                  helperText={
                    errors.direcciones
                      ? errors.direcciones[index]
                        ? errors.direcciones[index].pais
                          ? errors.direcciones[index].pais.message
                          : ""
                        : ""
                      : ""
                  }
                />
              )}
              rules={rule}
            />

            <FormControl>
              <InputLabel id="tipoDir">Tipo de propiedad</InputLabel>

              <Controller
                control={control}
                name={`direcciones[${index}].tipo`}
                defaultValue={el.tipo ? el.tipo : ""}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Tipo de dirección"
                    labelId="tipoDir"
                    size="small"
                    MenuProps={{ sx: { maxHeight: 300 } }}
                    error={
                      errors.direcciones
                        ? errors.direcciones[index]
                          ? errors.direcciones[index].tipo
                            ? true
                            : false
                          : false
                        : false
                    }
                  >
                    <MenuItem value="facturacion">
                      Dirección de facturación
                    </MenuItem>
                    <MenuItem value="envio">Dirección de envío</MenuItem>
                  </Select>
                )}
                rules={rule}
              />

              {errors.direcciones ? (
                errors.direcciones[index] ? (
                  errors.direcciones[index].tipo ? (
                    <FormHelperText error>
                      {errors.propiedad.message}
                    </FormHelperText>
                  ) : null
                ) : null
              ) : null}
            </FormControl>
          </div>
        </div>
      ))}

      <div>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            append({
              calle: "",
              ciudad: "",
              estado: "",
              codigoPostal: "",
              pais: "",
              tipo: "facturacion",
              id: "",
            });
          }}
        >
          Agregar direccion adicional
        </Button>
      </div>
    </div>
  );
};

export default DireccionesInputs;
