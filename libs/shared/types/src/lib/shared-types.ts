export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
export const CAPTCHA_TOKEN = 'captcha_token';
export const USER_NAME = 'user_name';

export interface LoginRequest {
  username: string;
  password: string;
  captcha?: string;
}

export interface UpdateRequest {
  username: string;
  email?: string;
  name?: string;
  lastname?: string;
  phone?: string;
  age?: string;
  password?: string;
}

export interface RoleUpdateRequest {
  id: string;
  writerid:string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface LogoutRequest {
  accessToken: string;
  refreshToken: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface WriterRequest {
  job: string;
  education: string;
  biography: string;
}

export interface ContentRequest {
  content: string;
  contentHeader:string;
  categoryId: string;
}

export interface CommentRequest {
  comment: string;
  content_id:string;
}
