import { TextField, MenuItem } from "@mui/material";

const ContactoUpdateForm = ({ children }) => {
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
      </div>

      {children}
    </form>
  );
};

export default ContactoUpdateForm;
