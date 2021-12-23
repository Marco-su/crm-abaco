import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import modalsReducer from "./reducers/modals.reducer";
import contactoReducer from "./reducers/contacto.reducer";
import empleadoReducer from "./reducers/empleado.reducer";
import empresaReducer from "./reducers/empresa.reducer";
import productoReducer from "./reducers/productos.reducer";
import oportunidadReducer from "./reducers/oportunidad.reducer";
import globalReducer from "./reducers/global.reducer";

// combine reducer
const rootReducer = combineReducers({
  global: globalReducer,
  modals: modalsReducer,
  contactos: contactoReducer,
  empleados: empleadoReducer,
  productos: productoReducer,
  empresas: empresaReducer,
  oportunidades: oportunidadReducer,
});

// store config
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

export default generateStore;
