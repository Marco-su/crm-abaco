import types from "../utils/actionNames";
import { get } from "../utils/axiosCommon";

export const getOportunidades = () => (dispatch) => {
  get(types.GET_OPORTUNIDADES, "oportunidades", dispatch);
};
