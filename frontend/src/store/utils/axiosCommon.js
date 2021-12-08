import axios from "axios";
import { apiBase } from "../../constants/baseUrls";
import types from "../utils/actionNames";

export const get = (type, urlName, dispatch) => {
  axios({
    url: `${apiBase}/${urlName}`,
  })
    .then((res) => {
      dispatch({
        type,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(`Error al traer ${urlName}:`, err);
    });
};

export const update = (getType, urlPut, urlGet, textName, data, dispatch) => {
  axios({
    url: `${apiBase}/${urlPut}/${data.id}`,
    method: "PUT",
    data,
  })
    .then((res) => {
      if (res.data[0] > 0) {
        dispatch({
          type: types.TOGGLE_UPDATE,
          payload: res.data,
        });
      }
    })
    .then(() => {
      get(getType, urlGet, dispatch);
    })
    .catch((err) => {
      console.log(`Error al actualizar ${textName}:`, err);
    });
};

export const disable = (getType, urlPut, urlGet, textName, id, dispatch) => {
  axios({
    url: `${apiBase}/${urlPut}/${id}`,
    method: "PUT",
    data: { status: "inactivo" },
  })
    .then((res) => {
      if (res.data[0] > 0) {
        dispatch({
          type: types.TOGGLE_DELETE,
          payload: res.data,
        });
      }
    })
    .then(() => {
      get(getType, urlGet, dispatch);
    })
    .catch((err) => {
      console.log(`Error al eliminar ${textName}:`, err);
    });
};
