import types from "../utils/actionNames";
import { get, update, disable } from "../utils/axiosCommon";

export const getProductos = () => (dispatch) => {
  get(types.GET_PRODUCTOS, "productos", dispatch);
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
