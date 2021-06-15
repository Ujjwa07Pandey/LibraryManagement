import { call, put, takeLatest } from 'redux-saga/effects';

import { createAuthor, readAuthor, updateAuthor, deleteAuthor } from './../../services/authors_service';
import { UserActionTypes } from '../users/ducks';
import { AuthorActionTypes } from './ducks';
import { NotificationsActionTypes } from '../notifications/ducks';
import { getAuthErrorMessage } from './../../utils/auth_utils';

export function* authorsSaga() {
  yield takeLatest(AuthorActionTypes.ADD_AUTHOR, createAuthorSaga);
  yield takeLatest(AuthorActionTypes.READ_AUTHOR, readAuthorSaga);
  yield takeLatest(AuthorActionTypes.UPDATE_AUTHOR, updateAuthorSaga);
  yield takeLatest(AuthorActionTypes.DELETE_AUTHOR, deleteAuthorSaga);
}

function* createAuthorSaga(action) {
  const { data } = action.payload;
  try {
   const authorId = yield call(createAuthor, data);
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: 'Author Added', type: 'success', show: true },
    });
    yield put({ type: AuthorActionTypes.SET_AUTHOR_ID , payload: { id: authorId } });
    yield put({ type: UserActionTypes.SET_MODAL_STATE, payload: { value: false } });
    yield put({ type: AuthorActionTypes.SET_AUTHOR, payload: { author: null, authorId: null } });
  } catch (e) {
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: 'Author Already Present', type: 'error', show: true },
    });
  }
}
function* readAuthorSaga(action) {
  const { id } = action.payload;
  try {
    const author = yield call(readAuthor, id);

    yield put({ type: AuthorActionTypes.SET_AUTHOR, payload: { author, id } });
  } catch (e) {
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: getAuthErrorMessage(e.code), type: 'error', show: true },
    });
  }
}
function* updateAuthorSaga(action) {
  const { id, data } = action.payload;
  try {
    yield put({ type: UserActionTypes.SET_MODAL_STATE, payload: { value: false } });
    yield call(updateAuthor, id, data);
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: 'Updated Added', type: 'success', show: true },
    });
    yield put({ type: AuthorActionTypes.SET_AUTHOR, payload: { author: null, authorId: null } });
  } catch (e) {
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: getAuthErrorMessage(e.code), type: 'error', show: true },
    });
  }
}
function* deleteAuthorSaga(action) {
  const { id } = action.payload;
  try {
    yield call(deleteAuthor, id);
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: 'Author Deleted', type: 'success', show: true },
    });
  } catch (e) {
  
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: getAuthErrorMessage(e.code), type: 'error', show: true },
    });
  }
}
