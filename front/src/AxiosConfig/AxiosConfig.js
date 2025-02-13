import axios from "axios";
import store from "../store/store";
import { toggleLoader } from "../store/slice/loader";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    store.dispatch(toggleLoader(1));
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    store.dispatch(toggleLoader(0));
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    store.dispatch(toggleLoader(0));
    return res;
  },
  (err) => {
    store.dispatch(toggleLoader(0));
    return Promise.reject(err);
  }
);

export default axiosInstance;
