import {LOGIN_URL} from "../constants"
import axios from 'axios'


export default function userLoginRequest(userData) {
    return dispatch => {
        return axios.post(LOGIN_URL, userData);
    }
}