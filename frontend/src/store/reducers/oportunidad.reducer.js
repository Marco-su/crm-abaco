import types from "../utils/actionNames";
import { oportunidadInitial } from "../utils/initialStates";

const oportunidadReducer = (state = oportunidadInitial, action) => {
  switch (action.type) {
    case types.GET_OPORTUNIDADES:
      return { ...state, lista: action.payload };

    default:
      return state;
  }
};

export default oportunidadReducer;
