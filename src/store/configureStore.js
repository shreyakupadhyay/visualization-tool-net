import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f 
)


export default function configureStore() {
    return createStore(
        rootReducer,
        enhancers,
        applyMiddleware(thunk),
    );
}