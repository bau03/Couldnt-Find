import {
  forgotpasswordAsync,
  loginAsync,
  logoutAsync,
  registerAsync,
  changePasswordAsync,
  resetpasswordAsync,
  updateAsync,
  updateLogout,
  writerAsync,
  roleupdateAsync,
  contentAsync,
} from './actions';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { api } from '@internship/shared/api';
import { removeAccessToken, removeRefreshToken } from '@internship/shared/utils';

function* doLogin({ payload }) {
  try {
    const data = yield call(api.auth.login, payload);
    if (data?.accessToken) localStorage.setItem('cloud_users', JSON.stringify(data));
    yield put(loginAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(loginAsync.failure(e));
  }
}
function* doWriter({ payload }) {
  try {
    yield call(api.auth.writerUser, payload);
    yield put(writerAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(writerAsync.failure(e));
  }
}
function* doCreateContent({ payload }) {
  try {
    yield call(api.auth.createContent, payload);
    yield put(contentAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(contentAsync.failure(e));
  }
}
function* doResetPassword({ payload }) {
  try {
    yield call(api.auth.resetPassword, payload);
    yield put(resetpasswordAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(resetpasswordAsync.failure(e));
  }
}
function* doForgotPassword({ payload }) {
  try {
    yield call(api.auth.newPassword, payload);
    yield put(forgotpasswordAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(forgotpasswordAsync.failure(e));
  }
}

function doUpdateLogout() {
  if (localStorage.getItem('access_token')) {
    localStorage.removeItem('cloud_users');
    removeAccessToken();
    removeRefreshToken();
  }
}

function* doLogout({ payload }) {
  try {
    yield call(api.auth.logout, payload);
    yield put(logoutAsync.success({}));
    if (localStorage.getItem('access_token')) {
      localStorage.removeItem('cloud_users');
      removeAccessToken();
      removeRefreshToken();
    }
  } catch (e) {
    console.error(e);
    yield put(logoutAsync.failure(e));
  }
}

function* doRegister({ payload }) {
  try {
    yield call(api.auth.register, payload);
    yield put(registerAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(registerAsync.failure(e));
  }
}

function* doUpdate({ payload }) {
  try {
    /* let requestData = {};
    Object.entries(payload).forEach(([key, value]) => (value !== '' ? (requestData = { ...requestData, [key]: value }) : null));*/
    yield call(api.auth.update, payload);
    yield put(updateAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(updateAsync.failure(e));
  }
}

function* doUserRoleUpdate({ payload }) {
  try {
    yield call(api.auth.userRoleUpdate, payload);
    yield put(roleupdateAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(roleupdateAsync.failure(e));
  }
}

function* doChangePassword({ payload }) {
  try {
    yield call(api.auth.changePassword, payload);
    yield put(changePasswordAsync.success({}));
  } catch (e) {
    console.error(e);
    yield put(changePasswordAsync.failure(e));
  }
}

function* watchLogin() {
  yield takeLatest(loginAsync.request, doLogin);
}
function* watchWriter() {
  yield takeLatest(writerAsync.request, doWriter);
}
function* watchCreateContent() {
  yield takeLatest(contentAsync.request, doCreateContent);
}
function* watchResetPassword() {
  yield takeLatest(resetpasswordAsync.request, doResetPassword);
}
function* watchForgotPassword() {
  yield takeLatest(forgotpasswordAsync.request, doForgotPassword);
}
function* watchLogout() {
  yield takeLatest(logoutAsync.request, doLogout);
}
function* watchRegister() {
  yield takeLatest(registerAsync.request, doRegister);
}

function* watchUpdate() {
  yield takeLatest(updateAsync.request, doUpdate);
}
function* watchRoleUpdate() {
  yield takeLatest(roleupdateAsync.request, doUserRoleUpdate);
}
function* watchChangePassword() {
  yield takeLatest(changePasswordAsync.request, doChangePassword);
}
function* watchUpdateLogout() {
  yield takeLatest(updateLogout, doUpdateLogout);
}

export function* authenticationSaga() {
  yield all([
    fork(watchLogin),
    fork(watchRegister),
    fork(watchLogout),
    fork(watchUpdate),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchChangePassword),
    fork(watchUpdateLogout),
    fork(watchWriter),
    fork(watchRoleUpdate),
    fork(watchCreateContent),
  ]);
}
