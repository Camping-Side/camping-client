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
    console.log("error: ", error.response.status);
    if (error.response && error.response.status === 401) {
      try {
        const authInfo = localStorage.getItem("camporest_auth") || "";
        const reissueResult = await client.post(
          "/api/v1/auth/reissue",
          JSON.parse(authInfo)
        );
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
        console.log(error);
      }
    }
  }
);

export default client;
