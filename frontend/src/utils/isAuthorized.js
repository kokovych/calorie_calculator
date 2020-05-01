import axios from 'axios'
import {VERIFY_TOKEN_URL} from "../constants"

export default function isAuthorized() {
    console.log('isAuthorized');
    let userAccessToken = localStorage.getItem('userAccessToken');
    let userRefreshToken = localStorage.getItem('userRefreshToken');
    if (userAccessToken && userRefreshToken){
        console.log('tokens here!');
        console.log(userAccessToken);
        console.log(userRefreshToken);
        // we have enough data inside localStorage
        // 1. Verify current userAccessToken
        let data = {
            'token': userAccessToken
        };
        axios.post(VERIFY_TOKEN_URL, data).then(
            (resp) => {
                console.log('GOOD verify');
                console.log(resp);
                return true;
            },
            (err) => {
                console.log('BAD verify');
                console.log(err);
            }
        )
    }
    return false;
}