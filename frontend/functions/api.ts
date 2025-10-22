// api.js
'use client'
import axios from "axios";
// import { useRouter } from "next/navigation";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  withCredentials: true, // send cookies automatically
});

const url = process.env.NEXT_PUBLIC_BACKEND_URL
// const router = useRouter()
// Response interceptor for handling expired tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent retry loop for refresh endpoint
    if (originalRequest.url === "/auth/refresh") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.get("/auth/refresh"); // refresh token
      } catch (err) {
        window.location.href = "/login"; // redirect if refresh fails
        return;
      }

      return api(originalRequest); // retry original request
    }

    return Promise.reject(error);
  }
);


export default api;
