import types from "../utils/actionNames";

export const toggleUpdate = (updateType, upId) => (dispatch, getState) => {
  const changes = {
    updateType,
    upId,
    updateIsOpen: !getState().modals.updateIsOpen,
  };

  dispatch({
    type: types.OPEN_UPDATE,
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
      type: types.OPEN_DELETE,
      payload: changes,
    });
  };

export const closeModals = () => (dispatch) => {
  dispatch({ type: types.CLOSE_MODALS });
};
