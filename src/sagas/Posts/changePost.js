import {put} from 'redux-saga/effects' 
import { CHANGE_POST } from '../../actions/ReducerActions';

export default function* changePost (post) {
    const response = yield fetch( `https://test-api-post.herokuapp.com/posts/post/${post.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json;charset=utf-8','Authorization': localStorage.getItem('token')},
        body:   JSON.stringify({title: post.title,
            description: post.description})
        })
        const changePost = yield response.json();
    yield put({type: CHANGE_POST, payload: post})
 }
