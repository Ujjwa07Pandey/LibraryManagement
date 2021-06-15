import { call, put, takeLatest } from 'redux-saga/effects';

import {
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  forgotPassword,
} from '../../services/auth_service';

import { UserActionTypes } from './ducks';

import { NotificationsActionTypes } from './../notifications/ducks';
import { getAuthErrorMessage } from './../../utils/auth_utils';
export function* usersSaga() {
  yield takeLatest(UserActionTypes.SIGN_OUT_USER, signOutUser);
  yield takeLatest(UserActionTypes.SIGNUP_USER, signupUserSaga);
  yield takeLatest(UserActionTypes.LOGIN_USER, loginUserSaga);
  yield takeLatest(UserActionTypes.FORGOT_PASSWORD_USER, forgotPasswordUserSaga);
}
function* signOutUser(action) {
  try {
    yield call(signOut);
  } catch (e) {
  
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: getAuthErrorMessage(e.code), type: 'error', show: true },
    });
  }
}

function* signupUserSaga(action) {
  const { user } = action.payload;

  try {
    yield call(signUpWithEmailAndPassword, user);

    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: 'User Created', type: 'success', show: true },
    });
    yield put({ type: UserActionTypes.SET_MODAL_STATE, payload: { value: false } });
  } catch (e) {
   
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: getAuthErrorMessage(e.code), type: 'error', show: true },
    });
  }
}

function* loginUserSaga(action) {
  const { email, password } = action.payload;
  try {
    yield call(signInWithEmailAndPassword, email, password);

    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: 'Successfully Logged in', type: 'success', show: true },
    });
    yield put({ type: UserActionTypes.SET_MODAL_STATE, payload: { value: false } });
  } catch (e) {
  
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: getAuthErrorMessage(e.code), type: 'error', show: true },
    });
  }
}

function* forgotPasswordUserSaga(action) {
  try {
    yield call(forgotPassword, action.payload.email);
  } catch (e) {
  
    yield put({
      type: NotificationsActionTypes.SET_NOTIFICATION,
      payload: { message: getAuthErrorMessage(e.code), type: 'error', show: true },
    });
  }
}
