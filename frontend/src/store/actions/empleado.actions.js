import axios from "axios";
import types from "../utils/actionNames";
import { apiBase } from "../../constants/baseUrls";

export const getEmpleados = () => (dispatch) => {
  axios({
    url: `${apiBase}/empleados`,
  })
    .then((res) => {
      dispatch({
        type: types.GET_EMPLEADOS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("Error al traer empleados", err);
    });
};
