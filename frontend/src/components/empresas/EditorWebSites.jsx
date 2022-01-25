import { TextField, IconButton, Tooltip } from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { Controller, useFieldArray } from "react-hook-form";
import {
  Facebook,
  LinkedIn,
  Instagram,
  Twitter,
  Public,
} from "@mui/icons-material";

const EditorWebSites = ({ register, errors, control }) => {
  // STATES
  const { fields, append, remove } = useFieldArray({
    control,
    name: "webs",
  });

  const rule = {
    maxLength: {
      value: 1000,
      message: "Enlace muy largo (máximo 1000 caracteres).",
    },
    pattern: {
      value:
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      message: "URL no válida. Ejemplo válido: http://dominio.com",
    },
  };

  // RULES
  const siteRules = register("web", rule);

  const linkedinRules = register("linkedin", rule);

  const facebookRules = register("facebook", rule);

  const instagramRules = register("instagram", rule);

  const twitterRules = register("twitter", rule);

  // RENDER
  return (
    <div className="upFormInputsBox">
      <TextField
        className="inputText"
        label={
          <span className="d-flex align-items-center">
            <Public fontSize="12" className="me-1" />
            Sitio web de la empresa
          </span>
        }
        size="small"
        error={errors.web ? true : false}
        helperText={errors.web ? errors.web.message : ""}
        {...siteRules}
      />

      <TextField
        className="inputText"
        label={
          <span className="d-flex align-items-center">
            <LinkedIn fontSize="12" className="me-1" />
            LinkedIn
          </span>
        }
        size="small"
        error={errors.linkedin ? true : false}
        helperText={errors.linkedin ? errors.linkedin.message : ""}
        {...linkedinRules}
      />

      <TextField
        className="inputText"
        label={
          <span className="d-flex align-items-center">
            <Facebook fontSize="12" className="me-1" />
            Facebook
          </span>
        }
        size="small"
        error={errors.facebook ? true : false}
        helperText={errors.facebook ? errors.facebook.message : ""}
        {...facebookRules}
      />

      <TextField
        className="inputText"
        label={
          <span className="d-flex align-items-center">
            <Instagram fontSize="12" className="me-1" />
            Instagram
          </span>
        }
        size="small"
        error={errors.instagram ? true : false}
        helperText={errors.instagram ? errors.instagram.message : ""}
        {...instagramRules}
      />

      <TextField
        className="inputText"
        label={
          <span className="d-flex align-items-center">
            <Twitter fontSize="12" className="me-1" />
            Twitter
          </span>
        }
        size="small"
        error={errors.twitter ? true : false}
        helperText={errors.twitter ? errors.twitter.message : ""}
        {...twitterRules}
      />

      {fields.map((el, index) => (
        <div className="otherSiteBox" key={`inputWeb-${index}`}>
          <Controller
            control={control}
            name={`webs[${index}].url`}
            defaultValue={el.url ? el.url : ""}
            render={({ field }) => (
              <TextField
                {...field}
                className="inputText"
                label={
                  <span className="d-flex align-items-center">
                    <Public fontSize="12" className="me-1" />
                    Sitio web adicional
                  </span>
                }
                size="small"
                error={
                  errors.webs
                    ? errors.webs[index]
                      ? errors.webs[index].url
                        ? true
                        : false
                      : false
                    : false
                }
                helperText={
                  errors.webs
                    ? errors.webs[index]
                      ? errors.webs[index].url
                        ? errors.webs[index].url.message
                        : ""
                      : ""
                    : ""
                }
              />
            )}
            rules={rule}
          />

          <Tooltip title="Eliminar sitio web adicional">
            <IconButton
              color="info"
              onClick={() => remove(index)}
              className="ms-2"
            >
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      ))}

      <div className="addButtonBox">
        <Tooltip title="Agregar sitio web adicional">
          <IconButton
            color="primary"
            onClick={() => {
              append({ url: "", tipo: "otro", id: "" });
            }}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default EditorWebSites;
