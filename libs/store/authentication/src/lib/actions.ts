import { createAction, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  ChangePasswordRequest,
  CommentRequest,
  ContentRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  ResetPasswordRequest,
  RoleUpdateRequest,
  UpdateRequest,
  WriterRequest
} from '@internship/shared/types';

export const loginAsync = createAsyncAction('@Authentication/LOGIN_REQUEST', '@Authentication/LOGIN_SUCCESS', '@Authentication/LOGIN_FAILURE')<
  LoginRequest,
  any,
  AxiosError
>();

export const forgotpasswordAsync = createAsyncAction(
  '@Authentication/FORGOTPASSWORD_REQUEST',
  '@Authentication/FORGOTPASSWORD_SUCCESS',
  '@Authentication/FORGOTPASSWORD_FAILURE'
)<ForgotPasswordRequest, any, AxiosError>();

export const writerAsync = createAsyncAction('@Authentication/WRİTER_REQUEST', '@Authentication/WRİTER_SUCCESS', '@Authentication/WRİTER_FAILURE')<
  WriterRequest,
  any,
  AxiosError
>();

export const contentAsync = createAsyncAction('@Authentication/CONTENT_REQUEST', '@Authentication/CONTENT_SUCCESS', '@Authentication/CONTENT_FAILURE')<
  ContentRequest,
  any,
  AxiosError
  >();

export const commentAsync = createAsyncAction('@Authentication/COMMENT_REQUEST', '@Authentication/COMMENT_SUCCESS', '@Authentication/COMMENT_FAILURE')<
  CommentRequest,
  any,
  AxiosError
  >();

export const registerAsync = createAsyncAction(
  '@Authentication/REGISTER_REQUEST',
  '@Authentication/REGISTER_SUCCESS',
  '@Authentication/REGISTER_FAILURE'
)<RegisterRequest, any, AxiosError>();

export const updateAsync = createAsyncAction('@Authentication/UPDATE_REQUEST', '@Authentication/UPDATE_SUCCESS', '@Authentication/UPDATE_FAILURE')<
  UpdateRequest,
  any,
  AxiosError
>();
export const roleupdateAsync = createAsyncAction(
  '@Authentication/ROLEUPDATE_REQUEST',
  '@Authentication/ROLEUPDATE_SUCCESS',
  '@Authentication/ROLEUPDATE_FAILURE'
)<RoleUpdateRequest, any, AxiosError>();

export const logoutAsync = createAsyncAction('@Authentication/LOGOUT_REQUEST', '@Authentication/LOGOUT_SUCCESS', '@Authentication/LOGOUT_FAILURE')<
  LogoutRequest,
  any,
  AxiosError
>();

export const resetpasswordAsync = createAsyncAction(
  '@Authentication/RESETPASSWORD_REQUEST',
  '@Authentication/RESETPASSWORD_SUCCESS',
  '@Authentication/RESETPASSWORD_FAILURE'
)<ResetPasswordRequest, any, AxiosError>();

export const googleLogin = createAction('@Authentication/GOOGLE_LOGIN')();
export const updateLogout = createAction('@Authentication/UPDATE_LOGOUT')();

export const changePasswordAsync = createAsyncAction(
  '@Authentication/CHANGE_PASSWORD_REQUEST',
  '@Authentication/CHANGE_PASSWORD_SUCCESS',
  '@Authentication/CHANGE_PASSWORD_FAILURE'
)<ChangePasswordRequest, any, AxiosError>();
