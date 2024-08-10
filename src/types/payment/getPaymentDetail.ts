export interface GetPaymentDetailProps {
  result: Result;
}

export interface Result {
  id: string;
  amount: number;
  month: string;
  year: number;
  paidDate: Date;
  status: string;
  studentId: string;
  createdBy: string;
  student: Student;
}

export interface Student {
  id: string;
  fullname: string;
  name: string;
  gender: string;
  parents: string;
  phone: string;
  address: string;
  birthdate: string;
  grade: string;
  status: string;
  startdate: string;
}
