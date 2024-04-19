import axios from "axios";

// Create axios instance with the baseURL for server.
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

// Automatically insert Authorization header with accessToken stored in local storage if it exists.
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  config.headers["Content-Type"] = "application/json";
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Get refreshToken from local storage and make request to get back new accessToken from server.
const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const { data } = await axiosInstance.post("/tokens/renew_access", {
    refresh_token: refreshToken,
  });
  return data.access_token;
};

// Check the response code and if it is 401, use the refreshToken in localstorage to get new access token and retry request.
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
