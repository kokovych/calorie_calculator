import {VERIFY_TOKEN_URL} from "../constants"
import axios from 'axios'


export default function verifyTokenRequest(accessToken) {
    let data = {
        "token": accessToken
    };
    return dispatch => {
        return axios.post(VERIFY_TOKEN_URL, data);
    }
}


// TODO:
// 1) add handleAuthorizedResponse - if authorized response return not 200
// try to refresh token, if not -> need login
// 2) add checkAccessToken
// user has token in local storage. Before rendering elements need to check:
// if token is valid - render authorized element ( logout)
// if token is invalid - refresh token, if not --> need login
