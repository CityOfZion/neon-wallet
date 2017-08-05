import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk';



export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk),
        DevTools.instrument()
    );

    return store;
}
