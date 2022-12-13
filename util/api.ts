import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({
  baseURL: "http://localhost:9060/",
});

client.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = localStorage.getItem("camporest_auth");
  if (token) {
    const { accessToken, refreshToken } = JSON.parse(token);
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.accessToken = accessToken;
    config.headers.refreshToken = refreshToken;
  }
  return config;
});

client.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 403) {
      try {
        const originalRequest = error.config;
        const data = await client.get("auth/refreshtoken");
        if (data) {
          const { accessToken, refreshToken } = data.data;
          localStorage.removeItem("camporest_auth");
          localStorage.setItem(
            "camporest_auth",
            JSON.stringify(data.data, ["accessToken", "refreshToken"])
          );
          originalRequest.headers.accessToken = accessToken;
          originalRequest.headers.refreshToken = refreshToken;
          return await client.request(originalRequest);
        }
      } catch (error) {
        localStorage.removeItem("camporest_auth");
        console.log(error);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default client;
