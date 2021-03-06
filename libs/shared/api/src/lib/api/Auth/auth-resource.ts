import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  CategoryDetailResponse,
  CommentsDetailResponse,
  ContentDetailResponse,
  ContentsDetailResponse,
  SessionDetailResponse,
  UserDetailResponse,
  WriterDetailResponse
} from './types';
import {
  ChangePasswordRequest, CommentRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  ResetPasswordRequest,
  WriterRequest
} from '@internship/shared/types';

export class AuthResource {
  constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) {}

  // TODO change any types according to request/response model
  login = (data: LoginRequest): Promise<any> => this.axios.post('auth/signin', data, this.axiosRequestConfig).then((r) => r.data);
  register = (data: RegisterRequest): Promise<any> => this.axios.post('auth/sign-up', data, this.axiosRequestConfig).then((r) => r.data);
  update = (data: any): Promise<any> => this.axios.put('user/edit', data, this.axiosRequestConfig).then((r) => r.data);
  newPassword = (data: ForgotPasswordRequest): Promise<any> =>
    this.axios.post('auth/forgot-password', data, this.axiosRequestConfig).then((r) => r.data);
  logout = (data: LogoutRequest): Promise<any> => this.axios.post('user/logout', data, this.axiosRequestConfig).then((r) => r.data);
  resetPassword = (data: ResetPasswordRequest): Promise<any> =>
    this.axios.post('user/create-new-password', data, this.axiosRequestConfig).then((r) => r.data);
  userDetail = (): Promise<UserDetailResponse> => this.axios.get('user/', this.axiosRequestConfig).then((r) => r.data);
  changePassword = (data: ChangePasswordRequest): Promise<any> =>
    this.axios.post('user/change-password', data, this.axiosRequestConfig).then((r) => r.data);
  sessionDetail = (): Promise<SessionDetailResponse[]> => this.axios.get('/user/active-sessions', this.axiosRequestConfig).then((r) => r.data);
  deleteSession = (authorizationToken: string, refreshToken: string, accessToken: string): Promise<any> =>
    this.axios
      .delete('/user/logout-from-session', {
        headers: {
          Authorization: authorizationToken,
        },
        params: {
          token: refreshToken,
          accessToken: accessToken,
        },
      })
      .then((r) => r.data);
  sendActivation = (data: string): Promise<string> => this.axios.get('auth/send-email?email=' + data, this.axiosRequestConfig);
  writerUser = (data: WriterRequest): Promise<any> => this.axios.post('user/writer', data, this.axiosRequestConfig).then((r) => r.data);
  writerDetail = (): Promise<WriterDetailResponse> => this.axios.get('user/writer/detail', this.axiosRequestConfig).then((r) => r.data);
  userRoleUpdate = (data: any): Promise<any> => this.axios.put('user/writer/edit', data, this.axiosRequestConfig).then((r) => r.data);
  createContent = (data: WriterRequest): Promise<any> => this.axios.post('/content/register', data, this.axiosRequestConfig).then((r) => r.data);
  contentsPage = (page = 0): Promise<ContentDetailResponse> =>
    this.axios.get('/content/contents?currentPage=' + page, this.axiosRequestConfig).then((r) => r.data);
  categoryPage = (): Promise<CategoryDetailResponse[]> => this.axios.get('/content/category', this.axiosRequestConfig).then((r) => r.data);
  categoryContentPage = (id, page = 0): Promise<ContentDetailResponse> =>
    this.axios.get(`/content/contents/${id}?currentPage=` + page, this.axiosRequestConfig).then((r) => r.data);
  contentPage = (id): Promise<ContentsDetailResponse[]> => this.axios.get(`/content/view/${id}`, this.axiosRequestConfig).then((r) => r.data);
  like = (id): Promise<any> => this.axios.put(`/content/like/${id}`,  this.axiosRequestConfig).then((r) => r.data);
  dislike = (id): Promise<any> => this.axios.put(`/content/dislike/${id}`,  this.axiosRequestConfig).then((r) => r.data);
  createComment = (data: CommentRequest): Promise<any> => this.axios.post('/comment/commentregister', data, this.axiosRequestConfig).then((r) => r.data);
  commentPage = (id,page,size=3): Promise<any> => this.axios.get(`/comment/commentget/${id}?currentPage=${page}&pageSize=${size}`, this.axiosRequestConfig).then((r) => r.data);
  commentlike = (id): Promise<any> => this.axios.put(`/comment/like/${id}`,  this.axiosRequestConfig).then((r) => r.data);
  commentdislike = (id): Promise<any> => this.axios.put(`/comment/dislike/${id}`,  this.axiosRequestConfig).then((r) => r.data);
  searchContentHeaders = (contentHeader,page): Promise<any> => this.axios.get(`/content/search/${contentHeader}?currentPage=${page}`, this.axiosRequestConfig).then((r) => r.data);
  trendContent = (page=0,size=3): Promise<any> => this.axios.get(`/content/trendContent/?currentPage=${page}&pageSize=${size}`, this.axiosRequestConfig).then((r) => r.data);

}
