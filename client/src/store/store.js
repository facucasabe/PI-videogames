import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import reducer from "../reducer/index"

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

// Toda la data mantenida por nuestra aplicación tiene que estar contenida en una única estructura de datos llamada el state de nuestra app. Esta estructura de datos debe estar guardada en el store.
// Nuestra app lee el state desde nuestra store.
// El store no puede ser manipulado directamente por el usuario.
// Los usuarios disparan acciones que describen qué sucedió.
// Un nuevo estado es generado, resultado de combinar el viejo estado y la acción del usuario. Este proceso lo realiza una función llamada reducer.

