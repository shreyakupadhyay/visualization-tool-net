import { combineReducers } from 'redux';
import dashboardReducer from './dashboardReducer';

const allReducers = combineReducers({
    dashboard: dashboardReducer,
});

export default allReducers;