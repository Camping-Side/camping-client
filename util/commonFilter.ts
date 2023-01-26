export const BirthFilter = (birth: string) => {
  if (!birth) return "";
  return (
    birth.substring(0, 4) +
    "년 " +
    birth.substring(4, 6) +
    "월 " +
    birth.substring(6, 9) +
    "일"
  );
};

export const PhoneFilter = (phone: string) => {
  if (!phone) return "";
  let filterdPhone = "";
  if (phone.length === 10) {
    filterdPhone =
      phone.substring(0, 3) +
      "-" +
      phone.substring(3, 6) +
      "-" +
      phone.substring(6, 10);
  } else {
    filterdPhone =
      phone.substring(0, 3) +
      "-" +
      phone.substring(3, 7) +
      "-" +
      phone.substring(7, 11);
  }
  return filterdPhone;
};

export const NumberCommaFilter = (number: number) => {
  return number ? number.toLocaleString() + "" : "";
};
