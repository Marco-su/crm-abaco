import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, FormHelperText, Button } from "@mui/material";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STATES
  const [isPaswordVisible, setIsPaswordVisible] = useState(false);
  const errorLogin = useSelector((store) => store.empleados.errorLogin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    <div className="login">
      <div className="login__content">
        <div className="top-icon">
          <div className="top-icon-circle">
            <LockOutlined sx={{ fontSize: 33 }} />
          </div>
        </div>

        <div className="title-box">
          <h1>Iniciar Sesión</h1>
          <span>Abaco Systems Technologies.</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-box">
            <div>
              <Person fontSize="small" className="input-left-icon" />

              <TextField
                className="input-text"
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

          <div className="input-box">
            <div>
              <Key fontSize="small" className="input-left-icon" />

              <TextField
                className="input-text"
                label="Contraseña"
                size="small"
                type={isPaswordVisible ? "text" : "password"}
                error={errors.password ? true : false}
                {...passwordRules}
              />

              {isPaswordVisible ? (
                <VisibilityOff
                  onClick={togglePass}
                  className="input-right-icon"
                />
              ) : (
                <Visibility onClick={togglePass} className="input-right-icon" />
              )}
            </div>

            {errors.password ? (
              <FormHelperText error>{errors.password.message}</FormHelperText>
            ) : null}

            {errorLogin ? (
              <FormHelperText error>{errorLogin}</FormHelperText>
            ) : null}
          </div>

          <div className="button-box">
            <Button className="pill-button" variant="contained" type="submit">
              Acceder
            </Button>
          </div>

          <div className="copyright-box">
            <span className="text-gray">
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
