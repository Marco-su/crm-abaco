import { Controller } from "react-hook-form";
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

const PhoneInput = ({ label, tipo, errors, control, telf, register }) => {
  const orderedCountries = alphabeticalOrder(countries, "code");

  const numeroRules = register(`numero${tipo}`, {
    maxLength: {
      value: 60,
      message: "Número muy largo (máximo 60 caracteres).",
    },
    pattern: {
      value: /^[0-9]*$/,
      message: "Formato no valido.",
    },
  });

  return (
    <div className="phoneInputBox">
      <FormControl sx={{ minWidth: 120, marginRight: 1 }}>
        <InputLabel id={`select-${tipo}`}>Código</InputLabel>

        <Controller
          control={control}
          name={`cod${tipo}`}
          defaultValue={telf ? telf.codPais.replace("+", "") || "57" : "57"}
          render={({ field }) => (
            <Select
              className="selectCountryCode"
              {...field}
              label="Código"
              labelId={`select-${tipo}`}
              size="small"
              MenuProps={{ sx: { maxHeight: 300 } }}
              error={errors[`cod${tipo}`] ? true : false}
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
          )}
        />

        {errors[`cod${tipo}`] ? (
          <FormHelperText error>{errors[`cod${tipo}`].message}</FormHelperText>
        ) : null}
      </FormControl>

      <TextField
        className="inputText"
        label={label}
        size="small"
        error={errors[`numero${tipo}`] ? true : false}
        helperText={
          errors[`numero${tipo}`] ? errors[`numero${tipo}`].message : ""
        }
        {...numeroRules}
      />
    </div>
  );
};

export default PhoneInput;
