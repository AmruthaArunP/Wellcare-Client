import axios from "axios";

const adminAxios  = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
  timeout: 2000,
});

adminAxios.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('adminToken')
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    } 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default adminAxios ;



