import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import {HELLO_URL, HELLO_REQUEST, HELLO_REQUEST_SUCCESS, HELLO_REQUEST_FAILURE } from "../constants";


// export default function helloRequest() {
//     return dispatch => {
//         console.log("in action hello Request!!!!");
//         return axios.get(HELLO_URL);
//     }
// }


export default function helloRequest() {
    console.log("in action hello Request!!!!");
    return dispatch => {
        dispatch(request());
        console.log('in dispatch');
        const requestOptions = {
                method: 'GET',
                // headers: authHeader()
            };

        axios.get(HELLO_URL)
            .then(
                (resp) => {
                    console.log(resp);
                    console.log(resp.data);
                    // console.log(data.text());
                    dispatch(success(resp.data))
                },
                (error) => {
                    console.log(error);
                    dispatch(failure(error))
                }
            );
    };

    function request() { return { type: HELLO_REQUEST } }
    function success(hello) { return { type: HELLO_REQUEST_SUCCESS, hello } }
    function failure(error) { return { type: HELLO_REQUEST_FAILURE, error } }
}

// export function getTodayCalories() {
//     return {
//     type: SET_CURRENT_USER,
//     token
//   };
// }
