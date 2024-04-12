import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  config.headers["Content-Type"] = "application/json";
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const { data } = await axiosInstance.post("/tokens/renew_access", {
    refresh_token: refreshToken,
  });
  return data.access_token;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const newToken = await refreshToken();
      localStorage.setItem("accessToken", newToken);
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);
