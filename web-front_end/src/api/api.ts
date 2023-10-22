import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if ((error.response && error.response.status === 401) || error.response.status === 403) {
      try {
        const refreshedTokenResponse = await api.post("/users/refreshToken", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log("Token refreshed:", refreshedTokenResponse);
        return refreshedTokenResponse;
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(error);
    }
  },
);

export { api };
