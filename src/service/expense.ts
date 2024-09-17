import {
  GetExpenseParams,
  GetExpenseResponseProps,
} from "@/types/expense/getExpenseList";
import apiClient from ".";
import { GetExpenseDetailProps } from "@/types/expense/getExpenseDetail";
import { PostExpensePayload } from "@/types/expense/postExpense";

export const postExpense = (payload: PostExpensePayload): Promise<any> => {
  return apiClient.post(`/apis/expense`, payload);
};
export const patchExpense = (
  id: string,
  payload: PostExpensePayload
): Promise<any> => {
  return apiClient.patch(`/apis/expense/${id}`, payload);
};

export const getExpense = (
  params: GetExpenseParams
): Promise<GetExpenseResponseProps> => {
  return apiClient.get(`/apis/expense`, { params: params });
};

export const getExpenseDetail = (
  id: string
): Promise<GetExpenseDetailProps> => {
  return apiClient.get(`/apis/expense/${id}`);
};

export const deleteExpense = (id: string): Promise<any> => {
  return apiClient.delete(`/apis/expense/${id}`);
};
