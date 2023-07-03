import { axiosClient } from "./client";

export const loginMutation = (email: string, password: string) => {
  return axiosClient.post("/user/signin", {
    email,
    password,
  });
};
