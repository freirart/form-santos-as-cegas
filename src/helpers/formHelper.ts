import _ from "lodash";

export const mask = (value: string, pattern: string) => {
  let i = 0;
  const v = value.toString();

  return pattern.replace(/#/g, () => v[i++] || "");
};

export const fillCellphone = (currValue: string, prevValue: string) => {
  if (currValue === _.initial(prevValue).join("") || !currValue) {
    return currValue;
  }

  return mask(currValue.replace(/\D/g, ""), "(##) #####-####");
};

export const fillAge = (value: string) => {
  if (!value) {
    return value;
  }

  const formattedValue = value.replace(/\D/g, "");

  if (Number(formattedValue) <= 0) {
    return "";
  } else if (Number(formattedValue) > 100) {
    return formattedValue.slice(0, 2);
  }

  return String(formattedValue);
};

export const fillEmail = (value: string) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  return !regex.test(value);
};
