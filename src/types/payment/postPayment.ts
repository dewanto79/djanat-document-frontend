export enum Month {
  January = "January",
  February = "February",
  March = "March",
  April = "April",
  May = "May",
  June = "June",
  July = "July",
  August = "August",
  September = "September",
  October = "October",
  November = "November",
  December = "December",
}

export interface PostPaymentPayload {
  amount: number | string;
  month: string;
  year: string;
  paidDate: string;
  status: string;
  studentId: string;
}
