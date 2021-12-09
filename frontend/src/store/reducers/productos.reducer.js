import types from "../utils/actionNames";
import { productoInitial } from "../utils/initialStates";

const productoReducer = (state = productoInitial, action) => {
  switch (action.type) {
    case types.GET_PRODUCTOS:
      return { ...state, lista: action.payload };

    case types.GET_SINGLE_PRODUCTO:
      return { ...state, producto: action.payload };

    default:
      return state;
  }
};

export default productoReducer;
