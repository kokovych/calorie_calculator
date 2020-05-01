import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import {LOGIN_URL, SET_CURRENT_USER} from "../constants";


export default function userLoginRequest(userData) {
    return dispatch => {
        console.log("in action userLoginRequest");
        return axios.post(LOGIN_URL, userData);
    }
}

export function setCurrentUser(token) {
  return {
    type: SET_CURRENT_USER,
    token
  };
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}