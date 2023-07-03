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
