import { axiosClient } from "./client";

export const getCompanies = async (name: string) => {
  return axiosClient.get(`/company?name=${name}`);
};
