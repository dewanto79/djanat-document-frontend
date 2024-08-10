import { Month } from "./postPayment";

export enum EPaymentStatus {
  TRANSFER = "TRANSFER",
  PAID = "PAID",
}

export interface GetPaymentParams {
  keyword?: string;
  status?: EPaymentStatus | "";
  month?: Month | "";
  year?: number;
  limit?: number;
  page?: number | "";
}

export interface GetPaymentResponseProps {
  result: Result;
}

export interface Result {
  items: PaymentListProps[];
  meta: Meta;
}

export interface PaymentListProps {
  id: string;
  amount: number;
  month: string;
  year: number;
  paidDate: Date;
  status: EPaymentStatus;
  studentId: string;
  createdBy: string;
  student: Student;
}

export interface Student {
  fullname: string;
  name: string;
  grade: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
