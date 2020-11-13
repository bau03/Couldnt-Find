export interface UserDetailResponse {
  username: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: string;
  image: string;
  authorities: string;
}
export interface WriterDetailResponse {
  id: string;
  job: string;
  education: string;
  biography: string;
  timestap: string;
  user: string;
}

export interface SessionDetailResponse {
  refreshToken: string;
  accessToken: string;
  userAgent: string;
  expireDate: string;
  issueDate: string;
}

export interface ContentDetailResponse {
  content: any;
  last: boolean;
  first: boolean;
}

export interface CategoryDetailResponse {
  id: any;
  categoryName: any;
}

export interface ContentsDetailResponse {
  content: string;
  category: any;
  timestap: string;
  id: string;
  user: any;
  contentHeader:string;
}
