import types from "../utils/actionNames";
import { globalInitial } from "../utils/initialStates";

const globalReducer = (state = globalInitial, action) => {
  switch (action.type) {
    case types.SET_IS_AUTH:
      return { ...state, isAuth: action.payload };

    case types.SET_DETAIL_VIEW_TYPE:
      return { ...state, detailViewType: action.payload };

    case types.SET_ACTUAL_STEP:
      return { ...state, actualMasiveStep: action.payload };

    case types.SET_TABLE_LOADING:
      return { ...state, tableLoading: action.payload };

    case types.SET_MENU_STATE:
      return { ...state, isMenuOpen: action.payload };

    default:
      return state;
  }
};

export default globalReducer;
