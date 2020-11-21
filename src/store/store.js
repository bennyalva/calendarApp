import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";

// esta linea solo es para que las herramientas de desarrollo se activen en la consola de los navegadore (chrome)
// hay más información en consola del navegador en la sección de redux
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)