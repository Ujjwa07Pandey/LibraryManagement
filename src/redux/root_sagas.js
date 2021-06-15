import { fork } from '@redux-saga/core/effects';
import {usersSaga} from './users/sagas';
import {authorsSaga} from './authors/sagas';
import {booksSaga} from './books/sagas';

function* rootSaga() {
  yield fork(usersSaga);
  yield fork(authorsSaga);
  yield fork(booksSaga);
}

export default rootSaga;
