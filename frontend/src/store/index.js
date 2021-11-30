import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import contactoReducer from "./reducers/contacto.reducer";
import empleadoReducer from "./reducers/empleado.reducer";
import empresaReducer from "./reducers/empresa.reducer";

// combine reducer
const rootReducer = combineReducers({
  contactos: contactoReducer,
  empleados: empleadoReducer,
  empresas: empresaReducer,
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
