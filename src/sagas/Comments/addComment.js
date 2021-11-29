import {put} from 'redux-saga/effects' 
import { ADD_COMMENT } from '../../actions/ReducerActions';

export default function* addComment (comment) {
    const response = yield fetch( `https://test-api-post.herokuapp.com/comments/add`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8','Authorization': localStorage.getItem('token')},
        body:   JSON.stringify({"title": comment.payload.value,
            "post_id": comment.payload.postId})
        })
        const addComment = yield response.json();
    yield put({type: ADD_COMMENT, payload: addComment})
}
