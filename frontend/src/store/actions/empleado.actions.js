import types from "../utils/actionNames";
import { get, update, disable } from "../utils/axiosCommon";

export const getEmpleados = () => (dispatch) => {
  get(types.GET_EMPLEADOS, "empleados", dispatch);
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
