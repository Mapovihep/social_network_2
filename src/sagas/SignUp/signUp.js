import {put, call} from 'redux-saga/effects'
import { SIGN_UP } from '../../actions/ReducerActions'


export default function* signUp(data){
    const signUpPost = yield fetch("https://test-api-post.herokuapp.com/auth/sign_up",  {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            email: data.eMail,
            password: data.password, 
            first_name: data.firstName, 
            last_name: data.lastName })
    })
    yield put({type: SIGN_UP, payload: true})
}
