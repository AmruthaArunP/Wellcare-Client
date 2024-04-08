import axios from "axios";

const doctorAxios  = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
  timeout: 2000,
});

doctorAxios.interceptors.request.use(
  (config) => {
    const doctorToken = localStorage.getItem('doctorToken')
    if (doctorToken) {
      config.headers.Authorization = `Bearer ${doctorToken}`;
    } 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default doctorAxios ;


