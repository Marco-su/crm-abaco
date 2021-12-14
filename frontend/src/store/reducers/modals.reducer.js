import types from "../utils/actionNames";
import { modalsInitial } from "../utils/initialStates";

const modalsReducer = (state = modalsInitial, action) => {
  switch (action.type) {
    case types.SET_SELECTED:
      return { ...state, arrayIds: action.payload };

    case types.TOGGLE_UPDATE:
      const { updateType, upId, updateIsOpen } = action.payload;
      return {
        ...state,
        updateType,
        id: upId,
        updateIsOpen,
      };

    case types.TOGGLE_DELETE:
      const { deleteType, delId, deleteIsOpen, deleteName } = action.payload;
      return {
        ...state,
        deleteType,
        id: delId,
        deleteIsOpen,
        deleteName,
      };

    case types.TOGGLE_DELETE_MANY:
      const { deleteManyIsOpen, deleteManyType, arrayIds } = action.payload;

      return {
        ...state,
        deleteType: deleteManyType,
        deleteManyIsOpen,
        arrayIds,
      };

    case types.CLOSE_MODALS:
      return {
        ...state,
        arrayIds: [],
      };

    default:
      return state;
  }
};

export default modalsReducer;
