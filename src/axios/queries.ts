import { axiosClient } from "./client";

export const getCompanies = async (name: string) => {
  return axiosClient.get(`/company?name=${name}`);
};

export const getCompany = (id: number) => {
  return axiosClient.get(`company/${id}`);
};

export const findAllUsers = (name: string) => {
  return axiosClient.get(`user${name ? `?name=${name}` : ""}`);
};

export const findAllOffices = (name: string) => {
  return axiosClient.get(`office${name ? `?name=${name}` : ""}`);
};

export const getAllCurrencies = (name: string) => {
  return axiosClient.get(`currency${name ? `?name:${name}` : ""}`);
};

export const getEmployeeFormOptions = () => {
  return Promise.all([
    axiosClient.get("office/options"),
    axiosClient.get("department/options"),
  ]);
};
