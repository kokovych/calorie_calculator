import {VERIFIED_CURRENT_USER, VERIFY_TOKEN_URL, USER_HAS_ACCESS_TOKEN} from "../constants"
import axios from 'axios'
import {store} from '../store'


export default function getAccessTokenStatus() {
    console.log('getAccessTokenStatus!!!!!!!!!!!!!!');
    return {
        type: USER_HAS_ACCESS_TOKEN,
        hasAccessToken: store.getState().authStatus.hasAccessToken
    }
}


// TODO:
// 1) add handleAuthorizedResponse - if authorized response return not 200
// try to refresh token, if not -> need login
// 2) add checkAccessToken
// user has token in local storage. Before rendering elements need to check:
// if token is valid - render authorized element ( logout)
// if token is invalid - refresh token, if not --> need login
