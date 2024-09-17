import { Month } from "../month.enum";

export interface GetExpenseParams {
  keyword?: string;
  month?: Month | "";
  year?: number;
  limit?: number;
  page?: number | "";
}

export interface GetExpenseResponseProps {
  result: Result;
}

export interface Result {
  items: ExpenseListProps[];
  meta: Meta;
}

export interface ExpenseListProps {
  id: string;
  description: string;
  amount: number | string;
  month: string;
  year: number;
  expenseDate: Date;
  createdBy: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
