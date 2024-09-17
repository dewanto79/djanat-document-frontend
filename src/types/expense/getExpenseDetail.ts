export interface GetExpenseDetailProps {
  result: Result;
}

interface Result {
  id: string;
  description: string;
  amount: number | string;
  month: string;
  year: number;
  expenseDate: string;
  createdBy: string;
  admin: Admin;
}

interface Admin {
  name: string;
}
