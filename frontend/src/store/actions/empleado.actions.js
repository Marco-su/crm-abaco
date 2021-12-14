import types from "../utils/actionNames";
import {
  get,
  getSingle,
  create,
  update,
  disable,
  disableMultiple,
} from "../utils/axiosCommon";

export const getEmpleados = () => (dispatch) => {
  get(types.GET_EMPLEADOS, "empleados", dispatch);
};

export const getEmpleadoById = (id) => (dispatch) => {
  getSingle(types.GET_SINGLE_EMPLEADO, "empleados", id, dispatch);
};

export const createEmpleado = (data, navigate) => (dispatch) => {
  create(data, "empleados", "empleado", navigate, dispatch);
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
