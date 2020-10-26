import axiosStatic, { AxiosRequestConfig } from 'axios';
import {
  loginInterceptor,
  tokenInterceptor,
  captchaRequiredInterceptor,
  captchaInterceptor,
  refreshTokenInterceptor,
  errorInterceptor
} from './interceptors';


const baseUrl = 'http://localhost:8080';

const defaultConfig: AxiosRequestConfig = {
  baseURL: `${baseUrl}/api/`,
};

export function createAxios(baseConfig: AxiosRequestConfig) {
  const instance = axiosStatic.create(baseConfig);

  // Request Interceptors
  instance.interceptors.request.use(tokenInterceptor);
  instance.interceptors.request.use(captchaInterceptor);

  // Response Interceptors
  instance.interceptors.response.use(loginInterceptor);
  instance.interceptors.response.use((c) =>c, captchaRequiredInterceptor);
  instance.interceptors.response.use((c) =>c, errorInterceptor);
  instance.interceptors.response.use((c) =>c, refreshTokenInterceptor);
  return instance;
}

export default createAxios(defaultConfig);
