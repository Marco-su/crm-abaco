import types from "../utils/actionNames";
import {
  get,
  update,
  create,
  disable,
  getSingle,
  disableMultiple,
  createMultiple,
} from "../utils/axiosCommon";

export const getEmpresas = () => (dispatch) => {
  get(types.GET_EMPRESAS, "empresas", dispatch);
};

export const getProspectos = () => (dispatch) => {
  get(types.GET_PROSPECTOS, "empresas/prospectos", dispatch);
};

export const getClientes = () => (dispatch) => {
  get(types.GET_CLIENTES, "empresas/clientes", dispatch);
};

export const getEmpresaById = (id) => (dispatch) => {
  getSingle(types.GET_SINGLE_EMPRESA, "empresas", id, dispatch);
};

export const createEmpresa = (data, navigate) => (dispatch) => {
  create(data, "empresas", "empresa", navigate, dispatch);
};

export const bulkCreateEmpresa =
  (singleData, totalSteps) => (dispatch, getState) => {
    const { actualMasiveStep } = getState().global;

    createMultiple(
      singleData,
      totalSteps,
      "empresas",
      actualMasiveStep,
      dispatch
    );
  };

export const updateEmpresa = (data, path) => (dispatch) => {
  switch (path) {
    case "prospectos":
      update(
        types.GET_PROSPECTOS,
        "empresas",
        "empresas/prospectos",
        "prospecto",
        data,
        dispatch
      );
      break;

    case "clientes":
      update(
        types.GET_CLIENTES,
        "empresas",
        "empresas/clientes",
        "cliente",
        data,
        dispatch
      );
      break;

    default:
      update(
        types.GET_EMPRESAS,
        "empresas",
        "empresas",
        "empresa",
        data,
        dispatch
      );
      break;
  }
};

export const disableEmpresa = (id, path) => (dispatch) => {
  switch (path) {
    case "/prospectos":
      disable(
        types.GET_PROSPECTOS,
        "empresas",
        "empresas/prospectos",
        "prospecto",
        id,
        dispatch
      );
      break;

    case "/clientes":
      disable(
        types.GET_CLIENTES,
        "empresas",
        "empresas/clientes",
        "cliente",
        id,
        dispatch
      );
      break;

    default:
      disable(
        types.GET_EMPRESAS,
        "empresas",
        "empresas",
        "empresa",
        id,
        dispatch
      );
      break;
  }
};

export const disableManyEmpresas = (data, path) => (dispatch) => {
  switch (path) {
    case "/prospectos":
      disableMultiple(
        data,
        types.GET_PROSPECTOS,
        "empresas",
        "empresas/prospectos",
        dispatch
      );
      break;

    case "/clientes":
      disableMultiple(
        data,
        types.GET_CLIENTES,
        "empresas",
        "empresas/clientes",
        dispatch
      );
      break;

    default:
      disableMultiple(
        data,
        types.GET_EMPRESAS,
        "empresas",
        "empresas",
        dispatch
      );
      break;
  }
};
