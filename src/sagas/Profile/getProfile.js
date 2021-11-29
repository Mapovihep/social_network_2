import { put } from "@redux-saga/core/effects";
import { LOAD_PROFILE } from "../../actions/ReducerActions";

export default function* getProfile(){
    let response =  yield fetch('https://test-api-post.herokuapp.com/user/profile', {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8', 'Authorization': localStorage.getItem('token')},
        }).then(response => response.json())
    yield put({type : LOAD_PROFILE, payload: response});
}