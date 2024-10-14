import axios from "axios";

export const API_URL = `http://localhost:8080/api`;
const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (e) => {
    const originRequest = e.config;
    if (e.response.status == 401 && !e.config._isRetry) {
      try {
        originRequest._isRetry = true;
        const response = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return api.request(originRequest);
      } catch {
        console.log("Не авторизований!");
      }
    }
    throw e;
  }
);

export default api;
