import {put} from 'redux-saga/effects' 
import { CHANGE_COMMENT } from '../../actions/ReducerActions';

export default function* changeComment (comment) {
    const response = yield fetch( `https://test-api-post.herokuapp.com/comments/comment/${comment.payload.commentId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json;charset=utf-8','Authorization': localStorage.getItem('token')},
        body:   JSON.stringify({"title": comment.payload.value})
        })
        const newComment = yield response.json();
    yield put({type: CHANGE_COMMENT, payload: newComment })
 }
