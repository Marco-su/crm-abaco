import types from "../utils/actionNames";
import {
  get,
  getSingle,
  create,
  update,
  disable,
  disableMultiple,
} from "../utils/axiosCommon";

export const getProductos = () => (dispatch) => {
  get(types.GET_PRODUCTOS, "productos", dispatch);
};

export const getProductoById = (id) => (dispatch) => {
  getSingle(types.GET_SINGLE_PRODUCTO, "productos", id, dispatch);
};

export const createProducto = (data, navigate) => (dispatch) => {
  create(data, "productos", "producto", navigate, dispatch);
};

export const updateProducto = (data) => (dispatch) => {
  update(
    types.GET_PRODUCTOS,
    "productos",
    "productos",
    "producto",
    data,
    dispatch
  );
};

export const disableProducto = (id) => (dispatch) => {
  disable(
    types.GET_PRODUCTOS,
    "productos",
    "productos",
    "producto",
    id,
    dispatch
  );
};

export const disableManyProductos = (data) => (dispatch) => {
  disableMultiple(
    data,
    types.GET_PRODUCTOS,
    "productos",
    "productos",
    dispatch
  );
};
