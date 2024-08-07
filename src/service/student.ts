import { GetStudentListParams, GetStudentProps, StudentListProps } from "@/types/student";
import apiClient from ".";
import {
  PostStudentRequestProps,
  PostStudentResponseProps,
} from "@/types/postStudent";
import {
  PutStudentRequestProps,
  PutStudentResponseProps,
} from "@/types/putStudent";

export const getStudentList = (
  params: GetStudentListParams
): Promise<StudentListProps> => {
  return apiClient.get(`/apis/student`, { params: params });
};

export const getStudentDetail = (id: string): Promise<GetStudentProps> => {
  return apiClient.get(`/apis/student/${id}`);
};

export const postStudent = (
  payload: PostStudentRequestProps
): Promise<PostStudentResponseProps> => {
  return apiClient.post(`/apis/student/`, payload);
};

export const putStudent = (
  id: string,
  payload: PutStudentRequestProps
): Promise<PutStudentResponseProps> => {
  return apiClient.patch(`/apis/student/${id}`, payload);
};
