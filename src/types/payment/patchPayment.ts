export interface PatchPaymentPayload {
  amount: number | string;
  month: string;
  year: string;
  paidDate: string;
  status: string;
  studentId: string;
}
