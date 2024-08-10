import { EStudentStatus } from "@/types/student";
import { localStorageMixins } from "./localStorage.mixins";
import { EPaymentStatus } from "@/types/payment/getPaymentList";
import { EColor } from "@/types";

export const currencyFormat = (input: string | number) => {
  let value = input;
  if (typeof value === "number") {
    value = value.toString();
  }
  if (value === "0") {
    return "0";
  } else {
    return value
      .replace(/^0+/, "")
      .replace(/(?!\.)\D/g, "")
      .replace(/(?<=\..*)\./g, "")
      .replace(/(?<=\.\d\d).*/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const numberFormat = (input: string | number) => {
  let value = input;
  if (typeof value === "number") {
    value = value.toString();
  }
  if (value === "0") {
    return "0";
  } else {
    return value
      .replace(/^0+/, "")
      .replace(/(?!\.)\D/g, "")
      .replace(/(?<=\..*)\./g, "")
      .replace(/(?<=\.\d\d).*/g, "");
  }
};

export function handleNumberInput(input: string | number) {
  let value = input;

  if (typeof value === "number") {
    value = value.toString();
  }

  // Remove non-digit characters
  value = value.replace(/\D/g, "");

  // Remove leading zeros
  if (value.startsWith("0") && value.length > 1) {
    value = value.replace(/^0+/, "");
  }

  // Update the input field with the sanitized value
  return value;
}

export const myProfile = () => {
  return JSON.parse(localStorageMixins.get(`profile`)!);
};

export const getInitialFromName = (name: string) => {
  let nameArray = name?.split(" ");
  nameArray = nameArray?.map((rows) => rows.charAt(0).toUpperCase());
  console.log(nameArray);
  return nameArray?.join("");
};

export const translateColor = (status: EStudentStatus | EPaymentStatus) => {
  switch (status) {
    case EStudentStatus.ACTIVE:
    case EPaymentStatus.PAID:
      return EColor.SUCCESS;
    case EPaymentStatus.TRANSFER:
    case EStudentStatus.INACTIVE:
      return EColor.ERROR;
    default:
      return EColor.DISABLED;
  }
};
