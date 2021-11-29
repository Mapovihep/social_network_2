import {put} from 'redux-saga/effects' 
import { LOAD_POSTS } from '../../actions/ReducerActions';
import { LOAD_USERS_DATA_FETCH } from '../../actions/SagaActions';

export default function* getPosts (){
    const response = yield fetch( "https://test-api-post.herokuapp.com/posts/all", {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8', 'Authorization': localStorage.getItem('token')},
        })
        const posts = yield response.json();
    yield put({type : LOAD_POSTS, payload: posts});
 }

