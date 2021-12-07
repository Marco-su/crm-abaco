import {
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";

import { countries } from "../../constants/countriesCodes";
import { alphabeticalOrder } from "../../helpers/alphabeticalOrder";

const PhoneInput = ({ label, tipo, register, errors }) => {
  const orderedCountries = alphabeticalOrder(countries, "code");

  return (
    <div className="phoneInputBox">
      <FormControl sx={{ minWidth: 120, marginRight: 1 }}>
        <InputLabel id={`select-${tipo}`}>Código</InputLabel>
        <Select
          label="Código"
          labelId={`select-${tipo}`}
          size="small"
          defaultValue={57}
          MenuProps={{ sx: { maxHeight: 300 } }}
          error={errors[`cod${tipo}`] ? true : false}
          {...register(`cod${tipo}`, {
            required: {
              value: true,
              message: "Código requerido",
            },
          })}
        >
          {orderedCountries.map((el) => (
            <MenuItem value={el.phone} key={`${el.phone}-${el.code}`}>
              <img
                className="smallFlag"
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${el.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${el.code.toLowerCase()}.png 2x`}
                alt=""
              />
              ({el.code}) +{el.phone}
            </MenuItem>
          ))}
        </Select>
        {errors[`cod${tipo}`] ? (
          <FormHelperText error>{errors[`cod${tipo}`].message}</FormHelperText>
        ) : null}
      </FormControl>

      <TextField
        className="inputText"
        label={label}
        multiline
        maxRows={2}
        size="small"
        // value={value}
        error={errors[`numero${tipo}`] ? true : false}
        helperText={
          errors[`numero${tipo}`] ? errors[`numero${tipo}`].message : ""
        }
        {...register(`numero${tipo}`, {
          required: {
            value: true,
            message: "Número telefónico requerido.",
          },
          maxLength: {
            value: 60,
            message: "Número muy largo (máximo 60 caracteres).",
          },
          pattern: {
            value: /^[0-9]*$/,
            message: "Formato no valido.",
          },
        })}
      />
    </div>
  );
};

export default PhoneInput;
