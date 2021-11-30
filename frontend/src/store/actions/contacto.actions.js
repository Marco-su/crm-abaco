import axios from "axios";
import types from "../utils/actionNames";
import { apiBase } from "../../constants/baseUrls";

export const getContactos = () => (dispatch) => {
  axios({
    url: `${apiBase}/contactos`,
  })
    .then((res) => {
      dispatch({
        type: types.GET_CONTACTOS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("Error al traer contactos", err);
    });
};
