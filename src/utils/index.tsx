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
