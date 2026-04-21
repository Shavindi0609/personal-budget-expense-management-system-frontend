import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api/v1",
});

api.interceptors.request.use((config) => {  //request send wenna kalin localstorage eken JWT token aragena Authorization Header ekata set karanawa
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;



