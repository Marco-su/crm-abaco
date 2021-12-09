import types from "../utils/actionNames";
import { contactoInitial } from "../utils/initialStates";

const contactoReducer = (state = contactoInitial, action) => {
  switch (action.type) {
    case types.GET_CONTACTOS:
      return { ...state, lista: action.payload };

    case types.GET_SINGLE_CONTACTO:
      return { ...state, contacto: action.payload };

    default:
      return state;
  }
};

export default contactoReducer;
