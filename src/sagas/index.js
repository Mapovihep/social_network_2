import {takeEvery, call, all, fork} from 'redux-saga/effects' 
import {
    SIGN_UP_FETCH,
    LOG_IN_FETCH,
    LOAD_USERS_DATA_FETCH,
    LOAD_POSTS_FETCH,
    DELETE_POST_FETCH,
    CHANGING_POST_FETCH,
    ADD_USERS_POST_FETCH,
    ADD_COMMENT_FETCH,
    DELETE_COMMENT_FETCH,
    CHANGE_COMMENT_FETCH,
} from '../actions/SagaActions'
import getPosts from './Posts/getPosts'
import logIn from './Login/logIn';
import getProfile from './Profile/getProfile';
import signUp from './SignUp/signUp';
import deletePost from './Posts/deletePost';
import addUsersPost from './Posts/addUsersPost';
import addComment from './Comments/addComment';
import changeComment from './Comments/changeComment';
import deleteComment from './Comments/deleteComment';
import changePost from './Posts/changePost';

export function* signUpWorker(data){
    yield call(signUp, data.state)
}
export function* logInWorker(data){
    yield call(logIn, data.state)
}
export function* getProfileWorker(){
    yield call(getProfile)
}
export function* loadPostsWorker(){
    yield call(getPosts)
}
export function* addPostWorker(data){
    yield call(addUsersPost, data.payload)
}
export function* deletePostWorker(id){
    yield call(deletePost, id)
}
export function* changePostWorker(data){
    yield call(changePost, data.payload)
}
export function* addCommentWorker(data){
    yield call(addComment, data)
}
export function* changeCommentWorker(data){
    yield call(changeComment, data)
}
export function* deleteCommentWorker(data){
    yield call(deleteComment, data)
}
export function* watcherSaga(){
    yield takeEvery(SIGN_UP_FETCH, signUpWorker)
    yield takeEvery(LOG_IN_FETCH, logInWorker)
    yield takeEvery(DELETE_POST_FETCH, deletePostWorker)
    yield takeEvery(LOAD_POSTS_FETCH, loadPostsWorker)
    yield takeEvery(LOAD_USERS_DATA_FETCH, getProfileWorker)
    yield takeEvery(ADD_USERS_POST_FETCH, addPostWorker)
    yield takeEvery(CHANGING_POST_FETCH, changePostWorker)
    yield takeEvery(ADD_COMMENT_FETCH, addCommentWorker)
    yield takeEvery(DELETE_COMMENT_FETCH, deleteCommentWorker)
    yield takeEvery(CHANGE_COMMENT_FETCH, changeCommentWorker)
}
export default function* rootSaga(){
    yield watcherSaga();
}

