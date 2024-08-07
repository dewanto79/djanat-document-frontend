import { FormProps, LoginRes } from "@/types/login";
import apiClient from ".";

export const PostLogin = (payload: FormProps): Promise<LoginRes> => {
  return apiClient.post(`/apis/admin/login`, payload);
};
