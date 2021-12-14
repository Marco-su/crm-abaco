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
  create(data, "contactos", "contacto", navigate, dispatch);
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

export const disableContacto = (id) => (dispatch) => {
  disable(
    types.GET_CONTACTOS,
    "contactos",
    "contactos",
    "contacto",
    id,
    dispatch
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
