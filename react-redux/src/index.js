import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

//material ui
import injectTapEventPlugin from 'react-tap-event-plugin'; 
import LineChart from './components/linechart';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

injectTapEventPlugin();

render(
    <Provider store={store}>
        <LineChart />
    </Provider>,
    document.getElementById('graphic')
)

registerServiceWorker();
