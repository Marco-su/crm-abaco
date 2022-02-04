import { TextField } from "@mui/material";
import { Facebook, LinkedIn, Instagram, Twitter } from "@mui/icons-material";

const EditorWebSites = ({ register, errors }) => {
  // RULES
  const rule = {
    maxLength: {
      value: 1000,
      message: "Enlace muy largo (máximo 1000 caracteres).",
    },
  };

  const linkedinRules = register("linkedin", rule);
  const facebookRules = register("facebook", rule);
  const instagramRules = register("instagram", rule);
  const twitterRules = register("twitter", rule);

  // RENDER
  return (
    <div className="inputs-box">
      <TextField
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
    </div>
  );
};

export default EditorWebSites;
