import {LOGIN_URL, SET_CURRENT_USER} from "../constants"
import axios from 'axios'


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