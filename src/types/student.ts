import { getStudentDetail } from "@/service/student";

export interface GetStudentListParams {
  keyword?: string;
  status?: EStudentStatus | "";
  grade?: string;
  limit?: number;
  page?: number;
}

export enum EStudentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface StudentListProps {
  result: Result;
}

export interface Result {
  items: Item[];
  meta: Meta;
}

export interface Item {
  id: string;
  fullname: string;
  name: string;
  parents: string;
  phone: string;
  address: string;
  birthdate: string;
  grade: string;
  status: EStudentStatus;
  startdate: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface GetStudentProps {
  result: {
    id: string;
    fullname: string;
    name: string;
    parents: string;
    phone: string;
    address: string;
    birthdate: string;
    grade: string;
    status: EStudentStatus.ACTIVE;
    startdate: string;
    payments: [];
  };
}
