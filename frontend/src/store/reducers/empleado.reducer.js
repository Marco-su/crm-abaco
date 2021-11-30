import types from "../utils/actionNames";
import { empleadoInitial } from "../utils/initialStates";

const empleadoReducer = (state = empleadoInitial, action) => {
  switch (action.type) {
    case types.GET_EMPLEADOS:
      return { ...state, lista: action.payload };

    default:
      return state;
  }
};

export default empleadoReducer;
