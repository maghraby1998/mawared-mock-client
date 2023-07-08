import { axiosClient } from "./client";

export const getCompanies = async (name: string) => {
  return axiosClient.get(`/company?name=${name}`);
};

export const getCompany = (id: number) => {
  return axiosClient.get(`company/${id}`);
};
