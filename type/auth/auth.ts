export type JoinInputs = {
  name: string;
  nickname: string;
  phone: string;
  email: string;
  password: string;
  passwordCheck: string;
  birth: string;
};

export type JoinReqData = {
  username: string;
  email: string;
  password: string;
  birth: string;
  phone: string;
};

export type LoginReqData = {
  email: string;
  password: string;
};

export type LoginInputs = {
  email: string;
  password: string;
};

export type LoginInfo = {
  accessToken: string;
  accessTokenExpiresIn: number;
  grantType: string;
  id: number;
  refreshToken: string;
  username: string;
};
