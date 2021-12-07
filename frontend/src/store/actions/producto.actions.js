import axios from "axios";
import types from "../utils/actionNames";
import { apiBase } from "../../constants/baseUrls";

export const getProductos = () => (dispatch) => {
  axios({
    url: `${apiBase}/productos`,
  })
    .then((res) => {
      dispatch({
        type: types.GET_PRODUCTOS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("Error al traer productos:", err);
    });
};
