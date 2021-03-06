import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, IconButton } from "@mui/material";
import { sendEmail } from "../store/actions/correo.actions";
import TextEditor from "../components/correo/TextEditor";
import Destinatarios from "../components/correo/Destinatarios";
import AdjuntarBtn from "../components/correo/AdjuntarBtn";
import { MarkAsUnreadOutlined } from "@mui/icons-material";
import { changeBytesSize } from "../helpers/changeBytesSize";
import FileImage from "../components/correo/FileImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Correo = () => {
  // STATES
  const [emailHtml, setEmailHtml] = useState("<div><p></p></div>");
  const [ccActive, setCcActive] = useState(false);
  const [ccoActive, setCcoActive] = useState(false);
  const [to, setTo] = useState([]);
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [rerenderCount, setRerenderCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  // RULES
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

  // HANDLES
  const onSubmit = (data) => {
    if (to.length === 0) {
      setError("to", {
        type: "manual",
        message: "Selecciona un destinatario para enviar tu correo.",
      });
      return;
    }

    sendEmail({ ...data, html: emailHtml, to, cc, bcc });
  };

  const handleClick = (e, index) => {
    const array = attachments;
    array.splice(index, 1);
    setAttachments(array);
    setRerenderCount(rerenderCount + 1);
  };

  // RENDER
  return (
    <div className="email-view view-container">
      <div className="box">
        <div className="box__main-title">
          <div className="title">
            <MarkAsUnreadOutlined color="info" />
            <h2>Redactar correo electrónico</h2>
          </div>

          <div className="right-box">
            <Button
              className="pill-button"
              variant="outlined"
              onClick={() => setCcActive(!ccActive)}
            >
              CC
            </Button>
            <Button
              className="ms-2 pill-button"
              variant="outlined"
              onClick={() => setCcoActive(!ccoActive)}
            >
              CCO
            </Button>
          </div>
        </div>
      </div>

      <div className="box email-section">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div>
            <Destinatarios
              errors={errors}
              errorName={"to"}
              clearErrors={clearErrors}
              setInputArray={setTo}
              label="Destinatarios"
            />

            {ccActive ? (
              <Destinatarios setInputArray={setCc} label="CC" />
            ) : null}

            {ccoActive ? (
              <Destinatarios setInputArray={setBcc} label="CCO" />
            ) : null}

            <TextField
              multiline
              maxRows={5}
              className="input-text"
              label="Asunto"
              size="small"
              error={errors.subject ? true : false}
              helperText={errors.subject ? errors.subject.message : ""}
              {...asuntoRules}
            />
          </div>

          <TextEditor setEmailHtml={setEmailHtml} />

          <div className="files-grid">
            {attachments.map((el, index) => (
              <div key={`file-${index}`} className="file-card">
                <div className="file-card__image-box">
                  <FileImage file={el} />
                </div>

                <div className="file-card__info">
                  <h3>{el.name}</h3>
                  <p>Tamaño: {changeBytesSize(el.size)}</p>
                </div>

                <div className="file-card__delete-box">
                  <IconButton onClick={(e) => handleClick(e, index)}>
                    <FontAwesomeIcon icon={faTimes} className="times-icon" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>

          <div className="button-box">
            <Button
              className="pill-button"
              variant="contained"
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              Enviar
            </Button>

            <AdjuntarBtn
              selectedFiles={attachments}
              setSelectedFiles={setAttachments}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Correo;
