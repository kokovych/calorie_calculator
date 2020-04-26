import { combineReducers } from 'redux';

import { SET_CURRENT_USER } from '../constants';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
};



export default combineReducers({
  authStatus
});

export function authStatus (state = initialState, action = {}){
    switch(action.type){
        case SET_CURRENT_USER:
            console.log("SET_CURRENT_USER reducer!");
            console.log(state);
            console.log(action);
            return{
                isAuthenticated: true,
                userToken: action.token
            }
    }
    return state
}