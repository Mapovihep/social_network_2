import {put} from 'redux-saga/effects' 
import { LOG_IN } from '../../actions/ReducerActions';
import { LOAD_USERS_DATA_FETCH } from '../../actions/SagaActions';

export default function* logIn(data) {
    const response = yield fetch( "https://test-api-post.herokuapp.com/auth/sign_in", {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            email: data.eMail, 
            password: data.password})
    })
    let token = yield response.headers.get('Authorization');
    if(token !== null){
        localStorage.setItem('token', token);
        yield put({ type: LOG_IN, payload: true})
        yield put({type: LOAD_USERS_DATA_FETCH})
    }else{
        alert('Access API error!');
    }

 }