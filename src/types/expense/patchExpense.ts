export interface PatchExpensePayload {
  description: string;
  amount: number | string;
  month: string;
  year: number;
  expenseDate: string;
}
