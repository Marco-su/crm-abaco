import "../assets/css/correo/correo.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import TextEditor from "../components/correo/TextEditor";
import { sendEmail } from "../store/actions/correo.actions";

const Correo = () => {
  const [emailHtml, setEmailHtml] = useState("<div><p></p></div>");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const asuntoRules = register("subject", {
    required: {
      value: true,
      message: "Indica un asunto para enviar tu correo.",
    },
    maxLength: {
      value: 255,
      message: "Asunto muy largo (máximo 255 caracteres).",
    },
  });

  const destinatarioRules = register("to", {
    required: {
      value: true,
      message: "Indica un destinatario para enviar tu correo.",
    },
    maxLength: {
      value: 255,
      message: "Correo muy largo (máximo 255 caracteres).",
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Correo no válido. Ejemplo válido: usuario@mail.com",
    },
  });

  const onSubmit = (data) => {
    sendEmail({ ...data, html: emailHtml });
  };

  return (
    <div className="correoView viewContainer">
      <div className="box">
        <h1>Redactar correo electrónico</h1>
      </div>

      <div className="box emailSection">
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <TextField
              className="inputText mb-3"
              label="Destinatario"
              inputProps={{
                autoComplete: "off",
              }}
              size="small"
              error={errors.to ? true : false}
              helperText={errors.to ? errors.to.message : ""}
              {...destinatarioRules}
            />

            <TextField
              multiline
              maxRows={5}
              className="inputText"
              label="Asunto"
              inputProps={{
                autoComplete: "off",
              }}
              size="small"
              error={errors.subject ? true : false}
              helperText={errors.subject ? errors.subject.message : ""}
              {...asuntoRules}
            />
          </section>

          <TextEditor setEmailHtml={setEmailHtml} />

          <div className="emailButtonBox">
            <button type="submit" className="blueBtn">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Correo;
