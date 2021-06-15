import { call, put, takeLatest } from 'redux-saga/effects';

import { createBook, readBook, updateBook, deleteBook } from './../../services/books_service';
import { UserActionTypes } from '../users/ducks';
import { BookActionTypes } from './ducks';
import { NotificationsActionTypes } from '../notifications/ducks';
import { getAuthErrorMessage } from './../../utils/auth_utils';

export function* booksSaga() {
  yield takeLatest(BookActionTypes.ADD_BOOK, createBookSaga);
  yield takeLatest(BookActionTypes.READ_BOOK, readBookSaga);
  yield takeLatest(BookActionTypes.UPDATE_BOOK, updateBookSaga);
  yield takeLatest(BookActionTypes.DELETE_BOOK, deleteBookSaga);
  
}

function* createBookSaga(action) {
  const { data } = action.payload;
  try {
   const bookid = yield call(createBook, data);
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: 'Book Added', type: 'success', show: true },
    });
    yield put({ type: BookActionTypes.SET_BOOK_ID, payload: { id: bookid } });
    yield put({ type: UserActionTypes.SET_MODAL_STATE, payload: { value: false } });
    yield put({ type: BookActionTypes.SET_BOOK, payload: { book: null, bookId: null } });
  } catch (e) {
    yield put({
        type: NotificationsActionTypes.SET_NOTIFICATION,
        payload: { message: 'Book Already Present', type: 'error', show: true },
      });
    
  }
}
function* readBookSaga(action) {
  const { id } = action.payload;
  try {
    const book = yield call(readBook, id);

    yield put({ type: BookActionTypes.SET_BOOK, payload: { book, id } });
  } catch (e) {
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: getAuthErrorMessage(e.code), type: 'error', show: true },
    });
  }
}
function* updateBookSaga(action) {
  const { id, data } = action.payload;
  try {
    yield put({ type: UserActionTypes.SET_MODAL_STATE, payload: { value: false } });
    yield call(updateBook, id, data);
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: 'Updated Added', type: 'success', show: true },
    });
    yield put({ type: BookActionTypes.SET_BOOK, payload: { book: null, bookId: null } });
  } catch (e) {
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: getAuthErrorMessage(e.code), type: 'error', show: true },
    });
  }
}
function* deleteBookSaga(action) {
  const { id } = action.payload;
  try {
    yield call(deleteBook, id);
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: 'Book Deleted', type: 'success', show: true },
    });
  } catch (e) {
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: getAuthErrorMessage(e.code), type: 'error', show: true },
    });
  }
}

