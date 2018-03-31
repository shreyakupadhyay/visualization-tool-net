export const FETCH_USERDATA_BEGIN = 'FETCH_USERDATA_BEGIN'
export const FETCH_USERDATA_FAILURE = 'FETCH_USERDATA_FAILURE'
export const FETCH_USERDATA_SUCCESS = 'FETCH_USERDATA_SUCCESS'

export const fetchUserDataBegin = () => ({
    type: FETCH_USERDATA_BEGIN
})

export const fetchUserDataSuccess = data => ({
    type: FETCH_USERDATA_SUCCESS,
    payload: { data }
})

export const fetchUserDataFailure = error => ({
    type: FETCH_USERDATA_FAILURE,
    payload: { error }
})


export function fetchUserData(){
    return dispatch => {
      dispatch(fetchUserDataBegin());
      
      fetch('/userdata.json')
            .then(handleErrors)
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(json => {
                dispatch(fetchUserDataSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchUserDataFailure(error)));
    }
  }

function handleErrors(response){
    if(!response.ok){
      throw Error(response.statusText);
    }
    return response;
  }