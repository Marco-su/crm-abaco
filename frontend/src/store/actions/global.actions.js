import types from "../utils/actionNames";

export const setDetailViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_DETAIL_VIEW_TYPE,
    payload: viewType,
  });
};
