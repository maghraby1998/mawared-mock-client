import { axiosClient } from "./client";
import { BusinessPartner } from "../containers/super/AddCompanyModal";

export const loginMutation = (email: string, password: string) => {
  return axiosClient.post("/user/signin", {
    email,
    password,
  });
};

export const addCompany = (
  name: string,
  businessPartners: BusinessPartner[]
) => {
  return axiosClient.post("/company", {
    name,
    businessPartners,
  });
};

export const deleteCompany = (id: number) => {
  return axiosClient.post(`company/${id}/delete`);
};

export const upsertOffice = (
  name: string,
  address: string,
  currencyId: number
) => {
  return axiosClient.post("/office", {
    name,
    address,
    currencyId,
  });
};
