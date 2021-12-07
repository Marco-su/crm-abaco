import {
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { countries } from "../../constants/countriesCodes";
import { alphabeticalOrder } from "../../helpers/alphabeticalOrder";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginRight: 10,
  },
  menuPaper: {
    maxHeight: 300,
  },
}));

const EmpleadoUpdateForm = ({ children }) => {
  const orderedCountries = alphabeticalOrder(countries, "code");
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {};

  return (
    <form onSubmit={handleSubmit}>
      <div className="upFormInputsBox">
        <TextField
          className="inputText"
          label="Nombre"
          multiline
          maxRows={2}
          size="small"
          // value={value}
          onChange={handleChange}
        />

        <TextField
          className="inputText"
          label="Apellido"
          multiline
          maxRows={2}
          size="small"
          // value={value}
          onChange={handleChange}
        />

        <TextField
          className="inputText"
          label="Cargo"
          size="small"
          // value={value}
          select
          defaultValue="Una"
          onChange={handleChange}
        >
          <MenuItem value="Una">Una opción</MenuItem>
          <MenuItem value="Otra">Otra opcion</MenuItem>
        </TextField>

        <div className="phoneInputBox">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Código</InputLabel>
            <Select
              label="Código"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              defaultValue={57}
              onChange={handleChange}
              MenuProps={{ classes: { paper: classes.menuPaper } }}
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
          </FormControl>

          <TextField
            className="inputText"
            label="Teléfono"
            multiline
            maxRows={2}
            size="small"
            // value={value}
            onChange={handleChange}
          />
        </div>

        <TextField
          className="inputText"
          label="Correo electrónico"
          multiline
          maxRows={2}
          size="small"
          // value={value}
          onChange={handleChange}
        />
      </div>

      {children}
    </form>
  );
};

export default EmpleadoUpdateForm;
