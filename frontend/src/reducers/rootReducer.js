import { combineReducers } from 'redux';

import { SET_CURRENT_USER } from '../constants';
import { HELLO_REQUEST, HELLO_REQUEST_SUCCESS, HELLO_REQUEST_FAILURE } from '../constants';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated: false,
    userToken: '',
    hasAccessToken: false
};



export default combineReducers({
    authStatus,
    hello
});

function authStatus (state = initialState, action = {}){
    switch(action.type){
        case SET_CURRENT_USER:
            console.log("SET_CURRENT_USER reducer!");
            console.log(state);
            console.log(action);
            let isAuth = action.token.length > 0 ? true : false;
            return{
                isAuthenticated: isAuth,
                userToken: action.token,
                hasAccessToken: isAuth
            }
    }
    return state
}

// function helloReducer(state={}, action) {
//     console.log('helloReducer');
//     switch(action.type){
//         case HELLO_REQUEST:
//             console.log(HELLO_REQUEST);
//             return{
//                 payload: 'loading...'
//             };
//         case  HELLO_REQUEST_SUCCESS:
//             console.log(HELLO_REQUEST_SUCCESS);
//             console.log(action);
//             return{
//                 payload: action.payload
//             };
//         case  HELLO_REQUEST_FAILURE:
//             console.log(HELLO_REQUEST_FAILURE);
//             return{
//                 payload: action.error
//             };
//         default: return state
//     }
// }

export function hello(state = {}, action) {
  console.log('helloReducer Reducers');
    switch (action.type) {
    case HELLO_REQUEST:
      return {
        data: true
      };
    case HELLO_REQUEST_SUCCESS:
      return {
        data: action.hello
      };
    case HELLO_REQUEST_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}