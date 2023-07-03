import { store } from "../redux/store";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 1000,
});

axiosClient.interceptors.request.use(function (config) {
  const token = store.getState().auth.token;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
