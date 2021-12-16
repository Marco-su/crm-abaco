import axios from "axios";
import { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import UseDebounce from "../../Hooks/UseDebounce";
import { apiBase } from "../../constants/baseUrls";

const SearchEmpresaImput = ({ realValue, setRealValue, error, rules }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

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
      <Autocomplete
        className="inputText"
        value={realValue}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(e, newValue) => {
          setRealValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(e, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable"
        options={options}
        getOptionLabel={(option) => (option ? option.nombre : "")}
        renderInput={(params) => (
          <TextField {...params} label="Empresa" size="small" {...rules} />
        )}
      />

      {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
    </FormControl>
  );
};

export default SearchEmpresaImput;
