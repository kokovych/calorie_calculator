import {VERIFIED_CURRENT_USER, VERIFY_TOKEN_URL, USER_HAS_ACCESS_TOKEN} from "../constants"
import axios from 'axios'
import {store} from '../store'


// export default function verifyToken(token) {
//   return {
//     type: VERIFIED_CURRENT_USER,
//     token
//   };
// }
//
// export default function verifyToken() {
//     console.log('isAuthorized');
//     let userAccessToken = localStorage.getItem('userAccessToken');
//     let userRefreshToken = localStorage.getItem('userRefreshToken');
//     if (userAccessToken && userRefreshToken){
//         console.log('tokens here!');
//         console.log(userAccessToken);
//         console.log(userRefreshToken);
//         // we have enough data inside localStorage
//         // 1. Verify current userAccessToken
//         let data = {
//             'token': userAccessToken
//         };
//         return axios.post(VERIFY_TOKEN_URL, data);
//     }
//     return false;
// }

export default function getAccessTokenStatus() {
    console.log('getAccessTokenStatus!!!!!!!!!!!!!!');
    return {
        type: USER_HAS_ACCESS_TOKEN,
        items: store.getState()
    }
}


// TODO:
// 1) add handleAuthorizedResponse - if authorized response return not 200
// try to refresh token, if not -> need login
// 2) add checkAccessToken
// user has token in local storage. Before rendering elements need to check:
// if token is valid - render authorized element ( logout)
// if token is invalid - refresh token, if not --> need login
