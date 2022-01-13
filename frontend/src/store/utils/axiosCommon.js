import axios from "axios";
import { apiBase } from "../../constants/baseUrls";
import types from "../utils/actionNames";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers["x-access-token"] = token;

  return config;
});

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

export const getSingle = (type, urlName, id, dispatch) => {
  axios({
    url: `${apiBase}/${urlName}/${id}`,
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

export const create = (data, urlPost, textName, navigate, dispatch) => {
  axios({
    url: `${apiBase}/${urlPost}`,
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

        navigate(`/${urlPost}/${res.data.id}`);
      }
    })
    .catch((err) => {
      console.log(`Error al crear ${textName}:`, err);
    });
};

export const createMultiple = (data, urlPost, navigate, dispatch) => {
  axios({
    url: `${apiBase}/${urlPost}`,
    method: "POST",
    data,
  })
    .then((res) => {
      if (res.data) {
        navigate(`/empresas`);
      }
    })
    .catch((err) => {
      console.log("Error al crear masivamente:", err);
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
          payload: { updateType: "", upId: null, updateIsOpen: false },
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
          payload: {
            updateType: "",
            delId: null,
            updateIsOpen: false,
            deleteName: "",
          },
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

export const disableMultiple = (data, getType, urlPut, urlGet, dispatch) => {
  axios({
    url: `${apiBase}/${urlPut}`,
    method: "PUT",
    data: { ids: data },
  })
    .then((res) => {
      if (res.data.eliminados > 0) {
        dispatch({
          type: types.TOGGLE_DELETE_MANY,
          payload: {
            deleteManyType: "",
            deleteManyIsOpen: false,
            arrayIds: [],
          },
        });
      }
    })
    .then(() => {
      get(getType, urlGet, dispatch);
    })
    .catch((err) => {
      console.log(`Error al eliminar ${urlPut}:`, err);
    });
};
