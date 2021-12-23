import "../../assets/css/home/login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, FormHelperText } from "@mui/material";
import {
  Person,
  Key,
  Visibility,
  VisibilityOff,
  LockOutlined,
} from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { iniciarSesion } from "../../store/actions/empleado.actions";

const Login = () => {
  // STATES
  const [isPaswordVisible, setIsPaswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // HANDLES
  const onSubmit = (data) => {
    dispatch(iniciarSesion(data, navigate));
  };

  const togglePass = () => {
    setIsPaswordVisible(!isPaswordVisible);
  };

  // RULES
  const correoRules = register("correo", {
    required: {
      value: true,
      message: "Escribe tu nombre de usuario.",
    },
    maxLength: {
      value: 120,
      message: "Nombre de usuario muy largo (máximo 120 caracteres).",
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Correo no válido. Ejemplo válido: usuario@mail.com",
    },
  });

  const passwordRules = register("password", {
    required: {
      value: true,
      message: "Escribe tu contraseña",
    },
    maxLength: {
      value: 120,
      message: "Contraseña muy largo (máximo 120 caracteres).",
    },
  });

  // RENDER
  return (
    <div id="loginContainer">
      <div>
        <div className="mainIconBox">
          <div>
            <LockOutlined sx={{ fontSize: 33 }} />
          </div>
        </div>

        <div className="titleBox">
          <h1>Iniciar Sesión</h1>
          <span>Abaco Systems Technologies.</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="containerInput">
            <div className="loginInputBox">
              <Person fontSize="small" className="leftIcon" />

              <TextField
                className="inputText"
                label="Correo electrónico"
                size="small"
                autoComplete="off"
                error={errors.correo ? true : false}
                {...correoRules}
              />
            </div>

            {errors.correo ? (
              <FormHelperText error>{errors.correo.message}</FormHelperText>
            ) : null}
          </div>

          <div className="containerInput password">
            <div className="loginInputBox">
              <Key fontSize="small" className="leftIcon" />

              <TextField
                className="inputText"
                label="Contraseña"
                size="small"
                type={isPaswordVisible ? "text" : "password"}
                error={errors.password ? true : false}
                {...passwordRules}
              />

              {isPaswordVisible ? (
                <VisibilityOff onClick={togglePass} className="rightIcon" />
              ) : (
                <Visibility onClick={togglePass} className="rightIcon" />
              )}
            </div>

            {errors.password ? (
              <FormHelperText error>{errors.password.message}</FormHelperText>
            ) : null}
          </div>

          <div className="buttonBox">
            <button className="blueBtn" type="submit">
              Acceder
            </button>
          </div>

          <div className="copyrightBox">
            <span className="gray">
              <span>Copyright ©</span> Abaco Systems Technologies{" "}
              {new Date().getFullYear()}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
