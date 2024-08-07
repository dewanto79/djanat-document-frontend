export interface GetStudentPaymentListParams {
  keyword?: string;
  limit?: number;
  page?: number;
}

export interface GetStudentPaymentResponseProps {
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
  status: string;
  startdate: string;
  payments: any[];
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
