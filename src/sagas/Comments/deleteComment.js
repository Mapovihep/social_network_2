import {put} from 'redux-saga/effects' 
import { DEL_COMMENT } from '../../actions/ReducerActions';

export default function* deleteComment (comment) {
    const response = yield fetch( `https://test-api-post.herokuapp.com/comments/comment/${comment.payload.commentId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json;charset=utf-8','Authorization': localStorage.getItem('token')},
        })
        const deleteResponse = yield response.json();
    yield put({type: DEL_COMMENT, payload: comment.payload})
 }
