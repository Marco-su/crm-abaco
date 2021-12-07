import axios from "axios";
import types from "../utils/actionNames";
import { apiBase } from "../../constants/baseUrls";

export const getEmpresas = () => (dispatch) => {
  axios({
    url: `${apiBase}/empresas`,
  })
    .then((res) => {
      dispatch({
        type: types.GET_EMPRESAS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("Error al traer empresas:", err);
    });
};

export const getProspectos = () => (dispatch) => {
  axios({
    url: `${apiBase}/empresas/prospectos`,
  })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: types.GET_PROSPECTOS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("Error al traer prospectos:", err);
    });
};

export const getClientes = () => (dispatch) => {
  axios({
    url: `${apiBase}/empresas/clientes`,
  })
    .then((res) => {
      dispatch({
        type: types.GET_CLIENTES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("Error al traer clientes:", err);
    });
};
