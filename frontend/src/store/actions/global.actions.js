import types from "../utils/actionNames";

export const setDetailViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_DETAIL_VIEW_TYPE,
    payload: viewType,
  });
};

export const setActualStep = (step) => (dispatch) => {
  dispatch({
    type: types.SET_ACTUAL_STEP,
    payload: step,
  });
};

export const toggleMenu = () => (dispatch, getState) => {
  dispatch({
    type: types.SET_MENU_STATE,
    payload: !getState().global.isMenuOpen,
  });
};
