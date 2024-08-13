import { FormProps, LoginGoogleProps, LoginRes } from "@/types/login";
import apiClient from ".";

export const PostLogin = (payload: FormProps): Promise<LoginRes> => {
  return apiClient.post(`/apis/admin/login`, payload);
};

export const PostLoginGoogle = (payload:LoginGoogleProps):Promise<any>=>{
  return apiClient.post(`/apis/admin/google`, payload)
}