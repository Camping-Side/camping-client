import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const client = axios.create({
  baseURL: "http://localhost:9060/",
});

client.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = localStorage.getItem("camporest_auth");
  if (token) {
    console.log("token: ", token);
    const { accessToken, refreshToken } = JSON.parse(token);
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.accessToken = accessToken;
    config.headers.refreshToken = refreshToken;
  }
  console.log("config: ", config);
  client.defaults.headers.post["Content-Type"] = "application/json";
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
        const originalRequest = error.config;
        const item = localStorage.getItem("camporest_auth");
        const data = await client.post("/api/v1/auth/reissue", item);
        console.log(data);
        /*if (data) {
          const { accessToken, refreshToken } = data.data;
          localStorage.removeItem("camporest_auth");
          localStorage.setItem(
              "camporest_auth",
              JSON.stringify(data.data, ["accessToken", "refreshToken"])
          );
          originalRequest.headers.accessToken = accessToken;
          originalRequest.headers.refreshToken = refreshToken;
          return await client.request(originalRequest);
        }*/
      } catch (error) {
        console.log(error);
      }
    }
  }
);

export default client;
