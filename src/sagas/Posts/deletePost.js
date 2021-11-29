import {put} from 'redux-saga/effects' 
import { DEL_POST } from '../../actions/ReducerActions';

export default function* deletePost (id){
    const response = yield fetch( `https://test-api-post.herokuapp.com/posts/post/${id.payload}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json;charset=utf-8','Authorization': localStorage.getItem('token')},
        })
        const deleteResponse = yield response.json();
        console.log(deleteResponse)
    yield put({type: DEL_POST, payload: id.payload});
 }
