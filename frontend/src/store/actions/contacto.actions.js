import types from "../utils/actionNames";
import {
  get,
  getSingle,
  create,
  update,
  disable,
  disableMultiple,
} from "../utils/axiosCommon";

export const getContactos = () => (dispatch) => {
  get(types.GET_CONTACTOS, "contactos", dispatch);
};

export const getContactoById = (id) => (dispatch) => {
  getSingle(types.GET_SINGLE_CONTACTO, "contactos", id, dispatch);
};

export const createContacto = (data, navigate) => (dispatch) => {
  create(
    data,
    types.GET_CONTACTOS,
    "contactos",
    "contacto",
    navigate,
    dispatch
  );
};

export const updateContacto = (data) => (dispatch) => {
  update(
    types.GET_CONTACTOS,
    "contactos",
    "contactos",
    "contacto",
    data,
    dispatch
  );
};

export const disableContacto =
  (idMain, idSingle, isDetail = false) =>
  (dispatch) => {
    disable(
      types.GET_CONTACTOS,
      types.GET_SINGLE_EMPRESA,
      "empresas",
      "contactos",
      "contactos",
      "contacto",
      idMain,
      idSingle,
      dispatch,
      isDetail
    );
  };

export const disableManyContactos = (data) => (dispatch) => {
  disableMultiple(
    data,
    types.GET_CONTACTOS,
    "contactos",
    "contactos",
    dispatch
  );
};
