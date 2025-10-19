// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true, // send cookies automatically
});

const url = process.env.NEXT_PUBLIC_BACKEND_URL

// Response interceptor for handling expired tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("interceptor is working !")
    console.log(error.response.status);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("this is calling")
      await api.get("/auth/refresh"); // refresh token
      return api(originalRequest); // retry original request
    }
    if(error.response?.status == 402){
      window.location.href = '/login'
    }

    return Promise.reject(error);
  }
);

export default api;
