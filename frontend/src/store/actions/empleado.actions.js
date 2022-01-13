import types from "../utils/actionNames";
import axios from "axios";
import { apiBase } from "../../constants/baseUrls";
import {
  get,
  getSingle,
  update,
  disable,
  disableMultiple,
} from "../utils/axiosCommon";

// Authentication
const register = (data, urlNavigate, textName, navigate, dispatch) => {
  axios({
    url: `${apiBase}/auth/register`,
    method: "POST",
    data,
  })
    .then((res) => {
      if (res.data.id) {
        dispatch({
          type: types.TOGGLE_UPDATE,
          payload: {
            updateType: "create",
            updateIsOpen: false,
            upId: null,
          },
        });

        navigate(`/${urlNavigate}/${res.data.id}`);
      }
    })
    .catch((err) => {
      console.log(`Error al crear ${textName}:`, err);
    });
};

const login = (data, navigate, dispatch) => {
  axios({
    url: `${apiBase}/auth/login`,
    method: "POST",
    data,
  })
    .then((res) => {
      console.log(res);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        dispatch({
          type: types.SET_IS_AUTH,
          payload: true,
        });

        navigate("/empleados");
      } else {
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(`Error en login:`, err);
    });
};

// Solicitudes
export const getEmpleados = () => (dispatch) => {
  get(types.GET_EMPLEADOS, "empleados", dispatch);
};

export const getEmpleadoById = (id) => (dispatch) => {
  getSingle(types.GET_SINGLE_EMPLEADO, "empleados", id, dispatch);
};

export const createEmpleado = (data, navigate) => (dispatch) => {
  register(data, "empleados", "empleado", navigate, dispatch);
};

export const iniciarSesion = (data, navigate) => (dispatch) => {
  login(data, navigate, dispatch);
};

export const cerrarSesion = (navigate) => (dispatch) => {
  localStorage.removeItem("token");
  navigate("/");

  dispatch({
    type: types.SET_IS_AUTH,
    payload: false,
  });
};

export const updateEmpleado = (data) => (dispatch) => {
  update(
    types.GET_EMPLEADOS,
    "empleados",
    "empleados",
    "empleado",
    data,
    dispatch
  );
};

export const disableEmpleado = (id) => (dispatch) => {
  disable(
    types.GET_EMPLEADOS,
    "empleados",
    "empleados",
    "empleado",
    id,
    dispatch
  );
};

export const disableManyEmpleados = (data) => (dispatch) => {
  disableMultiple(
    data,
    types.GET_EMPLEADOS,
    "empleados",
    "empleados",
    dispatch
  );
};
