import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
// export type GlobalState = {}
export var INITIAL_STATE = {};
var loggerMiddleware = createLogger();
function configureStore(initialState) {
    if (initialState === void 0) { initialState = INITIAL_STATE; }
    return createStore(rootReducer, initialState, process.env.NODE_ENV === 'production'
        ? applyMiddleware(thunk)
        : applyMiddleware(thunk, loggerMiddleware));
}
export var store = configureStore();
