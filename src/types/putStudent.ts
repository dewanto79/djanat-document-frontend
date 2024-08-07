import { EStudentStatus } from "./student";

export interface PutStudentRequestProps {
  fullname: string;
  name: string;
  parents: string;
  phone: string;
  address: string;
  birthdate: string;
  grade: string;
  startdate: string;
  status: EStudentStatus;
}

export interface PutStudentResponseProps {
  fullname: string;
  name: string;
  address: string;
  birthdate: string;
  startdate: string;
  grade: string;
  parents: string;
  phone: string;
  status: EStudentStatus;
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
