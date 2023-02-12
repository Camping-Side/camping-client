import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { isRequireAuth } from "./apiAuthFilter";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

client.interceptors.request.use(function (config: AxiosRequestConfig) {
  const authInfo = localStorage.getItem("camporest_auth");
  if (isRequireAuth(config.url) && authInfo) {
    const { accessToken } = JSON.parse(authInfo);
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = "Bearer " + accessToken;
  }
  return config;
});

client.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  async function (error) {
    //400: 로그인 오류 (회원정보 불일치)
    if (error.response && error.response.status === 400) {
      alert(error.response.data.message);
    }
    //401: 권한없음
    else if (error.response && error.response.status === 401) {
      try {
        const authInfo = localStorage.getItem("camporest_auth") || "";
        //localStorage에 토큰이 있는 경우 (로그인이 되어있는 상태지만 accessToken이 만료됐을 경우)
        if (authInfo) {
          const res = await fetch(BASE_URL + "/api/v1/auth/reissue", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: authInfo,
          });
          const resData = await res.json();
          //refresh토큰이 정상일 경우 => accessToken재발급 후 원래 api재요청
          if (res.ok && res.status === 200) {
            localStorage.removeItem("camporest_auth");
            localStorage.setItem(
              "camporest_auth",
              JSON.stringify(resData.resultData)
            );
            const { config } = error;
            const axiosRequestConfig = {
              url: config.url,
              method: config.method,
              headers: {
                Authorization: "Bearer " + resData.resultData.accessToken,
              },
            };
            const reissueData = await client.request(axiosRequestConfig);
            return reissueData;
          }
          //refresh토큰이 만료됐을 경우 => 재로그인
          else if (!res.ok) {
            alert("로그인이 필요합니다.");
            location.href = "/user/login";
          }
        }
        //localStorage에 토큰이 없을 경우
        else {
          alert("로그인이 필요합니다.");
          location.href = "/user/login";
        }
      } catch (error) {
        alert("로그인이 필요합니다.");
        location.href = "/";
      }
    }
    //403 관리자 권한의 api를 요청하는 경우
    else if (error.response && error.response.status === 403) {
      alert("권한이 없습니다.");
      location.href = "/user/login";
    } else {
      alert("관리자에게 문의해주세요. gigic5220@gmail.com");
      location.href = "/";
    }
  }
);

export default client;
