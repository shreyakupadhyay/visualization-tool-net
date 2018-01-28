import { ADD_USER, ANOTHER_ACTION } from '../actions/types';

export default function(state=[], action){

    switch (action.type) {
        case  ADD_USER:
        return [action.payload, ...state];
    
        default:
        return state;
    }
}