import types from "../utils/actionNames";
import { modalsInitial } from "../utils/initialStates";

const modalsReducer = (state = modalsInitial, action) => {
  switch (action.type) {
    case types.OPEN_UPDATE:
      const { updateType, upId, updateIsOpen } = action.payload;
      return { ...state, updateType, id: upId, updateIsOpen };

    case types.OPEN_DELETE:
      const { deleteType, delId, deleteIsOpen, deleteName } = action.payload;
      return { ...state, deleteType, id: delId, deleteIsOpen, deleteName };

    case types.OPEN_DETAIL:
      const { detailType, detId, detailIsOpen } = action.payload;
      return { ...state, detailType, id: detId, detailIsOpen };

    case types.CLOSE_MODALS:
      return {
        ...state,
        updateIsOpen: false,
        deleteIsOpen: false,
        detailIsOpen: false,
      };

    default:
      return state;
  }
};

export default modalsReducer;
