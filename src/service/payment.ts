import {
  GetStudentPaymentListParams,
  GetStudentPaymentResponseProps,
} from "@/types/payment/student";
import apiClient from ".";
import { PostPaymentPayload } from "@/types/payment/postPayment";

export const getStudentPayment = (
  params: GetStudentPaymentListParams
): Promise<GetStudentPaymentResponseProps> => {
  return apiClient.get(`/apis/student/payment`, { params: params });
};

export const postPayment = (payload: PostPaymentPayload): Promise<any> => {
  return apiClient.post(`/apis/payment`, payload);
};
