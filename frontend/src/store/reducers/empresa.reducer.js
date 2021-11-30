import types from "../utils/actionNames";
import { empresaInitial } from "../utils/initialStates";

const empresaReducer = (state = empresaInitial, action) => {
  switch (action.type) {
    case types.GET_EMPRESAS:
      return { ...state, lista: action.payload };

    case types.GET_PROSPECTOS:
      return { ...state, prospectos: action.payload };

    case types.GET_CLIENTES:
      return { ...state, clientes: action.payload };

    default:
      return state;
  }
};

export default empresaReducer;
