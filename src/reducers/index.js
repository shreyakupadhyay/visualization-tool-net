import { combineReducers } from 'redux';
import dashboardReducer from './dashboardReducer';
import homeReducer from './homeReducer';

const allReducers = combineReducers({
    dashboard: dashboardReducer,
    home: homeReducer
});

export default allReducers;