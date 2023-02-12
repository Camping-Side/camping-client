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
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Invalid password"
    ) {
      alert("존재하지 않는 회원정보입니다.");
    } else if (error.response && error.response.status === 401) {
      try {
        const authInfo = localStorage.getItem("camporest_auth") || "";
        const reissueResult = await client.post(
          "/api/v1/auth/reissue",
          JSON.parse(authInfo)
        );
        //여기서 401 검증
        console.log("reissueResult: ", reissueResult);
        const { data } = reissueResult;
        if (data && data.statusCode === 200) {
          localStorage.removeItem("camporest_auth");
          localStorage.setItem(
            "camporest_auth",
            JSON.stringify(data.resultData)
          );
          const { config } = error;
          const axiosRequestConfig = {
            url: config.url,
            method: config.method,
            headers: {
              Authorization: "Bearer " + data.resultData.accessToken,
            },
          };
          return await client.request(axiosRequestConfig);
        }
      } catch (error) {
        alert("재로그인이 필요합니다.");
        location.href = "/";
      }
    }
  }
);

export default client;
