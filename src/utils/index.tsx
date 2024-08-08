import { localStorageMixins } from "./localStorage.mixins";

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

export const myProfile = () => {
  return JSON.parse(localStorageMixins.get(`profile`)!);
};

export const getInitialFromName = (name: string) => {
  let nameArray = name?.split(" ");
  nameArray = nameArray?.map((rows) => rows.charAt(0).toUpperCase());
  console.log(nameArray);
  return nameArray?.join("");
};
