import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index.js';
import createSagaMiddleware from '@redux-saga/core';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootSaga from '../sagas/index.js';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer, 
    applyMiddleware(thunk, logger, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
export default store;

