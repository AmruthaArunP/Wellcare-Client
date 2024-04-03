import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
  timeout: 2000,
});

instance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken')
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
