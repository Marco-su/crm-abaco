import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  TextField,
  FormControl,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import UseDebounce from "../../Hooks/UseDebounce";
import { apiBase } from "../../constants/baseUrls";

const SearchEmpresaImput = ({
  realValue,
  setRealValue,
  error,
  clearErrors,
}) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const readOnlyEmpresa = useSelector((store) => store.modals.readOnlyEmpresa);

  const debouncedSearchTerm = UseDebounce(inputValue, 650);

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios({
        url: `${apiBase}/empresas/search`,
        method: "POST",
        data: { term: debouncedSearchTerm },
      })
        .then((res) => {
          let element = null;

          if (res.data && realValue && res.data.length > 0) {
            element = res.data.find((el) => el.id === realValue.id);
          }

          if (element) {
            setOptions(res.data);
          } else {
            setOptions([...res.data, realValue]);
          }
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line
  }, [debouncedSearchTerm]);

  return (
    <FormControl>
      {readOnlyEmpresa ? (
        <TextField
          className="inputText"
          label="Empresa"
          size="small"
          value={realValue.nombre}
          InputProps={{ readOnly: true }}
        />
      ) : (
        <Autocomplete
          className="inputText"
          value={realValue}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(e, newValue) => {
            setRealValue(newValue);
            clearErrors("empresa");
          }}
          inputValue={inputValue}
          onInputChange={(e, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={options}
          getOptionLabel={(option) => (option ? option.nombre : "")}
          renderInput={(params) => (
            <TextField {...params} label="Empresa" size="small" />
          )}
        />
      )}

      {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
    </FormControl>
  );
};

export default SearchEmpresaImput;
