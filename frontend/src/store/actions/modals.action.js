import types from "../utils/actionNames";

export const setSelected = (array) => (dispatch) => {
  dispatch({ type: types.SET_SELECTED, payload: array });
};

export const toggleUpdate =
  (updateType, upId, readOnlyEmpresa = false) =>
  (dispatch, getState) => {
    const changes = {
      updateType,
      upId,
      readOnlyEmpresa,
      updateIsOpen: !getState().modals.updateIsOpen,
    };

    dispatch({
      type: types.TOGGLE_UPDATE,
      payload: changes,
    });
  };

export const toggleDelete =
  (deleteType, delId, deleteName) => (dispatch, getState) => {
    const changes = {
      deleteType,
      delId,
      deleteName,
      deleteIsOpen: !getState().modals.deleteIsOpen,
    };

    dispatch({
      type: types.TOGGLE_DELETE,
      payload: changes,
    });
  };

export const toggleDeleteMany =
  (deleteManyType, arrayIds) => (dispatch, getState) => {
    const changes = {
      arrayIds,
      deleteManyType,
      deleteManyIsOpen: !getState().modals.deleteManyIsOpen,
    };

    dispatch({
      type: types.TOGGLE_DELETE_MANY,
      payload: changes,
    });
  };
