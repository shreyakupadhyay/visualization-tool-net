import { ANOTHER_ACTION } from './types';
import axios from 'axios';


export default function getUser(){
    return dispatch => {
        axios.get('../user_list.json')
        .then(res => {
            const user = res.data.map(user => {
                return user;
            });
            dispatch(getUserSync(user));
        })
    }
}

function getUserSync(user){
    return {
        type: ANOTHER_ACTION,
        payload: user
    }
}