import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const client = axios.create({
  baseURL: "http://localhost:9060/",
  headers: {
    "Content-type": "application/json",
  },
});

client.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = localStorage.getItem("camporest_auth");
  if (token) {
    console.log("token: ", token);
    const { accessToken, refreshToken } = JSON.parse(token);
    if (!config.headers) {
      config.headers = {};
    }
    //config.headers.Authorization = "Bearer " + accessToken;
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
    console.log("error: ", error.response.status);
    if (error.response && error.response.status === 401) {
      try {
        /*const authParams = localStorage.getItem("camporest_auth");
        //client.defaults.headers.common["Content-type"] = "application/json";
        const result = await client.post("/api/v1/auth/reissue", authParams);
        console.log("result : ", result);
        console.log("error : ", error);
        const { data } = result;
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
              accessToken: data.resultData.accessToken,
              refreshToken: data.resultData.refreshToken,
            },
          };

          console.log("axiosRequestConfig");

          return await client.request(axiosRequestConfig);
        }*/
      } catch (error) {
        console.log(error);
      }
    }
  }
);

export default client;
