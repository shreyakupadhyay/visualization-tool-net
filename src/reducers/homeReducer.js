import {
    FETCH_USERDATA_BEGIN,
    FETCH_USERDATA_SUCCESS,
    FETCH_USERDATA_FAILURE
  } from '../actions/homeActions';
  
  const initialState = {
      items: [],
      loading: false,
      error: null
  };
  
  export default function homeReducer(state=initialState, action){
      switch(action.type){
          case FETCH_USERDATA_BEGIN:
              return {
                  ...state,
                  loading: true,
                  error: null
              };
  
          case FETCH_USERDATA_SUCCESS:
              return {
                  ...state,
                  loading: false,
                  items: action.payload.data
              };
  
          case FETCH_USERDATA_FAILURE:
              return {
                  ...state,
                  loading: false,
                  error: action.payload.error,
                  items: []
              };
      
          default:
              return state;
      
      }
  }
    