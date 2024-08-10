import {
  GetStudentPaymentListParams,
  GetStudentPaymentResponseProps,
} from "@/types/payment/student";
import apiClient from ".";
import { PostPaymentPayload } from "@/types/payment/postPayment";
import { GetPaymentDetailProps } from "@/types/payment/getPaymentDetail";
import {
  GetPaymentParams,
  GetPaymentResponseProps,
} from "@/types/payment/getPaymentList";

export const getStudentPayment = (
  params: GetStudentPaymentListParams
): Promise<GetStudentPaymentResponseProps> => {
  return apiClient.get(`/apis/student/payment`, { params: params });
};

export const postPayment = (payload: PostPaymentPayload): Promise<any> => {
  return apiClient.post(`/apis/payment`, payload);
};
export const patchPayment = (
  id: string,
  payload: PostPaymentPayload
): Promise<any> => {
  return apiClient.patch(`/apis/payment/${id}`, payload);
};

export const getPayment = (
  params: GetPaymentParams
): Promise<GetPaymentResponseProps> => {
  return apiClient.get(`/apis/payment`, { params: params });
};

export const getPaymentDetail = (
  id: string
): Promise<GetPaymentDetailProps> => {
  return apiClient.get(`/apis/payment/${id}`);
};

export const deletePayment = (id: string): Promise<any> => {
  return apiClient.delete(`/apis/payment/${id}`);
};
