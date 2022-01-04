import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import UseDebounce from "../../Hooks/UseDebounce";
import axios from "axios";
import { apiBase } from "../../constants/baseUrls";

const Destinatarios = ({
  errors,
  errorName,
  clearErrors,
  setInputArray,
  label,
}) => {
  // STATES
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [inputValue, setInputValue] = React.useState("");
  const debouncedSearchTerm = UseDebounce(inputValue, 500);

  // EFECTS
  React.useEffect(() => {
    let active = true;

    if (debouncedSearchTerm !== "") {
      const token = localStorage.getItem("token");
      setIsLoading(true);

      axios({
        url: `${apiBase}/mail/destinatarios`,
        method: "POST",
        headers: { "x-access-token": token },
        data: { term: debouncedSearchTerm },
      })
        .then((res) => {
          if (active) {
            setOptions(res.data);
          }
        })
        .catch((err) => {
          if (active) {
            setOptions([]);
            console.log("Error en busqueda de emails", err);
          }
        })
        .finally(() => {
          if (active) {
            setIsLoading(false);
          }
        });
    } else {
      setOptions([]);
    }

    return () => {
      active = false;
    };
    // eslint-disable-next-line
  }, [debouncedSearchTerm]);

  // RENDER
  return (
    <Autocomplete
      multiple
      size="small"
      className="mb-3"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.correo === value.correo}
      getOptionLabel={(option) => option.correo}
      options={options}
      loading={isLoading}
      onChange={(e, newValue) => {
        setInputArray(newValue.map((el) => el.correo));
        if (errors) {
          clearErrors(errorName);
        }
      }}
      onInputChange={(e, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
          }}
          error={errors && errors[errorName] ? true : false}
          helperText={
            errors && errors[errorName] ? errors[errorName].message : ""
          }
        />
      )}
    />
  );
};

export default Destinatarios;
