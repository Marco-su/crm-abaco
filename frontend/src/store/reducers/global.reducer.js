import types from "../utils/actionNames";
import { globalInitial } from "../utils/initialStates";

const globalReducer = (state = globalInitial, action) => {
  switch (action.type) {
    case types.SET_IS_AUTH:
      return { ...state, isAuth: action.payload };

    default:
      return state;
  }
};

export default globalReducer;
